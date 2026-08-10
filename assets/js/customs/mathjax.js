/* Detect TeX and load MathJax. */


(() => {
    "use strict";

    const article_content = document.querySelector("#article_content");
    const tex_patterns = [
        /\$\$[\s\S]+?\$\$/,
        /\$(?!\$)(?!\s)[^$\r\n]*?\S\$(?!\$)/,
        /\\\([\s\S]+?\\\)/,
        /\\\[[\s\S]+?\\\]/,
        /\\begin\{([a-zA-Z*]+)\}[\s\S]+?\\end\{\1\}/,
    ];

    if (
        !article_content ||
        !tex_patterns.some((tex_pattern) =>
            tex_pattern.test(article_content.textContent),
        )
    ) {
        return;
    }

    const mathjax_script = document.createElement("script");

    function reveal_mathjax_content() {
        document.documentElement.classList.remove("mathjax_loading");
    }

    document.documentElement.classList.add("mathjax_loading");

    const mathjax_loading_timeout = window.setTimeout(
        reveal_mathjax_content,
        5000,
    );

    if (!window.MathJax) {
        window.MathJax = {
            options: {
                a11y: {
                    braille: false,
                    speech: false,
                },
                enableExplorer: false,
                enableExplorerHelp: false,
                enableMenu: false,
                menuOptions: {
                    settings: {
                        braille: false,
                        speech: false,
                    },
                },
            },
            startup: {
                pageReady: () => {
                    return window.MathJax.startup.defaultPageReady().finally(() => {
                        window.clearTimeout(mathjax_loading_timeout);
                        reveal_mathjax_content();
                    });
                },
            },
            tex: {
                inlineMath: {
                    "[+]": [
                        ["$", "$"],
                    ],
                },
            },
        };
    }

    mathjax_script.src = "https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js";
    mathjax_script.async = true;
    mathjax_script.addEventListener("error", () => {
        window.clearTimeout(mathjax_loading_timeout);
        reveal_mathjax_content();
    });
    document.head.append(mathjax_script);
})();
