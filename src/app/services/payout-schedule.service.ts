import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Payout_ScheduleService {

  constructor(private http:HttpClient) { }

  addPayout_Schedule(data){
    return this.http.post(environment.baseurl + 'payout-schedule/create',data);
  }

  updatePayout_Schedule(data){
    return this.http.post(environment.baseurl + 'payout-schedule/update',data);
  }

  listPayout_Schedule(){
    return this.http.get(environment.baseurl + 'payout-schedule/getlist');
  }

  detailsPayout_Schedule(id){
    return this.http.get(environment.baseurl + 'payout-schedule/details?id='+id);
  }

  deletePayout_Schedule(id){
    return this.http.delete(environment.baseurl + 'payout-schedule/delete?id='+id);
  }
}
