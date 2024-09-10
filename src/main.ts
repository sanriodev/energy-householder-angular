import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { EnergyDataComponent } from './app/app.component';

bootstrapApplication(EnergyDataComponent, appConfig).catch((err) =>
  console.error(err)
);
