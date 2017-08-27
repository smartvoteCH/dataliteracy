import { browser, element, by } from 'protractor';

export class QuestionnairePage {

  navigateTo() {
    return browser.get('/sample');
  }
  getNavigation() {
    return element(by.css('nav'));
  }

  goToNext() {
    element(by.css('nav li:nth-of-type(3) a')).click();
  }

  goToPrev() {
    element(by.css('nav li:nth-of-type(1) a')).click();
  }

  getTitle() {
    return element(by.css('dl-questionnaire h1')).getText();
  }

  getAnswer() {
    return element(by.css('dl-questionnaire .answer'));
  }

  showAnswer() {
    element(by.css('dl-questionnaire .show-answer')).click();
  }
}
