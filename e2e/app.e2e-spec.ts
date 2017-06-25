import { JsjobsPage } from './app.po';

describe('jsjobs App', () => {
  let page: JsjobsPage;

  beforeEach(() => {
    page = new JsjobsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
