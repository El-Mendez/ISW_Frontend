import { until } from 'selenium-webdriver';
import { NULL } from 'node-sass';

export default class Elements {
  constructor(driver) {
    this.driver = driver;
  }

  async explicitWait(element, click = false, keys = false, msg = '', select = false, option = NULL) {
    try {
      // Espera por 10 segundos
      if (keys) {
        this.driver.wait(until.elementLocated(element), 10000).sendKeys(msg);
      } else if (click) {
        if (select === true) {
          await this.driver.wait(until.elementLocated(element), 10000);
          // eslint-disable-next-line no-shadow
          const select = this.driver.findElement(element);
          select.click();
          select.findElement(option).click();
        } else {
          this.driver.wait(until.elementLocated(element, 10000)).click();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
