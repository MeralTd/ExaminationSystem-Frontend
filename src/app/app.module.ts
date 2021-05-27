import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ToastrModule} from "ngx-toastr";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { ExamComponent } from './components/exam/exam.component';
import { ExamAddComponent } from './components/exam/exam-add/exam-add.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionAddComponent } from './components/question/question-add/question-add.component';
import { ChoiceAddComponent } from './components/choice-add/choice-add.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SearchExamPipe } from './pipes/search-exam.pipe';
import { AddUserExamComponent } from './components/add-user-exam/add-user-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    ExamComponent,
    ExamAddComponent,
    QuestionComponent,
    QuestionAddComponent,
    ChoiceAddComponent,
    RegisterComponent,
    LoginComponent,
    SearchExamPipe,
    AddUserExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
