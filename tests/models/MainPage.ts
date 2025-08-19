import { Page, Locator, test, expect } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
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
  }

  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }

  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      await test.step(name, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(name, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  async checkElementsHrefAttr() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(name, async () => {
          await expect(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }

  async clickSwitchLightModeButton() {
    await this.page
      .getByRole('button', { name: 'Switch between dark and light mode (currently system mode)' })
      .click();
  }

  async checkDataThemeAttr() {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
  }

  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme-choice', 'light');
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme-choice', 'dark');
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }

  async checkLayoutLightMode() {
    await expect(this.page).toHaveScreenshot(`pageWithlight.png`);
  }

  async checkLayoutDarkMode() {
    await expect(this.page).toHaveScreenshot(`pageWithdark.png`);
  }
}
