module.exports = {
    ci: {
        collect: {
            staticDistDir: './_site',
            numberOfRuns: 1,
            settings: {
                chromeFlags: '--no-sandbox --disable-dev-shm-usage'
            }
        },
        assert: {
            assertions: {
                'categories:performance': ['warn', { minScore: 0.9 }],
                'categories:accessibility': ['warn', { minScore: 0.9 }],
                'categories:best-practices': ['warn', { minScore: 0.9 }],
                'categories:seo': ['warn', { minScore: 0.9 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
