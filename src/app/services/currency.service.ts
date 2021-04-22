import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http:HttpClient) { }

  addCurrency(data){
    return this.http.post(environment.baseurl + 'currency/create',data);
  }

  updateCurrency(data){
    return this.http.post(environment.baseurl + 'currency/update',data);
  }

  listCurrency(){
    return this.http.get(environment.baseurl + 'currency/getlist');
  }

  detailsCurrency(id){
    return this.http.get(environment.baseurl + 'currency/details?id='+id);
  }

  deleteCurrency(id){
    return this.http.delete(environment.baseurl + 'currency/delete?id='+id);
  }
}
