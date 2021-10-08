/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/* ************ START - Import modules - core angular and settings ************ */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { 
  HttpClientModule, 
  HttpResponse, 
  HttpErrorResponse, 
  HTTP_INTERCEPTORS 
} from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
/* ************* END - Import modules - core angular and settings ************* */
/* ************ START - Import modules - AngularFire ************ */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
/* ************* END - Import modules - AngularFire ************* */
/* ************ START - Import modules - core Nebular ************ */
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { 
  NbPasswordAuthStrategy, 
  NbAuthModule, 
  NbAuthJWTToken, 
  NbPasswordAuthStrategyOptions 
} from '@nebular/auth';
/* ************* END - Import modules - core Nebular ************* */
/* ************ START - Environment ************ */
import { environment } from '../environments/environment';
/* ************* END - Environment ************* */
/* ************ START - Guards ************ */
import { AuthGuard } from './shared/api/services/auth-guard.service';
import { AuthInterceptorService } from './shared/api/services/auth-interceptor.service';
/* ************* END - Guards ************* */
/* ************ START - Import modules - base component and routing ************ */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
/* ************* END - Import modules - base component and routing ************* */

export function setReturnDataMessages(module: string, res: HttpResponse<Object>): Object[] { return [res]; }
export function setReturnDataErrors(module: string, res: HttpErrorResponse): Object[] { return [res]; }

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
    error: true,
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    /* ************+ START - Implement module NbPasswordAuthStrategy strategy ************ */
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          token: {
            class: NbAuthJWTToken,
            key: 'payload', // this parameter tells where to look for the token
          },

          baseEndpoint: environment.apiUrl,
          login: {
            endpoint: '/api/Account/Login',
            method: 'post',
            redirect: {
              success: 'pages/dashboard',
              failure: 'auth/login',
            },
          },
          register: {
            endpoint: '/api/Auth/SignUp',
            method: 'post',
            redirect: {
              success: 'auth/login',
              failure: null,
            },
          },
          logout: {
            endpoint: '/api/Auth/SignOut',
            method: 'post',
          },
          requestPass: {
            endpoint: '/api/Auth/RememberPassword',
            method: 'post',
          },
          resetPass: {
            endpoint: '/api/Auth/ResetPassword',
            method: 'post',
          },

          messages: {
            key: 'codMessage', // this parameter tells where to look for the token
            getter: setReturnDataMessages,
          },

          errors: {
            key: 'codMessage',
            getter: setReturnDataErrors,
          },
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
    /* ************+* END - Implement module NbPasswordAuthStrategy strategy ************* */
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
})
export class AppModule {
}
