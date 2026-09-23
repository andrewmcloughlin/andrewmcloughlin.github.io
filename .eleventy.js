const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(src, alt, cls = "") {
    if (alt === undefined) {
        alt = "";
    }

    let imgPath = src;
    if (src.startsWith('/')) {
        imgPath = path.join('./src', src);
    } else if (!src.startsWith('./src/')) {
        imgPath = path.join('./src/images', src);
    }

    let metadata = await Image(imgPath, {
        widths: [400, 800, "auto"],
        formats: ["avif", "webp", "auto"],
        urlPath: "/images/",
        outputDir: "./_site/images/"
    });

    let imageAttributes = {
        alt,
        class: cls,
        loading: "lazy",
        decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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
