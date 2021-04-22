import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private http:HttpClient) { }

  addState(data){
    return this.http.post(environment.baseurl + 'state/create',data);
  }

  updateState(data){
    return this.http.post(environment.baseurl + 'state/update',data);
  }

  listState(){
    return this.http.get(environment.baseurl + 'state/getlist');
  }

  detailsState(id){
    return this.http.get(environment.baseurl + 'state/details?id='+id);
  }

  deleteState(id){
    return this.http.delete(environment.baseurl + 'state/delete?id='+id);
  }
}
