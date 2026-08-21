module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");

    return {
        pathPrefix: "/portfolio/",
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
