import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbuyersComponent } from './addbuyers/addbuyers.component';
import { AddsellersComponent } from './addsellers/addsellers.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddcarsComponent } from './addcars/addcars.component';
import { AddintermedaitorComponent } from './addintermedaitor/addintermedaitor.component';
import { EcellsComponent } from './ecells/ecells.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { NavigationComponent } from './user-pages/navigation/navigation.component';
import { HomeComponent } from './user-pages/home/home.component';
import { ProductListComponent } from './user-pages/product-list/product-list.component';
import { UserTypeComponent } from './admin-pages/user-type/user-type.component';
import { TradingTypeComponent } from './admin-pages/trading-type/trading-type.component';
import { StatusComponent } from './admin-pages/status/status.component';
import { RoleComponent } from './admin-pages/role/role.component';
import { SubscriptionPlansComponent } from './admin-pages/subscription-plans/subscription-plans.component';
import { StateComponent } from './admin-pages/state/state.component';
import { ReasonComponent } from './admin-pages/reason/reason.component';
import { ProductTypeComponent } from './admin-pages/product-type/product-type.component';
import { PayoutScheduleComponent } from './admin-pages/payout-schedule/payout-schedule.component';
import { CurrencyComponent } from './admin-pages/currency/currency.component';
import { CountryComponent } from './admin-pages/country/country.component';
import { CityComponent } from './admin-pages/city/city.component';

const routes: Routes = [
  {path:'',redirectTo:'navigation',pathMatch:'full'},
  {path:'navigation',component:NavigationComponent, children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'product-list',component:ProductListComponent},
  ]},

  {path:'home',component:LandingComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent,children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'buyermanagement', component:AddbuyersComponent},
    {path:'sellermanagement', component:AddsellersComponent},
    {path:'intermedaitormanagement', component:AddintermedaitorComponent},
    {path:'cars', component:AddcarsComponent},
    {path:'city', component:CityComponent},
    {path:'country', component:CountryComponent},
    {path:'currency', component:CurrencyComponent},
    {path:'payout-schedule', component:PayoutScheduleComponent},
    {path:'product-type', component:ProductTypeComponent},
    {path:'reason', component:ReasonComponent},
    {path:'state', component:StateComponent},
    {path:'subscription-plans', component:SubscriptionPlansComponent},
    {path:'role', component:RoleComponent},
    {path:'status', component:StatusComponent},
    {path:'trading-type', component:TradingTypeComponent},
    {path:'user-type', component:UserTypeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
