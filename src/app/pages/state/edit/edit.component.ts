import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() data: any;
  current_payload: string = null;
  submitted: boolean = false;

  constructor(
    protected ref: NbDialogRef<EditComponent>,
  ) { }

  ngOnInit(): void {
  }

  fnAddData(data) {
    console.log('data: ', data);
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
