import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() data: any;
  current_payload: string = null;
  submitted: boolean = false;

  constructor(
    protected ref: NbDialogRef<DeleteComponent>,
  ) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
  }

  fnDeleteData(deleteDataForm) {
    console.log('deleteDataForm: ', deleteDataForm);
  }

  dismiss(res?) {
    this.ref.close(res);
  }

  fnCancelDeleteData() {
    // this.submitted = false;
    this.dismiss();
  }

  fnCloseModal() {
    this.dismiss();
  }

}
