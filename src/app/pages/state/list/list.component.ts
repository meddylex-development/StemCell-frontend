import { Component, OnInit } from '@angular/core';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { AddComponent } from '../add/add.component';
import { DeleteAllComponent } from '../delete-all/delete-all.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';

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
    console.log('data: ', data);
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(AddComponent, { context: dataSend }).onClose.subscribe((res) => {
      console.log('res: ', res);
      // this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  showModalEdit(data) {
    console.log('data: ', data);
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(EditComponent, { context: dataSend }).onClose.subscribe((res) => {
      console.log('res: ', res);
      // this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  showModalDelete(data) {
    console.log('data: ', data);
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(DeleteComponent, { context: dataSend }).onClose.subscribe((res) => {
      console.log('res: ', res);
      // this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

  showModalDeleteAll(data) {
    console.log('data: ', data);
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(DeleteAllComponent, { context: dataSend }).onClose.subscribe((res) => {
      console.log('res: ', res);
      // this.fnGetAllDataUsersManagement(this.token, this.entity['iIdips']);
    });
  }

}
