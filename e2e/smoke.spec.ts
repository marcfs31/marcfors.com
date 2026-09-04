import { expect, test } from "@playwright/test";

test("home renders the desk in English", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Marc Fors/);
  await expect(page.getByRole("heading", { level: 1, name: "Marc Fors" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("language switch changes the URL and the lang attribute", async ({ page }) => {
  await page.goto("/");
  // Desktop header shows the locale links; the <select> is a mobile-only fallback.
  await page.getByRole("link", { name: "Español" }).click();
  await expect(page).toHaveURL(/\/es$/);
  expect(await page.locator("html").getAttribute("lang")).toBe("es");
});

test("a theme pick sticks across a reload", async ({ page }) => {
  await page.goto("/");
  await page.locator(".theme-dot-blue").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "blue");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "blue");
});

test("keyboard moves between folds", async ({ page }) => {
  await page.goto("/");
  await page.locator("body").press("j");
  await expect(page.locator('[data-fold="work"] .fold-head')).toHaveAttribute("aria-expanded", "true");
});

test("print route renders the CV", async ({ page }) => {
  await page.goto("/print");
  await expect(page.getByRole("heading", { level: 1, name: "Marc Fors" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Stack" })).toBeVisible();
  await expect(page.getByText(/T-Systems/)).toBeVisible();
});

test("Wordkeep case study embeds the atlas and links out to the live project", async ({ page }) => {
  await page.goto("/work/wordkeep");
  await expect(page.getByRole("heading", { level: 1, name: "Wordkeep" })).toBeVisible();
  await expect(page.locator(".atlas-canvas")).toBeVisible();
  await expect(page.getByText("56 words · 90 links · 4 languages")).toBeVisible();
  const openAtlas = page.getByRole("link", { name: "Open the 3D atlas" });
  const visit = page.getByRole("link", { name: "Visit Wordkeep" });
  await expect(openAtlas).toHaveAttribute("href", "https://wordkeep-zeta.vercel.app/graph");
  await expect(visit).toHaveAttribute("href", "https://wordkeep-zeta.vercel.app");
});

test("health endpoint is public JSON", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.ok).toBe(true);
  expect(body.service).toBe("marcfors.com");
});

test("unknown path returns a styled 404", async ({ page }) => {
  const res = await page.goto("/nonsense-path");
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/page not found/i)).toBeVisible();
});
