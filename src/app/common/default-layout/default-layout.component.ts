import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private router: Router) {}

  toggleMinimize(e: any) {
    this.sidebarMinimized = e;
  }

  // logout
  logout() {}
}
