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
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() data: any;
  public token: string = '';
  public userData: any = null; 
  public submitted: boolean = false;
  public state: any = {};
  
  constructor(
    protected ref: NbDialogRef<EditComponent>,
    private dialogService: NbDialogService,
    private authService: NbAuthService,
    private utilitiesService: UtilitiesService,
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
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

  fnEditData(data) {
    console.log('data: ', data.value);
    console.log('state: ', this.state);
    // this.submitted = true;
    this.stateService.fnHttpSetEditState(this.token, this.state, this.state['_id']).subscribe(response => {
      console.log('response: ', response);
      const data = response;
      if (data['status'] == 200) {
        this.utilitiesService.showToast('top-right', 'success', 'Estado actualizado satisfactoriamente!', 'nb-alert');
        this.dismiss(true);
      } else {
        this.utilitiesService.showToast('top-right', 'danger', 'El estado no se pudo actualizar. Intentelo nuevamente!', 'nb-alert');
        this.dismiss(false);
      }
    });
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelAddData() {
    // this.submitted = false;
    this.dismiss();
  }

  fnCloseModal() {
    this.dismiss();
  }

}
