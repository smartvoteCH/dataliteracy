import { DataliteracyPage } from './app.po';
import { HomePage } from './home.po';

describe('dataliteracy App', () => {
  let page: DataliteracyPage;
  let home: HomePage;

  beforeEach(() => {
    page = new DataliteracyPage();
    home = new HomePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Data Literacy');
  });

  it('should have nine tiles', () => {
    home.navigateTo();
    expect(home.getTiles().count()).toEqual(9);
  });
});
