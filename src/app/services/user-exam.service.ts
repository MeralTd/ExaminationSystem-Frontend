import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ResponseModel/listResponseModel';
import { ResponseModel } from '../models/ResponseModel/responseModel';
import { SingleResponseModel } from '../models/ResponseModel/singleResponseModel';
import { UserExam } from '../models/userExam';

@Injectable({
  providedIn: 'root'
})
export class UserExamService {

  apiUrl = "https://localhost:44303/api/userexams"
  constructor(private httpClient: HttpClient) { }

  getUserExams():Observable<ListResponseModel<UserExam>> {
    let newPath = this.apiUrl +"/getall"
    return this.httpClient.get<ListResponseModel<UserExam>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<UserExam>> {
    let newPath = this.apiUrl +"/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<UserExam>>(newPath);
  }

  updateUserExam(userExam:UserExam):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",userExam);
  }

  addUserExam(userExam:UserExam):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",userExam)
  }
}
