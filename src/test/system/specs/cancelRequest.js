/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from '@testing-library/react';
import { By, until } from 'selenium-webdriver';
import Actions from '../pages/login';
import BaseConfig from '../base_config';

export default class Login extends BaseConfig {
  constructor(browser) {
    super();
    this.init(browser);
  }

  async start(url) {
    describe('LOG IN', () => {
      beforeAll(async () => {
        // Access to the website
        await this.driver.get(url);
        this.login = await new Actions(this.driver);
      }, 100000);

      test('Log in', async () => {
        await this.login.logInAction();
        await this.driver.wait(until.elementLocated(By.id('dash-container')), 10000);
        expect(await this.driver.getCurrentUrl()).toEqual('http://meetinguvg.me/home');
      }, 100000);

      beforeEach(() => {
        cleanup();
      }, 30000);

      afterAll(() => {
        this.close();
      });
    });
  }
}
