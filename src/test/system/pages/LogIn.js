/* eslint-disable no-underscore-dangle */
import { By, until } from 'selenium-webdriver';
import Elements from './elements';

export default class LogIn extends Elements {
  // eslint-disable-next-line no-useless-constructor
    // TODO revisar cómo hacer los fields private
    _passwordInput = By.name('password');

    _carneInput = By.name('carne');

    _logInBtn = By.id('logIn')

    _logInRequest = By.id('logInRequest')

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

    logInAction() {
      this.clickButton(this._logInRequest);
      this.writeText(this._carneInput, '191025');
      this.writeText(this._passwordInput, '123456789');
      this.clickButton(this._logInBtn);
    }
}
