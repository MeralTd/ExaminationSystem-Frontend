import { Exam } from './../models/exam';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel/responseModel';
import { SingleResponseModel } from '../models/ResponseModel/singleResponseModel';
import { ListResponseModel } from '../models/ResponseModel/listResponseModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  apiUrl = "https://localhost:44303/api/exams"
  constructor(private httpClient: HttpClient) { }

  getExams():Observable<ListResponseModel<Exam>> {
    let newPath = this.apiUrl +"/getall"
    return this.httpClient.get<ListResponseModel<Exam>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<Exam>> {
    let newPath = this.apiUrl +"/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Exam>>(newPath);
  }

  updateExam(exam:Exam):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",exam);
  }

  addExam(exam:Exam):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",exam)
  }
}
