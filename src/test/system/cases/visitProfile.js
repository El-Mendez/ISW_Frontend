/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from '@testing-library/react';
import { By, until } from 'selenium-webdriver';
import Login from '../pages/login';
import Profile from '../pages/profile';
import BaseConfig from '../base_config';

export default class visitProfile extends BaseConfig {
  constructor(browser, host) {
    super();
    this.init(browser);
    this.host = host;
  }

  async start() {
    describe('Visit my profile', () => {
      beforeAll(async () => {
        await this.openPage(`http://${this.host}/`);
        this.login = await new Login(this.driver);
        this.profile = await new Profile(this.driver);
      }, 100000);

      test('Log in', async () => {
        await this.login.logInAction();
        await this.driver.wait(until.elementLocated(By.id('dash-container')), 10000);
        expect(await this.driver.getCurrentUrl()).toEqual(`http://${this.host}/home`);
      }, 10000);

      test('Visit profile', async () => {
        await this.profile.profileAction();
        await this.driver.wait(until.elementLocated(By.id('profile-img')), 10000);
        expect(await this.driver.getCurrentUrl()).toEqual(`http://${this.host}/home/profile`);
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
