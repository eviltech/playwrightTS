import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

//let mainPage: MainPage;

test.describe('Main page tests', () => {
  // test.beforeEach(async ({ page }) => {
  //   mainPage = new MainPage(page);
  //   await mainPage.openMainPage();
  // });

  test('Check header elements visibility', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  test('Check header elements text', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Check href attribute', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttr();
  });

  test('Check light-dark mode', async ({ mainPage }) => {
    await mainPage.clickSwitchLightModeButton();
    await mainPage.checkDataThemeAttr();
  });

  test('Check light mode', async ({ mainPage }) => {
    await mainPage.setLightMode();
    await mainPage.checkLayoutLightMode();
  });

  test('Check dark mode', async ({ mainPage }) => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutDarkMode();
  });
});
