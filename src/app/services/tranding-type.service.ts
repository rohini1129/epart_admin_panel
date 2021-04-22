import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TrandingTypeService {

  constructor(private http:HttpClient) { }

  addTranding_Type(data){
    return this.http.post(environment.baseurl + 'tranding-type/create',data);
  }

  updateTranding_Type(data){
    return this.http.post(environment.baseurl + 'tranding-type/update',data);
  }

  listTranding_Type(){
    return this.http.get(environment.baseurl + 'tranding-type/getlist');
  }

  detailsTranding_Type(id){
    return this.http.get(environment.baseurl + 'tranding-type/details?id='+id);
  }

  deleteTranding_Type(id){
    return this.http.delete(environment.baseurl + 'Tranding_Type/delete?id='+id);
  }
}
