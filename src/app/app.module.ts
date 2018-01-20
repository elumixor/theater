import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {ErrorComponent} from './pages/error/error.component';
import {PerformancesComponent} from './pages/performances/performances.component';
import {PerformanceDetailComponent} from './pages/performance-detail/performance-detail.component';
import {SceneComponent} from './pages/scene/scene.component';
import {PersonalInfoComponent} from './pages/personal-info/personal-info.component';
import {ConfirmationComponent} from './pages/confirmation/confirmation.component';
import {SuccessComponent} from './pages/success/success.component';
import {LandingComponent} from './landing/landing.component';
import {AppRoutingModule} from './app-routing.module';
import {DataManagementService} from './services/data-management.service';
import {BgTestComponent} from './dev/bg-test/bg-test.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ErrorComponent,
    PerformancesComponent,
    PerformanceDetailComponent,
    SceneComponent,
    PersonalInfoComponent,
    ConfirmationComponent,
    SuccessComponent,
    LandingComponent,
    BgTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataManagementService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
