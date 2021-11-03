/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class CancelRequest extends Elements {
    _mailBox = By.id('mailbox');

    _possibleFriend = By.xpath(`//div[@value=${this.name}]`);

    _deleteRequest = By.id('addFriend');

    // eslint-disable-next-line no-useless-constructor
    constructor(driver, name = 'Maria') {
      super(driver);
      this.name = name;
    }

    clickButton(element) {
      this.explicitWait(element, true);
    }

    logInAction() {
      this.clickButton(this._mailBox);
      this.clickButton(this._possibleFriend);
      this.clickButton(this._deleteRequest);
    }
}
