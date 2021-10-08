import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { UtilitiesService } from 'app/shared/api/services/utilities.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public accessModDirectionSwitcher: boolean = false;
  public accessModThemeSelect: boolean = false;
  public accessIconToggleSidebar: boolean = false;
  public accessLogo: boolean = false;
  public accessModSearch: boolean = false;
  public accessModEmail: boolean = false;
  public accessModNotifications: boolean = false;
  public accessModPictureProfile: boolean = false;
  public urlLogo: string;
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  items: Observable<any[]>;
  permissions: any = null;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private breakpointService: NbMediaBreakpointsService,
    private utilitiesService: UtilitiesService,
  ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.fnGetDataAccess();

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  fnGetDataAccess() {
    let urlCollection = 'PermissionAreas';
    let urlLogo = 'UrlLogo';
    this.utilitiesService.fnGetDataFBCallback(urlLogo, (response) => {
      console.log('response: ', response);
      this.urlLogo = response;
    });
    
    this.utilitiesService.fnGetDataFBCallback(urlCollection, (response) => {
      console.log('response: ', response);
      let dataAccess = response;
      this.accessModDirectionSwitcher = dataAccess['modDirectionSwitcher']['state'];
      this.accessModThemeSelect = dataAccess['modThemeSelect']['state'];
      this.accessIconToggleSidebar = dataAccess['modIconToggleSidebar']['state'];
      this.accessLogo = dataAccess['modLogo']['state'];
      this.accessModSearch = dataAccess['modSearch']['state'];
      this.accessModEmail = dataAccess['modEmail']['state'];
      this.accessModNotifications = dataAccess['modNotifications']['state'];
      this.accessModPictureProfile = dataAccess['modPictureProfile']['state'];
      console.log('this.accessModPictureProfile: ', this.accessModPictureProfile);
    });


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
