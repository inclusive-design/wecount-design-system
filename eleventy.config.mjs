import prettify  from "html-prettify";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import browserslist from "browserslist";
import { bundle, browserslistToTargets } from "lightningcss";
import path from "node:path";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compile: async function (inputContent, inputPath) {
            let parsed = path.parse(inputPath);
            if (inputPath.startsWith("./src/static/design-system") || parsed.name.startsWith("_")) {
                return;
            }

            let targets = browserslistToTargets(browserslist(">= 2%"));

            return async () => {
                let { code } = await bundle({
                    drafts: {
                        nesting: true
                    },
                    filename: inputPath,
                    minify: true,
                    sourceMap: false,
                    targets
                });
                return code;
            };
        }
    });

    eleventyConfig.addPassthroughCopy("./src/static/design-system");
    eleventyConfig.addPassthroughCopy("./src/static/fonts");
    eleventyConfig.addPassthroughCopy("./src/static/svg");

    eleventyConfig.addPairedShortcode("prettify", (content) => {
        return prettify(content);
    });

    eleventyConfig.addFilter("console", function (value) {
        return JSON.stringify(value, null, 2);
    });

    eleventyConfig.addPairedShortcode("brace", function (content, type = "curly") {
        const [opening, closing] = {
            curly: ["{{", "}}"],
            silent: ["{%-", "-%}"]
        }[type];
        return `${opening}${content}${closing}`;
    });

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        templateFormats: [
            "html",
            "md",
            "njk"
        ],
        passthroughFileCopy: true
    };
};
