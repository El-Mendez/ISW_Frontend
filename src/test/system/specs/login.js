/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { By, until } from 'selenium-webdriver';
import LoginActions from '../pages/login';

export default class Login {
  constructor(driver, host) {
    this.driver = driver;
    this.host = host;
  }

  async logIn() {
    beforeAll(async () => {
      this.login = await new LoginActions(this.driver);
    }, 100000);

    test('Log in', async () => {
      await this.login.logInAction();
      await this.driver.wait(until.elementLocated(By.id('dash-container')), 10000);
      expect(await this.driver.getCurrentUrl()).toEqual(`http://${this.host}/home`);
    }, 10000);
  }
}
