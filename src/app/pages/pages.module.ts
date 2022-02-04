import { NgModule } from '@angular/core';
import { 
  NbMenuModule, 
  NbCardModule, 
  NbTooltipModule, 
  NbActionsModule,
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { StateModule } from './state/state.module';
import { ProfileModule } from './profile/profile.module';
import { DocumentTypeModule } from './document-type/document-type.module';

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
    NgSelectModule,
    DashboardModule,
    StateModule,
    ProfileModule,
    DocumentTypeModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
