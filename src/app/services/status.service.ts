import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
 
  constructor(private http:HttpClient) { }

  addStatus(data){
    return this.http.post(environment.baseurl + 'status/create',data);
  }

  updateStatus(data){
    return this.http.post(environment.baseurl + 'status/update',data);
  }

  listStatus(){
    return this.http.get(environment.baseurl + 'status/getlist');
  }

  detailsStatus(id){
    return this.http.get(environment.baseurl + 'status/details?id='+id);
  }

  deleteStatus(id){
    return this.http.delete(environment.baseurl + 'status/delete?id='+id);
  }
}
