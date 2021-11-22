/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class Profile extends Elements {
  _accountName = By.id('account-name');

  _close = By.id('close-session');

  // eslint-disable-next-line no-useless-constructor
  constructor(driver) {
    super(driver);
  }

  clickButton(element) {
    this.explicitWait(element, true);
  }

  logoutAction() {
    this.clickButton(this._accountName);
    this.clickButton(this._close);
  }
}
