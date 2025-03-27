import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { ApplicationConfig, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  export const appConfig: ApplicationConfig = {
    providers: [provideHttpClient(withFetch())]
  };
  