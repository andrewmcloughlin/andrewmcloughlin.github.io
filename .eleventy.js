const isProduction = process.env.ELEVENTY_ENV === "production";

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/images");

    return {
        pathPrefix: isProduction ? "/portfolio/" : "/",
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
