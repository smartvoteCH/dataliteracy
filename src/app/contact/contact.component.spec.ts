import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormService } from '../services/form.service';
import { MockFormService } from '../services/mock-form.service';

import { ContactComponent } from './contact.component';
import { SimpleNavigationComponent } from '../navigation/simple-navigation/simple-navigation.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent, SimpleNavigationComponent ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [
        {provide: FormService, useClass: MockFormService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
