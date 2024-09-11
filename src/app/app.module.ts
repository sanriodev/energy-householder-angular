import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './common';
import { EnergyOverviewModule } from './views/energy-overview/energy-overview.module';
const APP_CONTAINERS = [DefaultLayoutComponent];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    EnergyOverviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
