import { Component, OnInit } from '@angular/core';
import { 
  NbToastrService, 
  NbDialogService, 
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { UtilitiesService } from 'app/shared/api/services/utilities.service';

import { AddComponent } from '../add/add.component';
import { DeleteAllComponent } from '../delete-all/delete-all.component';
import { DeleteComponent } from '../delete/delete.component';
import { EditComponent } from '../edit/edit.component';
import { StateService } from 'app/shared/api/services/state.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public token: string = '';
  public userData: any = null;
  public currentPage: Number = 1;
  public itemsPerPage: Number = 5;
  public collectionData: any = [
    // { 'id': 1, 'name': 'Activo', 'description': 'Estado activo', 'dateCreated': 1633624131429, 'dateUpdated': 1633624131429 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
    // { 'id': 2, 'name': 'Inactivo', 'description': 'Estado inactivo', 'dateCreated': 1633624131529, 'dateUpdated': 1633624131529 },
  ];
  public collectionOriginalData: any = null;
  public typeSort: any = [
    { id:1, state: 'DEFAULT', column: 'name' },
    { id:2, state: 'DEFAULT', column: 'description' },
    { id:3, state: 'DEFAULT', column: 'dateCreated' },
    { id:4, state: 'DEFAULT', column: 'dateUpdated' },
  ];

  public DATA_LANG: any = null;
  public DATA_LANG_GENERAL: any = null;
  public language: string = '';
  public nameComponent: string = 'stateComponent';

  constructor(
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
      this.token = response['token'];
      this.userData = response['user'];

      this.fnGetList(this.token);
      

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

  fnGetList(token) {
    this.stateService.fnHttpGetStateList(token).subscribe(response => {
      const data = response['body']['state'];
      if (data.length > 0) {
        this.collectionOriginalData = JSON.parse(JSON.stringify(data));
        this.collectionData = JSON.parse(JSON.stringify(data));
      } else {
        this.collectionOriginalData = [];
        this.collectionData = [];
      }
    });
  }

  showModalAdd(data) {
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(AddComponent, { context: dataSend }).onClose.subscribe((res) => {
      this.fnGetList(this.token);
    });
  }

  showModalEdit(data) {
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(EditComponent, { context: dataSend }).onClose.subscribe((res) => {
      this.fnGetList(this.token);
    });
  }

  showModalDelete(data) {
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(DeleteComponent, { context: dataSend }).onClose.subscribe((res) => {
      this.fnGetList(this.token);
    });
  }

  showModalDeleteAll(data) {
    let dataSend = {};
    dataSend['data'] = data;
    this.dialogService.open(DeleteAllComponent, { context: dataSend }).onClose.subscribe((res) => {
      this.fnGetList(this.token);
    });
  }

  showModalHelp(moduleName?, columnName?, title?, description?) {
    this.utilitiesService.fnShowModalHelp(moduleName, columnName, title, description);
  }

  fnOrderList(columnName, collectionData, typeSort, index) {
    console.log('columnName: ', columnName);
    console.log('collectionData: ', collectionData);
    console.log('typeSort: ', typeSort);
    console.log('index: ', index);

    this.typeSort.forEach((element, key) => {
      if(key != index) {
        element['state'] = 'DEFAULT';
      }
    });

    console.log('typeSort[index]["state"]: ', typeSort[index]['state']);
    switch (typeSort[index]['state']) {
      case 'DEFAULT':
        this.typeSort[index]['state'] = 'ASC';
        console.log('typeSort[index]["state"]: ', typeSort[index]['state']);
        this.collectionData = collectionData.sort(this.utilitiesService.compareValues(columnName, this.typeSort[index]['state']));
        console.log('this.collectionData: ', this.collectionData);
        break;
      case 'ASC':
        this.typeSort[index]['state'] = 'DESC';
        this.collectionData = collectionData.sort(this.utilitiesService.compareValues(columnName, this.typeSort[index]['state']));
        break;
      case 'DESC':
        this.typeSort[index]['state'] = 'DEFAULT';
        let dataTest = JSON.parse(JSON.stringify(this.collectionOriginalData));
        this.collectionData = dataTest;
        break;
    }
  }

}
