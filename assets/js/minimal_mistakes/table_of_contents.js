/* Synchronize the table of contents with the current section. */


(() => {
    "use strict";

    const table_of_contents = document.querySelector("#table_of_contents", );
    const article_content = document.querySelector("#article_content", );
    const heading_selector = "h1, h2, h3, h4, h5, h6";

    function decode_fragment(value) {
        try {
            return decodeURIComponent(value || "", ).trim();
        } catch {
            return (value || "").trim();
        }
    }

    function get_fragment_identifier(href) {
        const fragment_index = href.indexOf("#", );

        if (fragment_index < 0) return "";

        return decode_fragment(href.slice(fragment_index + 1, ), );
    }

    if (!table_of_contents || !article_content) return;

    const toc_menu = table_of_contents.querySelector(".toc_menu", );

    if (!toc_menu) return;

    const headings = Array.from(article_content.querySelectorAll(heading_selector, ), ).filter((heading) => heading.id, );
    const links_by_identifier = new Map();

    toc_menu.querySelectorAll('a[href^="#"]', ).forEach((anchor) => {
        const identifier = get_fragment_identifier(anchor.getAttribute("href", ), );

        if (identifier) {
            links_by_identifier.set(identifier, anchor, );
        }
    }, );

    let active_link = null;
    let anchor_identifier = "";
    let anchor_scroll_position = null;
    let anchor_settlement_timer = null;
    let update_scheduled = false;

    function update_active_line() {
        if (!active_link) {
            toc_menu.classList.remove("has_active_link", );
            return;
        }

        const menu_rectangle = toc_menu.getBoundingClientRect();
        const link_rectangle = active_link.getBoundingClientRect();
        const line_top = link_rectangle.top - menu_rectangle.top;

        toc_menu.style.setProperty("--toc_active_line_top", `${line_top}px`, );
        toc_menu.style.setProperty("--toc_active_line_height", `${link_rectangle.height}px`, );
        toc_menu.classList.add("has_active_link", );
    }

    function set_active_link(identifier) {
        const next_active_link = (links_by_identifier.get(decode_fragment(identifier, ), ) || null);

        if (active_link === next_active_link) {
            update_active_line();
            return;
        }

        if (active_link) {
            active_link.classList.remove("active", );
            active_link.removeAttribute("aria-current", );
        }

        active_link = next_active_link;

        if (active_link) {
            active_link.classList.add("active", );
            active_link.setAttribute("aria-current", "location", );
        }

        update_active_line();
    }

    function get_active_heading() {
        if (headings.length === 0) return null;

        const document_element = document.documentElement;
        const reached_page_end = (window.scrollY + window.innerHeight >= document_element.scrollHeight - 2);

        if (reached_page_end) return headings.at(-1, );

        const activation_position = window.innerHeight * 0.4;
        let active_heading = headings[0];

        for (const heading of headings) {
            if (heading.getBoundingClientRect().top > activation_position) break;

            active_heading = heading;
        }

        return active_heading;
    }

    function synchronize_active_heading() {
        update_scheduled = false;

        if (anchor_identifier) return;

        const active_heading = get_active_heading();

        set_active_link(active_heading?.id || "", );
    }

    function schedule_active_heading_update() {
        if (update_scheduled) return;

        update_scheduled = true;
        window.requestAnimationFrame(synchronize_active_heading, );
    }

    function settle_anchor_navigation() {
        window.clearTimeout(anchor_settlement_timer, );
        anchor_settlement_timer = window.setTimeout(() => {
            anchor_scroll_position = window.scrollY;
        }, 150, );
    }

    function activate_anchor(identifier) {
        const decoded_identifier = decode_fragment(identifier, );

        if (!links_by_identifier.has(decoded_identifier, )) return;

        anchor_identifier = decoded_identifier;
        anchor_scroll_position = null;
        set_active_link(decoded_identifier, );
        settle_anchor_navigation();
    }

    function release_anchor_navigation() {
        anchor_identifier = "";
        anchor_scroll_position = null;
        window.clearTimeout(anchor_settlement_timer, );
        schedule_active_heading_update();
    }

    toc_menu.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;

        const anchor = event.target.closest('a[href^="#"]', );

        if (!anchor || !toc_menu.contains(anchor, )) return;

        activate_anchor(get_fragment_identifier(anchor.getAttribute("href", ), ), );
    }, );

    window.addEventListener("hashchange", () => {
        activate_anchor(window.location.hash.slice(1, ), );
    }, );

    window.addEventListener("scroll", () => {
        if (!anchor_identifier) {
            schedule_active_heading_update();
            return;
        }

        if (anchor_scroll_position === null) {
            settle_anchor_navigation();
            return;
        }

        if (Math.abs(window.scrollY - anchor_scroll_position) > 8) {
            release_anchor_navigation();
        }
    }, { passive: true }, );

    window.addEventListener("resize", schedule_active_heading_update, );

    if ("ResizeObserver" in window) {
        const toc_resize_observer = new ResizeObserver(update_active_line, );

        toc_resize_observer.observe(toc_menu, );
    }

    if (document.fonts) {
        document.fonts.ready.then(update_active_line, );
    }

    if (window.location.hash) {
        activate_anchor(window.location.hash.slice(1, ), );
    } else {
        schedule_active_heading_update();
    }
})();
