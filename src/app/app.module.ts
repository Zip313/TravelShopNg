import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "./services/user/user.service";
import {AuthService} from "./services/auth/auth.service";
import {RestInterceptorsService} from "./services/interceptors/rest-interceptors.service";
import {ConfigService} from "./services/config/config.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RestInterceptorsService2} from "./services/interceptors/rest-interceptors2.service";


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
      AuthService,
      UserService,
      ConfigService,
      {
        provide: APP_INITIALIZER,
        useFactory: initializeApp,
        deps: [ConfigService], multi: true
      },
      {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi:true},
      {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService2, multi:true},
    ],
  exports: [
  ],
    bootstrap: [AppComponent]
})

export class AppModule {

}

function initializeApp(config:ConfigService){
  return ()=> config.loadPromise().then(()=>{
    console.log('--CONFIG LOADED---', ConfigService.config)
  })
}
