/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from '@testing-library/react';
import { By, until } from 'selenium-webdriver';
import Login from '../pages/login';
import SearchHobbies from '../pages/searchByHobbies';
import SearchCourses from '../pages/searchByCourses';
import BaseConfig from '../base_config';

export default class Suggestions extends BaseConfig {
  constructor(browser, host) {
    super();
    this.init(browser);
    this.host = host;
  }

  async start() {
    describe('Send friendship request', () => {
      beforeAll(async () => {
        await this.openPage(`http://${this.host}/`);
        this.login = await new Login(this.driver);
        this.searchCourses = await new SearchCourses(this.driver);
        this.searchHobbies = await new SearchHobbies(this.driver);
      }, 100000);

      test('Log in', async () => {
        await this.login.logInAction();
        await this.driver.wait(until.elementLocated(By.id('dash-container')), 10000);
        expect(await this.driver.getCurrentUrl()).toEqual(`http://${this.host}/home`);
      }, 10000);

      test('Search users by hobbies', async () => {
        await this.searchHobbies.searchAction();
        const suggestion = await this.driver.wait(until.elementLocated(By.xpath('//div[@value=\'Orlando Cabrera\']')), 10000);
        expect(suggestion).toBeTruthy();
      }, 100000);

      test('Search users by courses', async () => {
        await this.searchCourses.searchAction();
        const suggestion = await this.driver.wait(until.elementLocated(By.xpath('//div[@value=\'Mario Gonzales\']')), 10000);
        expect(suggestion).toBeTruthy();
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
