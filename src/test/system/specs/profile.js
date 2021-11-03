/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from '@testing-library/react';
import Actions from '../pages/profile';
import BaseConfig from '../base_config';

export default class Profile extends BaseConfig {
  async viewMyProfile() {
    describe('Visit the profile of the current logged user', () => {
      beforeAll(async () => {
        this.profile = await new Actions(this.driver);
      }, 10000);

      test('Visit profile', async () => {
        await this.profile.profileAction();
        expect(await this.driver.getCurrentUrl()).toEqual('http://meetinguvg.me/home/profile');
      }, 10000);

      beforeEach(() => {
        cleanup();
      });

      afterAll(() => {
        this.close();
      });
    });
  }
}
