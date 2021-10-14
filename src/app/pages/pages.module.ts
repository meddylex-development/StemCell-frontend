import { NgModule } from '@angular/core';
import { 
  NbMenuModule, 
  NbCardModule, 
  NbTooltipModule, 
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    NgxPaginationModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbTooltipModule,
    DashboardModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
