import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPart } from '../../models/question.model';

import { SmartspiderComponent } from '../../graphics/smartspider/smartspider.component';
import { BarchartComponent } from '../../graphics/barchart/barchart.component';
import { PartComponent } from './part.component';

describe('PartComponent', () => {
  let component: PartComponent;
  let fixture: ComponentFixture<PartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartComponent, SmartspiderComponent, BarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartComponent);
    component = fixture.componentInstance;
    component.part = <QuestionPart>{type: 'text', text: 'foo'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
