import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) { }

  addCity(data){
    return this.http.post(environment.baseurl + 'city/create',data);
  }

  updateCity(data){
    return this.http.post(environment.baseurl + 'city/update',data);
  }

  listCity(){
    return this.http.get(environment.baseurl + 'city/getlist');
  }

  detailsCity(id){
    return this.http.get(environment.baseurl + 'city/details?id='+id);
  }

  deleteCity(id){
    return this.http.delete(environment.baseurl + 'city/delete?id='+id);
  }
}
