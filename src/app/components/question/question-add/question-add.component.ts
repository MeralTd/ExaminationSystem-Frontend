import { Question } from './../../../models/question';
import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { Exam } from 'src/app/models/exam';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {

  exams:Exam[]
  questionForm : FormGroup;
  question:Question
  currentQuestionId: number;
  operationType: string;

  constructor(
    private formBuilder:FormBuilder, 
    private questionService:QuestionService, 
    private toastrService:ToastrService,
    private examService:ExamService,
    private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      this.getExams();
      if (params['question']) {
        this.operationType = 'Update';
        this.createQuestionUpdateForm();
        this.getQuestion(params['question']);

        
      } else {
        this.createQuestionAddForm();
    
        this.operationType = 'Add';
      }
    });
  }

  getExams(){
    this.examService.getExams().subscribe(response => {
      this.exams=response.data;
    })
  }
  createQuestionAddForm(){
     this.questionForm = this.formBuilder.group({
      examId: ['', Validators.required],
      text:['', Validators.required],
      score:['', Validators.required],
     })
  }

  createQuestionUpdateForm() {
    this.questionForm = this.formBuilder.group({
      id: [''],
      examId: ['', Validators.required],
      text:['', Validators.required],
      score:['', Validators.required],
    });
  }

  add(){
    if(this.questionForm.valid){
      let questionModel = Object.assign({},this.questionForm.value)
      this.questionService.addQuestion(questionModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }

  update(){
    if (this.questionForm.valid) {
      let QuestionModel = Object.assign({}, this.questionForm.value);
      QuestionModel.id = this.currentQuestionId
      this.questionService.updateQuestion(QuestionModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.success(responseError.message);
        }
      );
    } else {
      this.toastrService.error('Form eksik', 'Hata');
    }
  }

  getQuestion(Question:number){
    this.currentQuestionId = Question;
    this.questionService.getById(Question).subscribe(response => {
        this.questionForm.patchValue({
          id:response.data.id,
          examId: response.data.examId,
          text:response.data.text,
          score:response.data.score
      });
      console.log(this.currentQuestionId)
      });
  }

}
