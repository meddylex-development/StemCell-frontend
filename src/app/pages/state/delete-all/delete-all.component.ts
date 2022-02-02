import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { UtilitiesService } from 'app/shared/api/services/utilities.service';
import { StateService } from 'app/shared/api/services/state.service';

@Component({
  selector: 'delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss']
})
export class DeleteAllComponent implements OnInit {

  @Input() data: any;
  public token: string = '';
  public userData: any = null; 
  public submitted: boolean = false;
  public state: any = {};

  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'stateComponent';

  constructor(
    protected ref: NbDialogRef<DeleteAllComponent>,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private utilitiesService: UtilitiesService,
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.language = (this.utilitiesService.fnGetBrowserLocales().length > 1) ? (this.utilitiesService.fnGetBrowserLocales()[1]).toUpperCase() : 'ES';
    // this.language = 'EN';
    this.utilitiesService.fnSetLocalStorage("lang", this.language);
    this.fnGetDataLanguages(this.language, this.nameComponent);
    this.fnGetDataGeneralLanguages(this.language);
    this.utilitiesService.fnAuthValidUser().then(response => {
      console.log('data: ', this.data);
      this.token = response['token'];
      this.userData = response['user'];
      this.state = JSON.parse(JSON.stringify(this.data));
    }).catch(error => {
      this.utilitiesService.fnSignOutUser().then(resp => {
        this.utilitiesService.fnNavigateByUrl('auth/login');
      })
    });
  }

  fnGetDataLanguages(language, nameComponent) {
    let urlCollection = 'Languages/' + language + '/' + nameComponent;
    this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
      this.DATA_LANG = response;
      console.log('this.DATA_LANG: ', this.DATA_LANG);
    });
  }
  
  fnGetDataGeneralLanguages(language) {
    let urlCollection = 'GeneralLanguages/' + language;
    this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
      this.DATA_LANG_GENERAL = response;
      console.log('this.DATA_LANG_GENERAL: ', this.DATA_LANG_GENERAL);
    });
  }

  fnDeleteAllData(data) {
    console.log('data: ', data.value);
    console.log('state: ', this.state);
    // this.submitted = true;
    this.stateService.fnHttpSetDeleteAllState(this.token).subscribe(response => {
      console.log('response: ', response);
      const data = response;
      if (data['status'] == 200) {
        this.utilitiesService.showToast('top-right', 'success', this.DATA_LANG['msgLblDeleteAllStatusSuccess']['text'], 'nb-alert');
        this.dismiss(true);
      } else {
        this.utilitiesService.showToast('top-right', 'danger', this.DATA_LANG['msgLblDeleteStatusError']['text'], 'nb-alert');
        this.dismiss(false);
      }
    });
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelDeleteAllData() {
    // this.submitted = false;
    this.dismiss();
  }

  fnCloseModal() {
    this.dismiss();
  }

}
