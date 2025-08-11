import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Check Playwright logo Playwright',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Check CheckDocs',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'Check API',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Check Node.js',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Check Community',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'Check GitHub repository',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Check Discord server',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Check Switch between dark and light',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Check Search (Ctrl+K)',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Title',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get Started button',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
];

test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    //await page.goto('https://playwright.dev/');
  });

  test('Check header elements visibility', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsVisibility();
  });

  test('Check header elements text', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsText();
  });

  test('Check href attribute', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.checkElementsHrefAttr();
  });

  test('Check light-dark mode', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.clickSwitchLightModeButton();
    await mainPage.checkDataThemeAttr();
  });

  test('Check light mode', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.setLightMode();
    await mainPage.checkLayoutLightMode();
  });

  test('Check dark mode', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.setDarkMode();
    await mainPage.checkLayoutDarkMode();
  });
});
