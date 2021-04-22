import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlansService {
  listSubscription_Plans() {
    throw new Error('Method not implemented.');
  }
  listSubscriptionPlans() {
    throw new Error('Method not implemented.');
  }
  updateSubscription_Plans(value: any) {
    throw new Error('Method not implemented.');
  }
  deleteSubscriptionPlans(uid: any) {
    throw new Error('Method not implemented.');
  }
  list: any;

  constructor(private http:HttpClient) { }

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
