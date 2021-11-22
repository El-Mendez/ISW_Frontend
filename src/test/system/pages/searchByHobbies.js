/* eslint-disable no-underscore-dangle */
/* eslint-disable-next-line no-useless-constructor */
import { By, until } from 'selenium-webdriver';
import Elements from './elements';

export default class CancelRequest extends Elements {
  _search = By.id('search');

  _hobbies = By.id('hobbies');

  _select = By.id('searchSelect');

  _option = By.xpath("//div[text()='Videojuegos']")

  _btn = By.id('searchButton');

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

  selectClick(element, option) {
    this.explicitWait(element, true, undefined, undefined, true, option);
  }

  async searchAction() {
    this.clickButton(this._search);
    this.clickButton(this._hobbies);
    this.selectClick(this._select, this._option);
    await this.driver.wait(until.elementLocated(this._option));
    this.clickButton(this._btn);
  }
}
