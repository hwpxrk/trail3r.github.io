/* Control legacy author profile links. */


(() => {
    "use strict";

    const author_url_wrappers = document.querySelectorAll(".author_urls_wrapper", );

    author_url_wrappers.forEach((author_url_wrapper) => {
        const toggle_button = author_url_wrapper.querySelector("button", );
        const author_urls = author_url_wrapper.querySelector(".author_urls", );

        if (!toggle_button || !author_urls) return;

        toggle_button.setAttribute("aria-expanded", "false", );

        toggle_button.addEventListener("click", () => {
            const is_open = author_urls.classList.toggle("is_visible", );

            toggle_button.classList.toggle("is_open", is_open);
            toggle_button.setAttribute("aria-expanded", String(is_open), );
        }, );
    }, );
})();
