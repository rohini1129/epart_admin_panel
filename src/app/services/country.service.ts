import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

  addCountry(data){
    return this.http.post(environment.baseurl + 'country/create',data);
  }

  updateCountry(data){
    return this.http.post(environment.baseurl + 'country/update',data);
  }

  listCountry(){
    return this.http.get(environment.baseurl + 'country/getlist');
  }

  detailsCountry(id){
    return this.http.get(environment.baseurl + 'country/details?id='+id);
  }

  deleteCountry(id){
    return this.http.delete(environment.baseurl + 'country/delete?id='+id);
  }
}
