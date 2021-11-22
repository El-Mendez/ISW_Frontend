/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from '@testing-library/react';
import { By, until } from 'selenium-webdriver';
import Login from '../pages/login';
import Recommendations from '../pages/suggestions';
import Friendship from '../pages/sendRequest';
import Cancel from '../pages/cancelRequest';
import Logout from '../pages/logout';
import BaseConfig from '../base_config';

export default class Suggestions extends BaseConfig {
  constructor(browser, host) {
    super();
    this.init(browser);
    this.host = host;
  }

  // start() {
  //   const test_case = new VisitProfile('firefox', this.host);
  //   test_case.start();
  // }

  async start() {
    describe('Send friendship request', () => {
      beforeAll(async () => {
        await this.openPage(`http://${this.host}/`);
        this.login = await new Login(this.driver);
        this.recommendations = await new Recommendations(this.driver);
        this.friendship = await new Friendship(this.driver);
        this.cancel = await new Cancel(this.driver);
        this.logout = await new Logout(this.driver);
      }, 100000);

      test('Log in', async () => {
        await this.login.logInAction();
        await this.driver.wait(until.elementLocated(By.id('dash-container')), 10000);
        expect(await this.driver.getCurrentUrl()).toEqual(`http://${this.host}/home`);
      }, 10000);

      test('Look up for courses recommendations', async () => {
        await this.recommendations.suggestionsAction(this.type);
        const suggestion = await this.driver.wait(until.elementLocated(By.id('suggestionResult')), 10000);
        expect(suggestion).toBeTruthy();
      }, 100000);

      test('Send the request', async () => {
        await this.friendship.sendRequestAction();
        const sent = await this.driver.wait(until.elementLocated(By.id('sentRequests')), 10000);
        expect(sent).toBeTruthy();
      }, 100000);

      test('Cancel the request', async () => {
        await this.cancel.cancelAction();
        const cancel = await this.driver.wait(until.elementLocated(By.id('Maria Gonzales')), 10000);
        expect(cancel).toBeTruthy();
      }, 100000);

      test('Log out', async () => {
        await this.logout.logoutAction();
        await this.driver.wait(until.elementLocated(By.id('home')), 10000);
        expect(await this.driver.getCurrentUrl()).toEqual(`http://${this.host}/`);
      }, 100000);

      beforeEach(() => {
        cleanup();
      });

      afterAll(() => {
        this.close();
      });
    });
  }
}
