import { browser, element, by } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getTiles() {
    return element.all(by.css('dl-root .tile'));
  }
}
