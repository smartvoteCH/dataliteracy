import { HomePage } from './home.po';
import { QuestionnairePage } from './questionnaire.po';

describe('dataliteracy app', () => {
  let home: HomePage;
  let questionnaire: QuestionnairePage;

  describe('home', () => {
    beforeEach(() => {
      home = new HomePage();
      questionnaire = new QuestionnairePage();
    });

    it('should display message saying app works', () => {
      home.navigateTo();
      expect(home.getParagraphText()).toEqual('Data Literacy');
    });

    it('should have nine tiles', () => {
      home.navigateTo();
      expect(home.getTiles().count()).toEqual(9);
    });

    it('click on tile navigates to Questionnaire', () => {
      const nav = questionnaire.getNavigation();
      expect(nav.isPresent()).toBeFalsy();
      home.getTiles().get(0).click();
      expect(nav.isPresent()).toBeTruthy();
    });

  });

  describe('questionnaire', () => {

    beforeEach(() => {
      questionnaire = new QuestionnairePage();
    });

    it('navigate between questions', () => {
      questionnaire.navigateTo();
      expect(questionnaire.getTitle()).toEqual('Minimale Frage');
      questionnaire.goToNext();
      expect(questionnaire.getTitle()).toEqual('Grafiken (von der Applikation gerendert)');
      questionnaire.goToPrev();
      expect(questionnaire.getTitle()).toEqual('Minimale Frage');
    });

    it('show answer', () => {
      questionnaire.navigateTo();
      expect(questionnaire.getAnswer().isPresent()).toBeFalsy();
      questionnaire.showAnswer();
      expect(questionnaire.getAnswer().isPresent()).toBeTruthy();
    });

    describe('json can be parsed', () => {
      const pages = [
        'smartvote', 'smartspider', 'politiker',
        'usa', 'taeuschung',
        'sample'];
      for (const page of pages) {
        it(page, () => {
          questionnaire.navigateTo(`/${page}`);
          expect(questionnaire.getTitle()).toBeTruthy();
        });
      }
    });

  });

});
