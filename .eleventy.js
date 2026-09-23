const Image = require("@11ty/eleventy-img");
const path = require("path");
const fs = require("fs");

const IMAGE_OPTIONS = {
    widths: [400, 800, "auto"],
    formats: ["avif", "webp", "auto"],
    urlPath: "/images/",
    outputDir: "./_site/images/"
};

function resolveImagePath(src) {
    if (!src) return null;
    if (src.startsWith('/')) return path.join('./src', src);
    return path.join('./src/images', src);
}

function getImageFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    const files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...getImageFiles(fullPath));
        } else if (/\.(png|jpe?g|gif|webp)$/i.test(entry.name)) {
            files.push(fullPath);
        }
    }
    return files;
}

function imageHtmlSync(src, alt, cls, loading = 'lazy', fetchpriority = 'auto') {
    if (!src) return '';
    const imgPath = resolveImagePath(src);
    try {
        const metadata = Image.statsSync(imgPath, IMAGE_OPTIONS);

        let attrs = {
            alt: alt || '',
            class: cls || '',
            decoding: 'async',
        };
        if (loading) attrs.loading = loading;
        if (fetchpriority && fetchpriority !== 'auto') attrs.fetchpriority = fetchpriority;

        return Image.generateHTML(metadata, attrs);
    } catch (e) {
        return `<img src="${src}" alt="${alt || ''}" class="${cls || ''}">`;
    }
}

module.exports = function (eleventyConfig) {
    eleventyConfig.on('eleventy.before', async () => {
        const imageFiles = getImageFiles('./src/images');
        await Promise.allSettled(imageFiles.map(imgPath => Image(imgPath, IMAGE_OPTIONS)));
    });

    eleventyConfig.addFilter("imageHtml", imageHtmlSync);

    eleventyConfig.addCollection("stackItems", function (collectionApi) {
        const items = collectionApi.getFilteredByTag("portfolio");
        const seen = new Set();
        items.forEach(item => {
            (item.data.featured_stack || []).forEach(s => seen.add(s));
        });
        return [...seen].sort();
    });

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/files");
    eleventyConfig.addPassthroughCopy("src/fontawesome");
    eleventyConfig.addPassthroughCopy("src/_includes/sounds");

    return {
        pathPrefix: "/",
        dir: {
            input: "src",
            output: "_site"
        }
    };
};

