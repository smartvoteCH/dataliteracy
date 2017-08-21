import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ImpressumComponent } from './impressum/impressum.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'smartvote/:id', component: QuestionnaireComponent},
  {path: 'smartvote', component: QuestionnaireComponent},
  {path: 'smartspider/:id', component: QuestionnaireComponent},
  {path: 'smartspider', component: QuestionnaireComponent},
  {path: 'proportion/:id', component: QuestionnaireComponent},
  {path: 'proportion', component: QuestionnaireComponent},
  {path: 'impressum', component: ImpressumComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
