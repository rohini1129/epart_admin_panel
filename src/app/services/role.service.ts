import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http:HttpClient) { }

  addRole(data){
    return this.http.post(environment.baseurl + 'role/create',data);
  }

  updateRole(data){
    return this.http.post(environment.baseurl + 'role/update',data);
  }

  listRole(){
    return this.http.get(environment.baseurl + 'role/getlist');
  }

  detailsRole(id){
    return this.http.get(environment.baseurl + 'role/details?id='+id);
  }

  deleteRole(id){
    return this.http.delete(environment.baseurl + 'role/delete?id='+id);
  }
}
