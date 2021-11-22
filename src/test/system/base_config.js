import { Builder } from 'selenium-webdriver';

export default class BaseConfig {
  driver;

  init(browser) {
    if (process.env.ENVIRONMENT === 'CI') {
      this.driver = new Builder()
        // .forBrowser('firefox')
        // .setFirefoxOptions(new firefox.Options().headless())
        .usingServer('http://localhost:4444/wd/hub')
        .build();
    } else {
      this.driver = new Builder().forBrowser('firefox').build();
    }
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
