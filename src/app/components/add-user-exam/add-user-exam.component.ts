import { UserExamService } from './../../services/user-exam.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../models/user';
import { Exam } from './../../models/exam';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserExam } from 'src/app/models/userExam';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/services/exam.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user-exam',
  templateUrl: './add-user-exam.component.html',
  styleUrls: ['./add-user-exam.component.css']
})
export class AddUserExamComponent implements OnInit {
  userExams:UserExam
  userExamForm : FormGroup;
  exams:Exam[]
  users:User[]
  currentUserExamId: number;
  operationType: string;

  constructor(
    private formBuilder:FormBuilder, 
    private userService:UserService, 
    private toastrService:ToastrService,
    private examService:ExamService,
    private userExamService:UserExamService,
    private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      this.getExams();
      this.getUsers()
      if (params['userExam']) {
        this.operationType = 'Update';
        this.createUserExamUpdateForm();
        this.getUserExam(params['userExam']);

        
      } else {
        this.createUserExamAddForm();
    
        this.operationType = 'Add';
      }
    });
  }

  getExams(){
    this.examService.getExams().subscribe(response => {
      this.exams=response.data;
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users=response.data;
      console.log(response.data)
    })
  }
  createUserExamAddForm(){
     this.userExamForm = this.formBuilder.group({
      userId:['', Validators.required],
      examId: ['', Validators.required],
     })
  }

  createUserExamUpdateForm() {
    this.userExamForm = this.formBuilder.group({
      id: [''],
      userId:['', Validators.required],
      examId: ['', Validators.required],
    });
  }

  add(){
    if(this.userExamForm.valid){
      let userExamModel = Object.assign({},this.userExamForm.value)
      this.userExamService.addUserExam(userExamModel).subscribe(response=>{
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
    if (this.userExamForm.valid) {
      let UserExamModel = Object.assign({}, this.userExamForm.value);
      UserExamModel.id = this.currentUserExamId
      this.userExamService.updateUserExam(UserExamModel).subscribe(
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

  getUserExam(UserExam:number){
    this.currentUserExamId = UserExam;
    this.userExamService.getById(UserExam).subscribe(response => {
        this.userExamForm.patchValue({
          id:response.data.id,
          userId:response.data.userId,
          examId: response.data.examId,
      });
      console.log(this.currentUserExamId)
      });
  }

}

