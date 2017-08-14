import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartspiderComponent } from './smartspider.component';

describe('SmartspiderComponent', () => {
  let component: SmartspiderComponent;
  let fixture: ComponentFixture<SmartspiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartspiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartspiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
