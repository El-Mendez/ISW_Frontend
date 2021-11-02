/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class Login extends Elements {
    _friendRequest = By.xpath(`//div[@value=${this.name}]`);

    _addFriend = By.id('addFriend');

    _mailBox = By.id('mailBox');

    _sentRequest = By.id('sentRequest');

    // eslint-disable-next-line no-useless-constructor
    constructor(driver, name = 'Maria') {
      super(driver);
      this.name = name;
    }

    writeText(element, text) {
      this.explicitWait(element, undefined, true, text);
    }

    clickButton(element) {
      this.explicitWait(element, true);
    }

    logInAction() {
      this.clickButton(this._friendRequest);
      this.clickButton(this._addFriend);
      this.clickButton(this._mailBox);
      this.clickButton(this._sentRequest);
    }
}
