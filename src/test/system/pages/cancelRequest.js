/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class CancelRequest extends Elements {
    _possibleFriend = By.id('Maria Gonzales');

    // eslint-disable-next-line no-useless-constructor
    constructor(driver) {
      super(driver);
    }

    clickButton(element) {
      this.explicitWait(element, true);
    }

    cancelAction() {
      this.clickButton(this._possibleFriend);
    }
}
