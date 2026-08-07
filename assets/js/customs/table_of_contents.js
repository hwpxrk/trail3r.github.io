/* Synchronize the table of contents with the current section. */


(() => {
    "use strict";

    const table_of_contents = document.querySelector("#table-of-contents", );
    const article_contents = document.querySelector("#table-of-content", );
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

    function get_scroll_offset() {
        const masthead = document.querySelector(".masthead", );
        const masthead_height = (
            masthead?.getBoundingClientRect().height || 0
        );

        return Math.ceil(masthead_height + 16, );
    }

    function is_same_page_anchor(anchor) {
        const href = anchor.getAttribute("href", );

        if (!href || !href.includes("#", )) return false;

        const url = new URL(anchor.href, window.location.href, );

        return (
            url.origin === window.location.origin &&
            url.pathname === window.location.pathname &&
            url.search === window.location.search
        );
    }

    function scroll_to_anchor(event, anchor) {
        const identifier = get_fragment_identifier(
            anchor.getAttribute("href", ),
        );

        event.preventDefault();

        if (!identifier) {
            window.scrollTo({ top: 0, behavior: "smooth" }, );
            history.pushState(
                null,
                "",
                window.location.pathname + window.location.search,
            );

            return;
        }

        const target = document.getElementById(identifier, );

        if (!target) return;

        const scroll_top = (
            target.getBoundingClientRect().top +
            window.pageYOffset -
            get_scroll_offset()
        );

        history.pushState(null, "", `#${encodeURIComponent(identifier, )}`, );
        window.scrollTo({ top: scroll_top, behavior: "smooth" }, );
    }

    document.addEventListener("click", (event) => {
        if (event.defaultPrevented || !(event.target instanceof Element)) return;

        const anchor = event.target.closest('a[href*="#"]', );

        if (anchor && is_same_page_anchor(anchor, )) {
            scroll_to_anchor(event, anchor, );
        }
    }, );

    if (window.location.hash) {
        window.setTimeout(() => {
            const identifier = get_fragment_identifier(window.location.hash, );
            const target = (
                identifier ? document.getElementById(identifier, ) : null
            );

            if (!target) return;

            const scroll_top = (
                target.getBoundingClientRect().top +
                window.pageYOffset -
                get_scroll_offset()
            );

            window.scrollTo({ top: scroll_top, behavior: "auto" }, );
        }, 0, );
    }

    if (!table_of_contents || !article_contents) return;

    const toc_menu = table_of_contents.querySelector(".toc__menu", );

    if (!toc_menu) return;

    const headings = Array.from(
        article_contents.querySelectorAll(heading_selector, ),
    ).filter((heading) => heading.id, );
    const links_by_identifier = new Map();

    toc_menu.querySelectorAll('a[href^="#"]', ).forEach((anchor) => {
        const identifier = get_fragment_identifier(
            anchor.getAttribute("href", ),
        );

        if (identifier) {
            links_by_identifier.set(identifier, anchor, );
        }
    }, );

    let active_link = null;

    function update_active_line() {
        if (!active_link) {
            toc_menu.classList.remove("has_active_link", );
            return;
        }

        const menu_rectangle = toc_menu.getBoundingClientRect();
        const link_rectangle = active_link.getBoundingClientRect();
        const line_top = link_rectangle.top - menu_rectangle.top;

        toc_menu.style.setProperty(
            "--toc_active_line_top",
            `${line_top}px`,
        );
        toc_menu.style.setProperty(
            "--toc_active_line_height",
            `${link_rectangle.height}px`,
        );
        toc_menu.classList.add("has_active_link", );
    }

    function set_active_link(identifier) {
        const next_active_link = (
            links_by_identifier.get(decode_fragment(identifier, ), ) || null
        );

        if (active_link === next_active_link) return;

        if (active_link) {
            active_link.classList.remove("active", );
        }

        active_link = next_active_link;

        if (active_link) {
            active_link.classList.add("active", );
        }

        update_active_line();
    }

    const heading_observer = new IntersectionObserver(
        (entries) => {
            const visible_headings = entries.filter(
                (entry) => entry.isIntersecting,
            );

            if (visible_headings.length === 0) return;

            visible_headings.sort(
                (upper, lower) => (
                    upper.boundingClientRect.top -
                    lower.boundingClientRect.top
                ),
            );
            set_active_link(visible_headings[0].target.id, );
        },
        {
            threshold: 0,
            rootMargin: "-40% 0px -50% 0px",
        },
    );

    headings.forEach((heading) => heading_observer.observe(heading, ), );

    if ("ResizeObserver" in window) {
        const toc_resize_observer = new ResizeObserver(update_active_line, );

        toc_resize_observer.observe(toc_menu, );
    } else {
        window.addEventListener("resize", update_active_line, );
    }

    if (document.fonts) {
        document.fonts.ready.then(update_active_line, );
    }
})();
