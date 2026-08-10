---
layout: none
---

/* Preserve Lunr's default English search pipeline. */


(() => {
    "use strict";

    window.configure_lunr_search_index = function configure_lunr_search_index() {
        // Lunr provides the English trimmer and stemmer by default.
    };
})();
