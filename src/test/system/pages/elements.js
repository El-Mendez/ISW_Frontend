import { until, By } from 'selenium-webdriver';
import { NULL } from 'node-sass';

export default class Elements {
  constructor(driver) {
    this.driver = driver;
  }

  explicitWait(element, click = false, keys = false, msg = NULL) {
    try {
      // Espera por 10 segundos
      if (keys) {
        this.driver.wait(until.elementLocated(element), 10000).sendKeys(msg);
      } else if (click) {
        this.driver.wait(until.elementLocated(element, 10000)).click();
      }
    } catch (e) {
      console.log('test');
      console.log(e);
    }
  }
}
