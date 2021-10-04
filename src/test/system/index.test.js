/* eslint-disable no-undef */
import { By, Builder, until } from 'selenium-webdriver';
import { cleanup } from '@testing-library/react';

const url = 'http://localhost:8080/';
const driver = new Builder().forBrowser('firefox').build();

describe('testing', () => {
  jest.setTimeout(100000000000);

  beforeAll(() => {
    // Access to the website
    driver.get(url);
  });

  // it('Redirect to Sign Up page', async () => {
  //   driver.navigate().to('http://meetinguvg.me/signUp');
  //   await driver.findElement(By.name('carne')).sendKeys('19707');
  //   await driver.findElement(By.name('correo')).sendKeys('191025');
  //   await driver.findElement(By.name('nombre')).sendKeys('191025');
  //   await driver.findElement(By.name('apellido')).sendKeys('191025');
  //   await driver.findElement(By.name('carreraId')).getAttribute('value');
  //   await driver.findElement(By.name('password')).sendKeys('123456789');
  // });

  it('Log in', async () => {
    await driver.findElement(By.id('logInRequest')).click();
    await driver.findElement(By.name('carne')).sendKeys('191025');
    await driver.findElement(By.name('password')).sendKeys('123456789');
    await driver.findElement(By.id('logIn')).click();
    jest.setTimeout(100);
    const element = await driver.findElement(By.id('dash-container')).isDisplayed();
    expect(element).toBeTruthy();
  });

  it('Look up for courses recommendations', async () => {
    await driver.findElement(By.id('recommendations')).click();
    driver.wait(until.elementLocated(By.id('coursesRecommendations')), 100);
    await driver.findElement(By.id('coursesRecommendations')).click();
    const suggestion = await driver.findElement(By.id('suggestionResult')).isDisplayed();
    expect(suggestion).toBeTruthy();
  });

  // it('Send friendship request', async () => {
  //   await driver.findElement(By.xpath("//div[@value='Diego']")).click();
  //   driver.wait(until.elementLocated(By.id('profileContainer')));
  //   await driver.findElement(By.id('addFriend')).click();
  // });

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

  // it('Look up for hobbies recommendations', async () => {
  //   await driver.findElement(By.id('recommendations')).click();
  //   await driver.findElement(By.id('hobbiesRecommendations')).click();
  //   const suggestion = await driver.findElement(By.id('suggestionResult')).isDisplayed();
  //   expect(suggestion).toBeTruthy();
  // });

  afterEach(() => {
    cleanup();
  });
});
