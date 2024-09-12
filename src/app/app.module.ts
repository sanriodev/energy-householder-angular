import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { EnergyOverviewModule } from './views/energy-overview/energy-overview.module';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { HeartbeatOverviewModule } from './views/heartbeat-overview/heartbeat-overview.module';
import { WeatherOverviewModule } from './views/weather-overview/weather-overview.module';
const APP_CONTAINERS = [NavbarComponent, FooterComponent];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    HttpClientModule,
    EnergyOverviewModule,
    HeartbeatOverviewModule,
    WeatherOverviewModule,
    RouterModule.forRoot(routes),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
