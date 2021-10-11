import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { StateComponent } from './state.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
  ],
  declarations: [
    StateComponent,
    ListComponent,
  ],
})
export class StateModule { }

