/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By } from 'selenium-webdriver';
import Elements from './elements';

export default class Login extends Elements {
    _recommendations = By.id('recommendations');

    _coursesRecommendations = By.id('coursesRecommendations');

    _hobbiesRecommendations = By.id('hobbiesRecommendations');

    _mutualRecommendations = By.id('mutualRecommendations');

    // eslint-disable-next-line no-useless-constructor
    constructor(driver) {
      super(driver);
    }

    clickButton(element) {
      this.explicitWait(element, true);
    }

    suggestionsAction(type = 1) {
      if (type === 1) {
        this.clickButton(this._recommendations);
        this.clickButton(this._coursesRecommendations);
      } else if (type === 2) {
        this.clickButton(this._recommendations);
        this.clickButton(this._hobbiesRecommendations);
      } else {
        this.clickButton(this._recommendations);
        this.clickButton(this._mutualRecommendations);
      }
    }
}
