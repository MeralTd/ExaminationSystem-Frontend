import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserExamComponent } from './add-user-exam.component';

describe('AddUserExamComponent', () => {
  let component: AddUserExamComponent;
  let fixture: ComponentFixture<AddUserExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
