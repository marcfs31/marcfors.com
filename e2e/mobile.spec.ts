import { expect, test } from "@playwright/test";

// Runs only on the `mobile` project (Pixel 7 viewport), which triggers the
// compact header where the language <select> replaces the locale link row.

test("compact header: the language select switches locale", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Marc Fors" })).toBeVisible();

  const select = page.getByRole("combobox");
  await expect(select).toBeVisible();
  await select.selectOption("de");

  await expect(page).toHaveURL(/\/de$/);
  expect(await page.locator("html").getAttribute("lang")).toBe("de");
});

test("folds are reachable by tapping their headers on a phone", async ({ page }) => {
  await page.goto("/");
  const projects = page.locator('[data-fold="projects"] .fold-head');
  await projects.click();
  await expect(projects).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('[data-fold="intro"] .fold-head')).toHaveAttribute("aria-expanded", "false");
});
