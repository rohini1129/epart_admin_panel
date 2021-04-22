import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ToastrModule } from 'ng6-toastr-notifications';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EcellsComponent } from './ecells/ecells.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddbuyersComponent } from './addbuyers/addbuyers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddsellersComponent } from './addsellers/addsellers.component';
import { AddsettingsComponent } from './addsettings/addsettings.component';
import { AddintermedaitorComponent } from './addintermedaitor/addintermedaitor.component';
import { AddcarsComponent } from './addcars/addcars.component';
import { LandingComponent } from './landing/landing.component';
import { NavigationComponent } from './user-pages/navigation/navigation.component';
import { HomeComponent } from './user-pages/home/home.component';
import { FooterComponent } from './user-pages/footer/footer.component';
import { ProductListComponent } from './user-pages/product-list/product-list.component';
import { SubscriptionPlansComponent } from './admin-pages/subscription-plans/subscription-plans.component';
import { StatusComponent } from './admin-pages/status/status.component';
import { CountryComponent } from './admin-pages/country/country.component';
import { StateComponent } from './admin-pages/state/state.component';
import { CityComponent } from './admin-pages/city/city.component';
import { ProductTypeComponent } from './admin-pages/product-type/product-type.component';
import { TradingTypeComponent } from './admin-pages/trading-type/trading-type.component';
import { ReasonComponent } from './admin-pages/reason/reason.component';
import { CurrencyComponent } from './admin-pages/currency/currency.component';
import { RoleComponent } from './admin-pages/role/role.component';
import { UserTypeComponent } from './admin-pages/user-type/user-type.component';
import { PayoutScheduleComponent } from './admin-pages/payout-schedule/payout-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EcellsComponent,
    AddbuyersComponent,
    DashboardComponent,
    AddsellersComponent,
    AddsettingsComponent,
    AddintermedaitorComponent,
    AddcarsComponent,
    LandingComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    ProductListComponent,
    SubscriptionPlansComponent,
    StatusComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    ProductTypeComponent,
    TradingTypeComponent,
    ReasonComponent,
    CurrencyComponent,
    RoleComponent,
    UserTypeComponent,
    PayoutScheduleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgSelectModule,
    AngularEditorModule,
    HttpClientModule,
    NgxPaginationModule,
    FilterPipeModule,
    AutocompleteLibModule,
    CarouselModule,
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
