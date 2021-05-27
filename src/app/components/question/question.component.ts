import { Choice } from './../../models/choice';
import { Question } from './../../models/question';
import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Exam } from 'src/app/models/exam';
import { ActivatedRoute } from '@angular/router';
import { ChoiceService } from 'src/app/services/choice.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions: Question[] = [];
  choices: Choice[] = [];
  exams:Exam[] = [];
  currentQuestion:Question
  currentChoice:Choice
  dataLoaded = false;

  constructor(private questionService:QuestionService,
    private choiceService:ChoiceService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getQuestionsForExam(params["id"])
        this.getChoices()
        
      }else{
        this.getQuestions();
      }

  })
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(response=>{
      this.questions = response.data;
      this.dataLoaded = true;

    })
  }

  getQuestionsForExam(id:number) {
      this.questionService.getByExamId(id).subscribe(response=>{
        this.questions = response.data;
        this.dataLoaded = true;
      })
    }

  getChocesForQuestion(questionId:number) {
    this.choiceService.getByQuestionId(questionId).subscribe(response=>{
      this.choices = response.data;
      this.dataLoaded = true;
      console.log(response)
    })
  }

  getChoices(){
    this.choiceService.getChoices().subscribe(response=>{
      this.choices = response.data;
      this.dataLoaded = true;
      console.log(response)
    })
  }

  setCurrentQuestion(question:Question){
    this.currentQuestion = question
  }

  getCurrentQuestionClass(question:Question){
    if(question == this.currentQuestion){
      return "list-group-item list-group-item-info"
    }else{
      return "list-group-item"
    }

  }

  setCurrentChoice(choice:Choice){
    this.currentChoice = choice
  }

  getCurrentChoiceClass(choice:Choice){
    if(choice.correct == true){
      return "checkmark"
    }else{
      return "crossmark"
    }

  }
}
