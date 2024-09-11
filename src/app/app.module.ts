import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { EnergyOverviewModule } from './views/energy-overview/energy-overview.module';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
const APP_CONTAINERS = [NavbarComponent, FooterComponent];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    HttpClientModule,
    EnergyOverviewModule,
    RouterModule.forRoot(routes),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
