import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Input() data: any;
  DATA_LANG: any = null;
  DATA_LANG_GENERAL: any = null;
  DATA_LANG_MESSAGES: any = null;
  current_payload: string = null;
  submitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  fnAddState(data) {
    console.log('data: ', data);
  }

}
