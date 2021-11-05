import { Builder } from 'selenium-webdriver';

export default class BaseConfig {
  driver;

  init(browser) {
    if (browser === 'firefox') this.driver = new Builder().forBrowser('firefox').build();
    // TODO agg más browsers
    else this.driver = new Builder().forBrowser('firefox').build();
  }

  async openPage(url) {
    await this.driver.get(url);
  }

  close() {
    try {
      this.driver.quit();
    } catch (e) {
      console.log(e);
    }
  }
}
