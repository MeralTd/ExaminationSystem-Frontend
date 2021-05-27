import { AddUserExamComponent } from './components/add-user-exam/add-user-exam.component';
import { ChoiceAddComponent } from './components/choice-add/choice-add.component';
import { QuestionAddComponent } from './components/question/question-add/question-add.component';
import { ExamAddComponent } from './components/exam/exam-add/exam-add.component';
import { ExamComponent } from './components/exam/exam.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './components/question/question.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:ExamComponent},
  {path:"exams",component:ExamComponent},
  {path:"exams/add", component:ExamAddComponent},
  {path:"exams/user/add", component:AddUserExamComponent},
  {path:"exams/:filterText", component:ExamComponent },
  {path:"exams/update/:exam",component:ExamAddComponent},
  {path:"exams/detail/:id",component:QuestionComponent},
  {path:"exams/question/add", component:QuestionAddComponent},
  {path:"exams/question/choice/add/:id", component:ChoiceAddComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
