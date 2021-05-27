import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { ListResponseModel } from '../models/ResponseModel/listResponseModel';
import { ResponseModel } from '../models/ResponseModel/responseModel';
import { SingleResponseModel } from '../models/ResponseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = "https://localhost:44303/api/questions"
  constructor(private httpClient: HttpClient) { }

  getQuestions():Observable<ListResponseModel<Question>> {
    let newPath = this.apiUrl +"/getall"
    return this.httpClient.get<ListResponseModel<Question>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<Question>> {
    let newPath = this.apiUrl +"/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Question>>(newPath);
  }

  getByExamId(id: number): Observable<ListResponseModel<Question>> {
    let newPath = this.apiUrl +"/getbyexamid?examId="+id
    return this.httpClient.get<ListResponseModel<Question>>(newPath)
  }

  updateQuestion(question:Question):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",question);
  }

  addQuestion(question:Question):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",question)
  }
}