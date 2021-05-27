import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ResponseModel/listResponseModel';
import { ResponseModel } from '../models/ResponseModel/responseModel';
import { SingleResponseModel } from '../models/ResponseModel/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44303/api/users/"

  constructor(private httpClient:HttpClient) { }

  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update" ,user);
  }

  getUsers():Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl +"getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getByUserId(id:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getbyid?userId=" + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
