import { WatchfriendsPage } from './app.po';

describe('watchfriends App', function() {
  let page: WatchfriendsPage;

  beforeEach(() => {
    page = new WatchfriendsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
