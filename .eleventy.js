const isProduction = process.env.ELEVENTY_ENV === "production";

module.exports = function (eleventyConfig) {
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

    return {
        pathPrefix: "/",
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
