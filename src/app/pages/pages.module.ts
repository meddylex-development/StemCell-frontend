import { NgModule } from '@angular/core';
import { 
  NbMenuModule, 
  NbCardModule, 
  NbTooltipModule, 
  NbActionsModule,
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { StateModule } from './state/state.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    NgxPaginationModule,
    ThemeModule,
    NbMenuModule,
    NbButtonModule,
    NbActionsModule,
    NbInputModule,
    NbCardModule,
    NbTooltipModule,
    DashboardModule,
    StateModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
