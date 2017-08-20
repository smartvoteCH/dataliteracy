import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { QuestionService } from '../services/question.service';
import { MockQuestionService } from '../services/mock-question.service';

import { SmartspiderComponent } from '../graphics/smartspider/smartspider.component';
import { BarchartComponent } from '../graphics/barchart/barchart.component';
import { PiechartComponent } from '../graphics/piechart/piechart.component';
import { PartComponent } from './part/part.component';
import { QuestionnaireComponent } from './questionnaire.component';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireComponent, PartComponent, SmartspiderComponent, BarchartComponent, PiechartComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {provide: QuestionService, useClass: MockQuestionService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
