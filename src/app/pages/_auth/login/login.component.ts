import { 
  Component,
  OnInit, 
  ChangeDetectorRef, 
  ChangeDetectionStrategy, 
  Inject } from '@angular/core';
import { 
  NbLoginComponent, 
  NbAuthJWTToken, 
  NbAuthResult, 
  NbAuthService, 
  NbAuthSocialLink, 
  NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UtilitiesService } from '../../../shared/api/services/utilities.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class NgxLoginComponent extends NbLoginComponent implements OnInit {

  public redirectDelay: number;
  public showMessages: any;
  public strategy: string;
  public errors: string[];
  public messages: string[];
  public user: any;
  public submitted: boolean;
  public socialLinks: NbAuthSocialLink[];
  public rememberMe: boolean;
  
  public DATA_LANG: any = null;
  public language: string = '';
  public nameComponent: string = 'loginComponent';
  public urlLogo: string = '';

  public token: string = "";

  constructor(
    private utilitiesService: UtilitiesService,
    public service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    public cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    public router: Router) {
    super(service, options, cd, router);
  }

  ngOnInit() {
    this.language = (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase();
    this.fnGetDataLanguages(this.language, this.nameComponent);
    this.fnGetDataAccess();
  }

  fnGetDataAccess() {
    let urlLogo = 'UrlLogo';
    this.utilitiesService.fnGetDataFBCallback(urlLogo, (response) => {
      console.log('response: ', response);
      this.urlLogo = response;
    });
  }

  fnGetDataLanguages(language, nameComponent) {
    let urlCollection = 'Languages/' + language + '/' + nameComponent;
    console.log('urlCollection: ', urlCollection);
    this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
      // console.log('response: ', response);
      this.DATA_LANG = response;
      console.log('this.DATA_LANG: ', this.DATA_LANG);
    });
  }

  login(): void {
    const self = this;
    self.errors = [];
    self.messages = [];
    self.submitted = true;
    // self.user['getToken'] = true;
    // console.log('self.user: ', self.user);

    const obj_user_account = {
      'password': self.user['password'],
      'user': self.user['email'],
      'rememberMe': true,
    };
    console.log('obj_user_account: ', obj_user_account);

    self.service.authenticate(self.strategy, obj_user_account).subscribe((resultAuth: NbAuthResult) => {
      if (resultAuth.isSuccess() && resultAuth.getMessages()[0]['status'] === 200) {
        self.messages = resultAuth.getMessages();
        console.log('self.messages: ', self.messages);
        self.token = self.messages[0]['body']['token'];
        console.log('self.token: ', self.token);
        self.utilitiesService.fnSetToken(self.token);
      }
    },(error) => {
      console.log('error: ', error);
    });

  }

}
