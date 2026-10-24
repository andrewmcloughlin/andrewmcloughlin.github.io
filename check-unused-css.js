const { PurgeCSS } = require('purgecss');
(async () => {
  const results = await new PurgeCSS().purge({
    content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.tsx', './src/**/*.vue'],
    css: ['./src/**/*.css'],
    printRejected: true,
  });
  const hasUnused = results.some(res => res.rejected && res.rejected.length > 0);
  if (hasUnused) {
    console.error('❌ Commit blocked: Unused or orphaned CSS selectors were found.');
    process.exit(1);
  }
  console.log('✅ CSS check passed: No orphaned classes detected.');
  process.exit(0);
})();
