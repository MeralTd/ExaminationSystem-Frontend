import { Exam } from './../../../models/exam';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html',
  styleUrls: ['./exam-add.component.css']
})
export class ExamAddComponent implements OnInit {

  examForm : FormGroup;
  exam:Exam
  currentExamId: number;
  operationType: string;

  constructor(
    private formBuilder:FormBuilder, 
    private examService:ExamService, 
    private toastrService:ToastrService,
    private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['exam']) {
        this.operationType = 'Update';
        this.createExamUpdateForm();
        this.getExam(params['exam']);

        
      } else {
        this.createExamAddForm();
    
        this.operationType = 'Add';
      }
    });
  }

  createExamAddForm(){
     this.examForm = this.formBuilder.group({
       title:["",Validators.required]
     })
  }

  createExamUpdateForm() {
    this.examForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
    });
  }

  add(){
    if(this.examForm.valid){
      let examModel = Object.assign({},this.examForm.value)
      this.examService.addExam(examModel).subscribe(response=>{
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
    if (this.examForm.valid) {
      let examModel = Object.assign({}, this.examForm.value);
      examModel.id = this.currentExamId
      this.examService.updateExam(examModel).subscribe(
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

  getExam(exam:number){
    this.currentExamId = exam;
    this.examService.getById(exam).subscribe(response => {
        this.examForm.patchValue({
          id:response.data.id,
          title: response.data.title,
      });
      console.log(this.currentExamId)
      });
  }

}
