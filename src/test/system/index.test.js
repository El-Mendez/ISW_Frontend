/* eslint-disable no-undef */
import { By, Builder, until } from 'selenium-webdriver';
import { cleanup } from '@testing-library/react';

const url = 'http://localhost:8080/';
const driver = new Builder().forBrowser('firefox').build();

describe('testing', () => {
  jest.setTimeout(1000000000);

  beforeAll(() => {
    // Access to the website
    driver.get(url);
  });

  it('Log in', async () => {
    await driver.findElement(By.id('logInRequest')).click();
    await driver.findElement(By.name('carne')).sendKeys('191025');
    await driver.findElement(By.name('password')).sendKeys('123456789');
    await driver.findElement(By.id('logIn')).click();
    jest.setTimeout(100);
    driver.wait(until.elementLocated(By.id('dash-container')), 100).sendKeys('test');
    const element = await driver.findElement(By.id('dash-container')).isDisplayed();
    expect(element).toBeTruthy();
  });

  it('Look up for courses recommendations', async () => {
    jest.setTimeout(200);
    await driver.findElement(By.id('recommendations')).click();
    driver.wait(until.elementLocated(By.id('coursesRecommendations')), 100);
    await driver.findElement(By.id('coursesRecommendations')).click();
    const suggestion = await driver.findElement(By.id('suggestionResult')).isDisplayed();
    expect(suggestion).toBeTruthy();
  });

  it('Send friendship request', async () => {
    jest.setTimeout(100);
    await driver.findElement(By.xpath("//div[@value='Maria']")).click();
    driver.wait(until.elementLocated(By.id('profileContainer')));
    await driver.findElement(By.id('addFriend')).click();
    jest.setTimeout(100);
    await driver.findElement(By.id('mailBox')).click();
    await driver.findElement(By.id('sentRequest')).click();
    const sent = await driver.findElement(By.xpath("//div[@value='19822']"));
    expect(sent).toBeTruthy();
  });

  it('Check the actual friends', async () => {
    jest.setTimeout(100);
    await driver.findElement(By.id('friends')).click();
    const element = await driver.findElement(By.id('suggestionResult')).isDisplayed();
    expect(element).toBeTruthy();
  });

  it('Select a friend to see its profile', async () => {
    jest.setTimeout(100);
    await driver.findElement(By.xpath("//div[@value='Orlando Cabrera']")).click();
    driver.wait(until.elementLocated(By.id('profileContainer')));
    const element = await driver.findElement(By.id('profileContainer')).isDisplayed();
    expect(element).toBeTruthy();
  });

  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    driver.quit();
  });
});
