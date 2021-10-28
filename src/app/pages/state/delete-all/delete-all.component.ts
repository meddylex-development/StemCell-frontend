import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss']
})
export class DeleteAllComponent implements OnInit {

  @Input() data: any;
  current_payload: string = null;
  submitted: boolean = false;

  constructor(
    protected ref: NbDialogRef<DeleteAllComponent>,
  ) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
  }

  fnDeleteAllData(deleteDataForm) {
    console.log('deleteDataForm: ', deleteDataForm);
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
