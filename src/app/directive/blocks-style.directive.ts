import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {Event} from "@angular/router";

@Directive({
  selector: '[appBlocksStyle]',
  host:{
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs:'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges{
  @Input() selector:string;
  @Input() initFirst:boolean=false;

  @Output() renderComplete = new EventEmitter();

  private items:HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;
  constructor(private el:ElementRef) { }

  ngAfterViewInit(): void {
    this.initItems();
    setTimeout(()=>{
      this.renderComplete.emit(true);
    },500)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

  }


  initKeyUp(ev: KeyboardEvent): void {
    if (this.items.length == 0) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      this.setAttrStyleBorder(this.index);
      return;
    }

    const keys = ['ArrowRight','ArrowLeft'];
    if (keys.includes(ev.key)) {
      this.removeAttrStyleBorder(this.index);

      if (ev.key === 'ArrowRight' && this.index<this.items.length-1) {
        this.index++;
      }
      if (ev.key === 'ArrowLeft' && this.index>0) {
        this.index--;
      }
      this.activeElementIndex = this.index;
      this.setAttrStyleBorder(this.index);
      this.items[this.index].scrollIntoView(false);
    }
  }


  setAttrStyleBorder(index:number){
    if(this.items[index]){
      this.items[index].setAttribute('style','border: 2px solid red');
    }
  }
  removeAttrStyleBorder(index:number){
    if(this.items[index]){
      this.items[index].removeAttribute('style');
    }
  }
  initItems():void{
    this.activeElementIndex = 0;
    if(this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if(this.initFirst){
        console.log('1',this.el.nativeElement.querySelectorAll('*'),this.el.nativeElement.querySelectorAll('.ticket-item'))
        if(this.items[0]){
          console.log(this.items[0]);
          this.setAttrStyleBorder(0);
        }
      }
    }
    console.log(this.items);
  }
}

type RightLeft = 'ArrowRight'|'ArrowLeft';
