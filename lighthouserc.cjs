module.exports = {
  ci: {
    collect: {
      url: ["https://marcfors.com/"],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        onlyCategories: ["performance"],
        chromeFlags: "--no-sandbox --disable-dev-shm-usage --disable-gpu",
      },
    },
    assert: {
      assertions: {
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
