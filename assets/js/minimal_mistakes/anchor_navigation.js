/* Control same-page anchor navigation. */


(() => {
    "use strict";

    const history_state_key = "anchor_navigation";
    const anchor_navigation_keys = new Set([
        "ArrowDown",
        "ArrowUp",
        "End",
        "Home",
        "PageDown",
        "PageUp",
        " ",
    ], );
    let anchor_scroll_end_handler = null;
    let anchor_correction_timer = null;
    let location_scroll_frame = null;

    function decode_fragment(value) {
        try {
            return decodeURIComponent(value || "", ).trim();
        } catch {
            return (value || "").trim();
        }
    }

    function get_fragment_identifier(url) {
        return decode_fragment(url.hash.slice(1, ), );
    }

    function get_scroll_offset() {
        const masthead = document.querySelector(".masthead", );
        const masthead_height = masthead?.getBoundingClientRect().height || 0;

        return Math.ceil(masthead_height + 16, );
    }

    function get_scroll_top(identifier) {
        if (!identifier) return 0;

        const target = document.getElementById(identifier, );

        if (!target) return null;

        return Math.max(
            0,
            target.getBoundingClientRect().top + window.scrollY - get_scroll_offset(),
        );
    }

    function scroll_to_identifier(identifier, behavior) {
        const scroll_top = get_scroll_top(identifier);

        if (scroll_top === null) return false;

        window.scrollTo({ top: scroll_top, behavior });

        return true;
    }

    function cancel_anchor_correction() {
        window.clearTimeout(anchor_correction_timer, );
        anchor_correction_timer = null;

        if (anchor_scroll_end_handler) {
            window.removeEventListener("scrollend", anchor_scroll_end_handler, );
            anchor_scroll_end_handler = null;
        }
    }

    function schedule_anchor_correction(identifier) {
        cancel_anchor_correction();

        const correct_anchor_position = () => {
            cancel_anchor_correction();
            window.requestAnimationFrame(() => {
                scroll_to_identifier(identifier, "auto", );
            }, );
        };

        anchor_correction_timer = window.setTimeout(correct_anchor_position, 1000, );

        if ("onscrollend" in window) {
            anchor_scroll_end_handler = correct_anchor_position;
            window.addEventListener("scrollend", anchor_scroll_end_handler, { once: true }, );
        }
    }

    function cancel_anchor_correction_with_keyboard(event) {
        if (anchor_navigation_keys.has(event.key, )) {
            cancel_anchor_correction();
        }
    }

    function focus_skip_target(anchor, identifier) {
        if (!anchor.classList.contains("screen_reader_shortcut", )) return;

        const target = document.getElementById(identifier, );

        if (!target) return;

        const had_tabindex = target.hasAttribute("tabindex", );

        if (!had_tabindex) target.setAttribute("tabindex", "-1", );

        target.focus({ preventScroll: true });

        if (!had_tabindex) {
            target.addEventListener("blur", () => target.removeAttribute("tabindex", ), { once: true }, );
        }
    }

    function create_history_state(anchor_state) {
        const current_state = history.state;
        const next_state = (current_state && typeof current_state === "object" ? { ...current_state } : {});

        next_state[history_state_key] = anchor_state;

        return next_state;
    }

    function store_current_scroll_position() {
        const current_anchor_state = history.state?.[history_state_key];

        if (current_anchor_state) return;

        history.replaceState(create_history_state({ scroll_top: window.scrollY }), "", window.location.href, );
    }

    function push_anchor_history(identifier) {
        const next_url = new URL(window.location.href);

        store_current_scroll_position();
        next_url.hash = identifier;

        history.pushState(create_history_state({ identifier }), "", `${next_url.pathname}${next_url.search}${next_url.hash}`, );
    }

    function is_same_page_anchor(anchor) {
        const href = anchor.getAttribute("href", );

        if (!href || !href.includes("#", )) return false;
        if (anchor.closest("[data-scroll-ignore]", )) return false;
        if (anchor.hasAttribute("download", )) return false;
        if (anchor.target && anchor.target !== "_self") return false;

        const url = new URL(anchor.href, window.location.href, );

        return (
            url.origin === window.location.origin &&
            url.pathname === window.location.pathname &&
            url.search === window.location.search
        );
    }

    function handle_anchor_click(event) {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            !(event.target instanceof Element)
        ) {
            return;
        }

        const anchor = event.target.closest('a[href*="#"]', );

        if (!anchor || !is_same_page_anchor(anchor, )) return;

        const url = new URL(anchor.href, window.location.href, );
        const identifier = get_fragment_identifier(url);

        if (get_scroll_top(identifier) === null) return;

        event.preventDefault();
        push_anchor_history(identifier);
        scroll_to_identifier(identifier, "smooth");
        schedule_anchor_correction(identifier, );
        focus_skip_target(anchor, identifier);
    }

    function restore_current_history_state() {
        const anchor_state = history.state?.[history_state_key];

        if (Number.isFinite(anchor_state?.scroll_top)) {
            window.scrollTo({ top: anchor_state.scroll_top, behavior: "auto" });
            return;
        }

        const identifier = (
            typeof anchor_state?.identifier === "string"
                ? anchor_state.identifier
                : get_fragment_identifier(new URL(window.location.href), )
        );

        scroll_to_identifier(identifier, "auto");
    }

    function schedule_location_scroll() {
        cancel_anchor_correction();

        if (location_scroll_frame !== null) return;

        location_scroll_frame = window.requestAnimationFrame(() => {
            location_scroll_frame = null;
            restore_current_history_state();
        });
    }

    document.addEventListener("click", handle_anchor_click, );
    window.addEventListener("keydown", cancel_anchor_correction_with_keyboard, );
    window.addEventListener("touchstart", cancel_anchor_correction, { passive: true }, );
    window.addEventListener("wheel", cancel_anchor_correction, { passive: true }, );
    window.addEventListener("hashchange", schedule_location_scroll, );
    window.addEventListener("popstate", schedule_location_scroll, );

    if (window.location.hash) {
        window.setTimeout(schedule_location_scroll, 0, );
    }
})();
