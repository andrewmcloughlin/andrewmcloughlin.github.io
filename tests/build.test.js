const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('Build succeeded and generated standard files', () => {
    const siteDir = path.join(__dirname, '..', '_site');

    assert.strictEqual(fs.existsSync(siteDir), true, '_site output directory should exist');

    const criticalFiles = [
        'index.html',
    ];

    for (const file of criticalFiles) {
        assert.strictEqual(
            fs.existsSync(path.join(siteDir, file)),
            true,
            `Expected critical output file ${file} in _site folder`
        );
    }
});
