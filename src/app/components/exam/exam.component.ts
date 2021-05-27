import { ExamService } from './../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  exams: Exam[] = [];
  currentExam:Exam
  dataLoaded = false;
  filterText:string;

  constructor(private examService:ExamService,
    private authService:AuthService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getExams();
      if (params['filterText']) {
        this.filterText = params['filterText'];
      }
      
    })
  }

  getExams() {
    this.examService.getExams().subscribe(response=>{
      this.exams = response.data;
      this.dataLoaded = true;

    })
  }

  setCurrentExam(exam:Exam){
    this.currentExam = exam
  }

  getCurrentExamClass(exam:Exam){
    if(exam == this.currentExam){
      return "list-group-item list-group-item-info"
    }else{
      return "list-group-item"
    }

  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
