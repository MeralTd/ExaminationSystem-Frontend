import { QuestionService } from 'src/app/services/question.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Choice } from 'src/app/models/choice';
import { ChoiceService } from 'src/app/services/choice.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-choice-add',
  templateUrl: './choice-add.component.html',
  styleUrls: ['./choice-add.component.css']
})
export class ChoiceAddComponent implements OnInit {
  choiceForm : FormGroup;
  choice:Choice
  questions: Question[] = [];
  currentChoiceId: number;
  operationType: string;
  correct: true;
  questionId :number;

  constructor(
    private formBuilder:FormBuilder, 
    private choiceService:ChoiceService,
    private questionService:QuestionService, 
    private toastrService:ToastrService,
    private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      this.getQuestions()
      if (params['choice']) {
        this.operationType = 'Update';
        this.createChoiceUpdateForm();
        this.getChoice(params['choice']);

        
      } else if(params["id"])
      {
        this.questionId =params["id"]
        this.createChoiceAddForm();
    
        this.operationType = 'Add';
      }
     
    });
  }

  getQuestions(){
    this.questionService.getQuestions().subscribe(response => {
      this.questions=response.data;
    })
  }
  createChoiceAddForm(){
     this.choiceForm = this.formBuilder.group({
      questionId: ['', Validators.required],
      text:['', Validators.required],
      correct:['',]
     })
  }

  createChoiceUpdateForm() {
    this.choiceForm = this.formBuilder.group({
      id: [''],
      questionId: ['', Validators.required],
      text:['', Validators.required],
      correct:['', Validators.required]
    });
  }

  add(){
    if(this.choiceForm.valid){
      let choiceModel = Object.assign({},this.choiceForm.value)
      this.choiceService.addChoice(choiceModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        console.log(responseError.message)
        this.toastrService.error(responseError.error.ErrorMessage,"Doğrulama hatası")
                
        
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }

  update(){
    if (this.choiceForm.valid) {
      let choiceModel = Object.assign({}, this.choiceForm.value);
      choiceModel.id = this.currentChoiceId
      this.choiceService.updateChoice(choiceModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.error(responseError.message);
        }
      );
    } else {
      this.toastrService.error('Form eksik', 'Hata');
    }
  }

  getChoice(Choice:number){
    this.currentChoiceId = Choice;
    this.choiceService.getById(Choice).subscribe(response => {
        this.choiceForm.patchValue({
          id:response.data.id,
          questionId: response.data.questionId,
          text:response.data.text,
          correct:response.data.correct
      });
      console.log(this.currentChoiceId)
      });
  }

}
