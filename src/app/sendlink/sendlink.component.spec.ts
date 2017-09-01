import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormService } from '../services/form.service';
import { MockFormService } from '../services/mock-form.service';

import { SendlinkComponent } from './sendlink.component';
import { SimpleNavigationComponent } from '../navigation/simple-navigation/simple-navigation.component';

describe('SendlinkComponent', () => {
  let component: SendlinkComponent;
  let fixture: ComponentFixture<SendlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendlinkComponent, SimpleNavigationComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [
        {provide: FormService, useClass: MockFormService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
