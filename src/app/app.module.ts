import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

import { QuestionService } from './services/question.service';
import { SmartspiderComponent } from './graphics/smartspider/smartspider.component';
import { PartComponent } from './questionnaire/part/part.component';
import { BarchartComponent } from './graphics/barchart/barchart.component';
import { PiechartComponent } from './graphics/piechart/piechart.component';
import { ImpressumComponent } from './impressum/impressum.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionnaireComponent,
    SmartspiderComponent,
    PartComponent,
    BarchartComponent,
    PiechartComponent,
    ImpressumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
