import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { StateComponent } from './state.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
  ],
  declarations: [
    StateComponent,
  ],
})
export class StateModule { }

