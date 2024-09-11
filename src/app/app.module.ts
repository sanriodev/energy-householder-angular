import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './common';
import { EnergyOverviewModule } from './views/energy-overview/energy-overview.module';
import { BrowserModule } from '@angular/platform-browser';
const APP_CONTAINERS = [DefaultLayoutComponent];

@NgModule({
  declarations: [AppComponent],
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
