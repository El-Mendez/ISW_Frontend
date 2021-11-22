/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class SendRequest extends Elements {
  _friendProfile = By.xpath('//div[@value=\'Mario Gonzales\']');

  // eslint-disable-next-line no-useless-constructor
  constructor(driver) {
    super(driver);
  }

  clickButton(element) {
    this.explicitWait(element, true);
  }

  visitProfileAction() {
    this.clickButton(this._friendProfile);
  }
}
