module.exports = {
  ci: {
    collect: {
      url: ["http://127.0.0.1:3000/"],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        onlyCategories: ["performance"],
        chromeFlags:
          "--no-sandbox --disable-dev-shm-usage --disable-gpu --disable-features=HttpsFirstBalancedModeAutoEnable,HttpsFirstBalancedMode,HttpsUpgrades",
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
