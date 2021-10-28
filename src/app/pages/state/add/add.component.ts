import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() data: any;
  current_payload: string = null;
  submitted: boolean = false;

  constructor(
    protected ref: NbDialogRef<AddComponent>,
  ) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
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

  fnAddState(data) {
    console.log('data: ', data);
  }

}
