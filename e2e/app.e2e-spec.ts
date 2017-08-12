import { DataliteracyPage } from './app.po';

describe('dataliteracy App', () => {
  let page: DataliteracyPage;

  beforeEach(() => {
    page = new DataliteracyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
