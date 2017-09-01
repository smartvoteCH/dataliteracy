import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { QuestionService } from './services/question.service';
import { FormService } from './services/form.service';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { SmartspiderComponent } from './graphics/smartspider/smartspider.component';
import { PartComponent } from './questionnaire/part/part.component';
import { BarchartComponent } from './graphics/barchart/barchart.component';
import { PiechartComponent } from './graphics/piechart/piechart.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { HomeComponent } from './home/home.component';
import { SimpleNavigationComponent } from './navigation/simple-navigation/simple-navigation.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SendlinkComponent } from './sendlink/sendlink.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    SmartspiderComponent,
    PartComponent,
    BarchartComponent,
    PiechartComponent,
    ImpressumComponent,
    ContactComponent,
    SimpleNavigationComponent,
    SendlinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [QuestionService, FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
