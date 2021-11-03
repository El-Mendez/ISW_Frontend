/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class FriendsProfile extends Elements {
    _friends = By.id('friends');

    _friend = By.xpath(`//div[@value=${this.name}]`);

    // eslint-disable-next-line no-useless-constructor
    constructor(driver, name = 'Maria') {
      super(driver);
      this.name = name;
    }

    clickButton(element) {
      this.explicitWait(element, true);
    }

    logInAction() {
      this.clickButton(this._friends);
      this.clickButton(this._friend);
    }
}
