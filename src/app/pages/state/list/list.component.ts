import { Component, OnInit } from '@angular/core';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public currentPage: Number = 1;
  public itemsPerPage: Number = 5;
  public collectionData: any = [
    { 'id': 1, 'name': 'Activo', 'description': 'Estado activo', 'dateCreated': 1633624131429, 'dateUpdated': 1633624131429 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
  ];

  constructor(
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
  }

  showModalAdd(data) {
    let object_send = {};
    object_send['data'] = data;
    this.dialogService.open(AddComponent, { context: object_send }).onClose.subscribe((res) => {
      console.log('res: ', res);
      // this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  fnEdit(item) {
    console.log('item: ', item);
  }

  fnDelete(item) {
    console.log('item: ', item);
  }

}
