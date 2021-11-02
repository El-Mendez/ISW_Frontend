/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class Login extends Elements {
    _recommendations = By.id('recommendations');

    _coursesRecommendations = By.id('coursesRecommendations');

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
      this.clickButton(this._recommendations);
      this.clickButton(this._coursesRecommendations);
    }
}
