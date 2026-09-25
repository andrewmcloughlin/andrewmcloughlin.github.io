const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// ---------------------------------------------------------------------------
// 1. Data contract: verify cv.js exports every key that templates expect.
//    A silent loop over `undefined` renders nothing and no error is thrown.
// ---------------------------------------------------------------------------

describe('cv.js data contract', () => {
    const cv = require('../src/_data/cv.js');

    const requiredArrayKeys = [
        'employmentHistory', // me.njk: {% asyncEach job in cv.employmentHistory %}
        'qualifications',    // me.njk: {% asyncEach qual in cv.qualifications %}
        'certificates',      // me.njk: {% for cert in cv.certificates %}
        'publications',      // me.njk: {% for pub in cv.publications %}
        'products',          // index.njk: {% for product in cv.products %}
    ];

    for (const key of requiredArrayKeys) {
        it(`exports a non-empty array for "${key}"`, () => {
            assert.ok(Object.prototype.hasOwnProperty.call(cv, key),
                `cv.js is missing the "${key}" key (templates will silently render nothing)`);
            assert.ok(Array.isArray(cv[key]),
                `cv.${key} must be an Array`);
            assert.ok(cv[key].length > 0,
                `cv.${key} is empty — templates will render nothing`);
        });
    }

    it('employmentHistory items each have role, company, duration', () => {
        for (const [i, job] of cv.employmentHistory.entries()) {
            assert.ok(job.role, `employmentHistory[${i}] missing "role"`);
            assert.ok(job.company, `employmentHistory[${i}] missing "company"`);
            assert.ok(job.duration, `employmentHistory[${i}] missing "duration"`);
        }
    });

    it('qualifications items each have degree, institution, year', () => {
        for (const [i, qual] of cv.qualifications.entries()) {
            assert.ok(qual.degree, `qualifications[${i}] missing "degree"`);
            assert.ok(qual.institution, `qualifications[${i}] missing "institution"`);
            assert.ok(qual.year, `qualifications[${i}] missing "year"`);
        }
    });

    it('products items each have name and description', () => {
        for (const [i, product] of cv.products.entries()) {
            assert.ok(product.name, `products[${i}] missing "name"`);
            assert.ok(product.description, `products[${i}] missing "description"`);
        }
    });
});

// ---------------------------------------------------------------------------
// 2. Rendered output contract: assert real content appears in built HTML.
//    This is the ground-truth check — cv.js may be fine but the template
//    could reference the wrong variable, and the build would still pass.
// ---------------------------------------------------------------------------

describe('rendered output contract', () => {
    const siteDir = path.join(__dirname, '..', '_site');

    function readHtml(relPath) {
        const full = path.join(siteDir, relPath);
        assert.ok(fs.existsSync(full), `Expected built file ${relPath} to exist`);
        return fs.readFileSync(full, 'utf8');
    }

    // Normalise HTML entities so data values with & match &amp; in output
    function normalise(str) {
        return str
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
    }

    // Derive expected content from the source data so the test stays in sync
    // with cv.js automatically rather than hardcoding strings.
    const cv = require('../src/_data/cv.js');

    it('/me has at least one job title rendered', () => {
        const html = normalise(readHtml('me/index.html'));
        const firstRole = cv.employmentHistory[0].role;
        assert.ok(html.includes(firstRole),
            `Expected "${firstRole}" to appear in /me — cv.employmentHistory may not be wired up in the template`);
    });

    it('/me has at least one qualification rendered', () => {
        const html = normalise(readHtml('me/index.html'));
        const firstDegree = cv.qualifications[0].degree;
        assert.ok(html.includes(firstDegree),
            `Expected "${firstDegree}" to appear in /me — cv.qualifications may not be wired up in the template`);
    });

    it('/me has at least one certificate rendered', () => {
        const html = normalise(readHtml('me/index.html'));
        const firstCert = cv.certificates[0].name;
        assert.ok(html.includes(firstCert),
            `Expected "${firstCert}" to appear in /me — cv.certificates may not be wired up in the template`);
    });

    it('/ (index) has at least one product rendered', () => {
        const html = normalise(readHtml('index.html'));
        const firstProduct = cv.products[0].name;
        assert.ok(html.includes(firstProduct),
            `Expected "${firstProduct}" to appear in / — cv.products may not be wired up in the template`);
    });
});
