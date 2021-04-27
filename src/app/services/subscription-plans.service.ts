import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansService {

  list: any;

  constructor(private http:HttpClient) { }


  listSubscription_Plans() {
    return this.http.get(environment.baseurl + 'subscription-plans/getlist');
  }
  listSubscriptionPlans() {
    return this.http.get(environment.baseurl + 'subscription-plans/getlist');
  }
  updateSubscription_Plans(data: any) {
    return this.http.post(environment.baseurl + 'subscription-plans/create',data);
  }
  deleteSubscriptionPlans(data: any) {
    return this.http.post(environment.baseurl + 'subscription-plans/create',data);
  }

  addSubscription_Plan(data){
    return this.http.post(environment.baseurl + 'subscription-plans/create',data);
  }

  updateSubscription_Plan(data){
    return this.http.post(environment.baseurl + 'subscription-plans/update',data);
  }

  listSubscription_Plan(){
    return this.http.get(environment.baseurl + 'subscription-plans/getlist');
  }

  detailsSubscription_Plan(id){
    return this.http.get(environment.baseurl + 'subscription-plans/details?id='+id);
  }

  deleteSubscription_Plan(id){
    return this.http.delete(environment.baseurl + 'subscription-plans/delete?id='+id);
  }
}
