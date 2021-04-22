import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ReasonService {
  constructor(private http:HttpClient) { }

  addReason(data){
    return this.http.post(environment.baseurl + 'reason/create',data);
  }

  updateReason(data){
    return this.http.post(environment.baseurl + 'reason/update',data);
  }

  listReason(){
    return this.http.get(environment.baseurl + 'reason/getlist');
  }

  detailsReason(id){
    return this.http.get(environment.baseurl + 'reason/details?id='+id);
  }

  deleteReason(id){
    return this.http.delete(environment.baseurl + 'reason/delete?id='+id);
  }
}
