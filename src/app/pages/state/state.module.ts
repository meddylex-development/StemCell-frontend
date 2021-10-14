import { NgModule } from '@angular/core';
import { NbCardModule, NbTooltipModule, } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { ThemeModule } from '../../@theme/theme.module';
import { StateComponent } from './state.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTooltipModule,
    ThemeModule,
    NgxPaginationModule,
  ],
  declarations: [
    StateComponent,
    ListComponent,
    AddComponent,
  ],
})
export class StateModule { }

