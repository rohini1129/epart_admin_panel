import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private http:HttpClient) { }

  addUser_Type(data){
    return this.http.post(environment.baseurl + 'user-type/create',data);
  }

  updateUser_Type(data){
    return this.http.post(environment.baseurl + 'user-type/update',data);
  }

  listUser_Type(){
    return this.http.get(environment.baseurl + 'user-type/getlist');
  }

  detailsUser_Type(id){
    return this.http.get(environment.baseurl + 'user-type/details?id='+id);
  }

  deleteUser_Type(id){
    return this.http.delete(environment.baseurl + 'user-type/delete?id='+id);
  }
}
