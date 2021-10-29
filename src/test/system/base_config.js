import { Builder } from 'selenium-webdriver';

export default class InitDriver {
  #driver;

  init(browser) {
    const setUp = async (browser) => {
      if (browser === 'firefox') this.driver = new Builder().forBrowser('firefox').build();
      // TODO agg más browsers
      else this.driver = await new Builder().forBrowser('firefox').build();
    };
    setUp(browser);
  }

  async close() {
    try {
      await this.driver.quit();
    } catch (e) {
      e.printStackTrace();
    }
  }
}
