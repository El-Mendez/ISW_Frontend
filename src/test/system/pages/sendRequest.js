/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import {By, until} from 'selenium-webdriver';
import Elements from './elements';

export default class SendRequest extends Elements {
    _friendRequest = By.xpath(`//div[@value='Maria Gonzales']`);

    _addFriend = By.id('addFriend');

    _sentRequest = By.id('sentRequest');

    // eslint-disable-next-line no-useless-constructor
    constructor(driver) {
      super(driver);
    }

    writeText(element, text) {
      this.explicitWait(element, undefined, true, text);
    }

    clickButton(element) {
      this.explicitWait(element, true);
    }

    async sendRequestAction() {
      this.clickButton(this._friendRequest);
      this.clickButton(this._addFriend);
      await this.driver.wait(until.alertIsPresent());
      const alert = await this.driver.switchTo().alert();
      await alert.accept();
      this.clickButton(this._sentRequest);
    }
}
