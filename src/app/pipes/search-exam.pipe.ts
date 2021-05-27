import { Exam } from './../models/exam';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchExam'
})
export class SearchExamPipe implements PipeTransform {

  transform(value: Exam[], filterText: string): Exam[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:Exam)=>p.title.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
}
