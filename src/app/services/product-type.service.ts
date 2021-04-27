import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  listProduct_type() {
    throw new Error('Method not implemented.');
  }
 
  constructor(private http:HttpClient) { }

  addProduct_Type(data){
    return this.http.post(environment.baseurl + 'product_type/create',data);
  }

  updateProduct_Type(data){
    return this.http.post(environment.baseurl + 'product_type/update',data);
  }

  listProduct_Type(){
    return this.http.get(environment.baseurl + 'product_type/getlist');
  }

  detailsProcut_Type(id){
    return this.http.get(environment.baseurl + 'product_type/details?id='+id);
  }

  deleteProduct_Type(id){
    return this.http.delete(environment.baseurl + 'product_type/delete?id='+id);
  }
}


