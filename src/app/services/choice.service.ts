import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Choice } from '../models/choice';
import { ListResponseModel } from '../models/ResponseModel/listResponseModel';
import { ResponseModel } from '../models/ResponseModel/responseModel';
import { SingleResponseModel } from '../models/ResponseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  apiUrl = "https://localhost:44303/api/choices"
  constructor(private httpClient: HttpClient) { }

  getChoices():Observable<ListResponseModel<Choice>> {
    let newPath = this.apiUrl +"/getall"
    return this.httpClient.get<ListResponseModel<Choice>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<Choice>> {
    let newPath = this.apiUrl +"/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Choice>>(newPath);
  }

  getByQuestionId(id: number): Observable<ListResponseModel<Choice>> {
    let newPath = this.apiUrl +"/getbyquestionid?questionId="+id
    return this.httpClient.get<ListResponseModel<Choice>>(newPath)
  }

  updateChoice(choice:Choice):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update",choice);
  }

  addChoice(choice:Choice):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add",choice)
  }
}
