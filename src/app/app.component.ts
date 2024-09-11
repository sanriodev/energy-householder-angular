import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><app-footer></app-footer>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    @Inject(Router)
    private router: Router // public iconSet: IconSetService
  ) {
    // iconSet singleton
    // iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
