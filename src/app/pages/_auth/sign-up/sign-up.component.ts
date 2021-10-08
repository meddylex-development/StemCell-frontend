import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent, NbAuthSocialLink } from '@nebular/auth';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class NgxRegisterComponent extends NbRegisterComponent implements OnInit {
  
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  submitted: boolean;
  errors: string[];
  messages: string[];
  user: any;
  socialLinks: NbAuthSocialLink[];

  ngOnInit() {
  }
}
