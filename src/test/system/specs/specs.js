/* eslint-disable no-undef */
import BaseConfig from '../base_config';

export default class Login extends BaseConfig {
  // eslint-disable-next-line no-useless-constructor
  constructor(browser) {
    super();
    this.init(browser);
  }

  async openPage(url) {
    describe('Opening a page', () => {
      beforeAll(async () => {
        await this.driver.get(url);
      }, 10000);
    });
  }
}
