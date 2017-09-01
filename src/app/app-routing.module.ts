import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ContactComponent } from './contact/contact.component';
import { SendlinkComponent } from './sendlink/sendlink.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'smartvote/:id', component: QuestionnaireComponent},
  {path: 'smartvote', component: QuestionnaireComponent},
  {path: 'smartspider/:id', component: QuestionnaireComponent},
  {path: 'smartspider', component: QuestionnaireComponent},
  {path: 'politiker/:id', component: QuestionnaireComponent},
  {path: 'politiker', component: QuestionnaireComponent},
  {path: 'usa/:id', component: QuestionnaireComponent},
  {path: 'usa', component: QuestionnaireComponent},
  {path: 'taeuschung/:id', component: QuestionnaireComponent},
  {path: 'taeuschung', component: QuestionnaireComponent},
  {path: 'proportion/:id', component: QuestionnaireComponent},
  {path: 'proportion', component: QuestionnaireComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'linksenden', component: SendlinkComponent},
  {path: 'kontakt', component: ContactComponent},
  // for e2e testing and documentation only
  {path: 'sample/:id', component: QuestionnaireComponent},
  {path: 'sample', component: QuestionnaireComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
