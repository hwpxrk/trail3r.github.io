/* Control the masthead fly-out, search, and mobile sidebar. */


(() => {
    "use strict";

    const masthead = document.querySelector(".masthead", );

    if (!masthead) return;

    let close_search = () => {};
    let close_mobile_sidebar = () => {};

    function initialize_desktop_flyout() {
        const flyout_container = masthead.querySelector(".js_masthead_flyout_container", );
        const flyout_triggers = masthead.querySelectorAll(".js_masthead_flyout_trigger", );
        const flyout_dismissers = masthead.querySelectorAll(".masthead_site_logo, .masthead_site_title, .masthead_menu_link", );
        const desktop_site_metadata = masthead.querySelector(".masthead_site_metadata", );
        const desktop_menu_items = masthead.querySelector(".masthead_menu_items", );
        const mobile_site_title = masthead.querySelector(".mobile_masthead_site_title", );
        const mobile_sidebar_trigger = masthead.querySelector(".js_mobile_masthead_sidebar_trigger", );
        const search_button = masthead.querySelector(".js_masthead_search_bar", );
        const mobile_media_query = window.matchMedia("(max-width: 768px)", );

        if (!flyout_container || flyout_triggers.length === 0) return;

        let active_flyout_trigger = flyout_triggers[0];
        let was_flyout_open_before_pointer = false;

        function set_flyout_state(is_open) {
            masthead.classList.toggle("is_open", is_open);
            flyout_container.inert = !is_open;

            flyout_triggers.forEach((flyout_trigger) => {
                flyout_trigger.setAttribute("aria-expanded", String(is_open));
            }, );
        }

        function open_flyout(flyout_trigger = active_flyout_trigger) {
            active_flyout_trigger = flyout_trigger;
            set_flyout_state(true);
        }

        function close_flyout() {
            set_flyout_state(false);
        }

        // Close only after the pointer and focus leave the fly-out.
        function close_flyout_from_pointer() {
            const active_element = document.activeElement;
            const has_flyout_focus = (
                flyout_container.contains(active_element)
                || Array.from(flyout_triggers).includes(active_element)
            );

            if (!has_flyout_focus) {
                close_flyout();
            }
        }

        function close_flyout_and_restore_focus() {
            if (!masthead.classList.contains("is_open")) return;

            close_flyout();
            active_flyout_trigger.focus();
        }

        flyout_triggers.forEach((flyout_trigger) => {
            flyout_trigger.addEventListener("pointerdown", () => {
                was_flyout_open_before_pointer = (masthead.classList.contains("is_open") && active_flyout_trigger === flyout_trigger);
            }, );
            flyout_trigger.addEventListener("pointerenter", (event) => {
                if (event.pointerType !== "touch") {
                    open_flyout(flyout_trigger);
                }
            }, );
            flyout_trigger.addEventListener("focus", () => {
                active_flyout_trigger = flyout_trigger;
            }, );
            flyout_trigger.addEventListener("click", (event) => {
                const is_open = event.detail > 0 ? was_flyout_open_before_pointer : masthead.classList.contains("is_open");

                if (is_open && active_flyout_trigger === flyout_trigger) {
                    close_flyout();
                } else {
                    open_flyout(flyout_trigger);
                }

                was_flyout_open_before_pointer = false;
            }, );
        }, );

        masthead.addEventListener("mouseleave", close_flyout_from_pointer, );
        masthead.addEventListener("focusout", (event) => {
            if (!masthead.contains(event.relatedTarget)) close_flyout();
        }, );

        flyout_dismissers.forEach((flyout_dismisser) => {
            flyout_dismisser.addEventListener(
                "mouseenter",
                close_flyout_from_pointer,
            );
            flyout_dismisser.addEventListener("focus", close_flyout, );
            flyout_dismisser.addEventListener("click", close_flyout, );
        }, );

        if (search_button) {
            search_button.addEventListener("mouseenter", close_flyout_from_pointer, );
            search_button.addEventListener("click", close_flyout, );
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") close_flyout_and_restore_focus();
        }, );

        document.addEventListener("pointerdown", (event) => {
            if (!masthead.contains(event.target)) close_flyout();
        }, );

        mobile_media_query.addEventListener("change", (event) => {
            const active_element = document.activeElement;
            const has_hidden_focus = (flyout_container.contains(active_element) || desktop_menu_items?.contains(active_element));
            const has_hidden_site_focus = (desktop_site_metadata?.contains(active_element));

            close_flyout();

            if (!event.matches) return;

            if (has_hidden_site_focus) mobile_site_title?.focus();
            else if (has_hidden_focus) mobile_sidebar_trigger?.focus();
        }, );

        set_flyout_state(false);
    }

    function initialize_search() {
        const search_buttons = masthead.querySelectorAll(".js_masthead_search_bar, .js_mobile_masthead_search_button", );
        const initial_content = document.querySelector(".initial_content", );
        const search_content = document.querySelector(".search_content", );
        const search_input = search_content?.querySelector("input", );
        const page_footer = document.querySelector(".page_footer", );
        const mobile_media_query = window.matchMedia("(max-width: 768px)", );

        if (search_buttons.length === 0 || !initial_content || !search_content) return;

        let active_search_button = null;
        let search_focus_timer = null;

        function set_search_state(is_open, should_restore_focus = false) {
            search_content.classList.toggle("is_visible", is_open);
            initial_content.classList.toggle("is_hidden", is_open);
            search_content.inert = !is_open;
            initial_content.inert = is_open;

            if (page_footer) page_footer.inert = is_open;

            search_buttons.forEach((search_button) => {
                search_button.setAttribute("aria-expanded", String(is_open), );
            }, );

            if (search_focus_timer !== null) {
                window.clearTimeout(search_focus_timer);
                search_focus_timer = null;
            }

            if (is_open && search_input) {
                search_focus_timer = window.setTimeout(() => {
                    search_focus_timer = null;

                    if (
                        !search_content.classList.contains("is_visible")
                        || search_content.inert
                    ) {
                        return;
                    }

                    search_input.focus();
                }, 400, );
            } else if (should_restore_focus && active_search_button) {
                active_search_button.focus();
            }

            if (!is_open) active_search_button = null;
        }

        function toggle_search(search_button) {
            const is_open = search_content.classList.contains("is_visible");

            active_search_button = search_button;

            if (!is_open) close_mobile_sidebar();

            set_search_state(!is_open);
        }

        close_search = (should_restore_focus = false) => {
            set_search_state(false, should_restore_focus);
        };

        search_buttons.forEach((search_button) => {
            search_button.setAttribute("aria-expanded", "false", );

            search_button.addEventListener("click", () => {
                toggle_search(search_button);
            }, );
        }, );

        document.addEventListener("keydown", (event) => {
            const is_search_open = search_content.classList.contains("is_visible");

            if (event.key === "Escape" && is_search_open) {
                set_search_state(false, true);
            }
        }, );

        mobile_media_query.addEventListener("change", () => {
            const focused_search_button = Array.from(search_buttons).find(
                (search_button) => search_button === document.activeElement,
            );

            window.requestAnimationFrame(() => {
                const visible_search_button = Array.from(search_buttons).find(
                    (search_button) => search_button.getClientRects().length > 0,
                );

                if (!visible_search_button) return;

                if (search_content.classList.contains("is_visible")) {
                    active_search_button = visible_search_button;
                }

                if (focused_search_button) visible_search_button.focus();
            });
        }, );
    }

    function initialize_mobile_sidebar() {
        const sidebar_trigger = masthead.querySelector(".js_mobile_masthead_sidebar_trigger", );
        const sidebar_container = masthead.querySelector(".js_mobile_masthead_sidebar_container", );
        const sidebar_filter = masthead.querySelector(".js_mobile_masthead_filter", );
        const initial_content = document.querySelector(".initial_content", );
        const search_content = document.querySelector(".search_content", );
        const page_footer = document.querySelector(".page_footer", );
        const desktop_site_title = masthead.querySelector(".masthead_site_title", );
        const mobile_site_logo = masthead.querySelector(".mobile_masthead_site_logo", );
        const mobile_site_title = masthead.querySelector(".mobile_masthead_site_title", );
        const mobile_search_button = masthead.querySelector(".js_mobile_masthead_search_button", );
        const mobile_site_metadata = masthead.querySelector(".mobile_masthead_site_metadata", );

        if (!sidebar_trigger || !sidebar_container || !sidebar_filter) return;

        const mobile_media_query = window.matchMedia("(max-width: 768px)", );
        const focusable_selector = [
            "a[href]",
            "button:not([disabled])",
            "summary",
            "[tabindex]:not([tabindex=\"-1\"])",
        ].join(", ");

        function set_sidebar_state(is_open, should_restore_focus = false) {
            sidebar_container.classList.toggle("is_open", is_open);
            sidebar_filter.classList.toggle("is_open", is_open);
            sidebar_trigger.setAttribute("aria-expanded", String(is_open));
            sidebar_trigger.setAttribute("aria-label", is_open ? "전체 메뉴 접기" : "전체 메뉴 펼치기", );
            sidebar_container.inert = !is_open;
            document.documentElement.classList.toggle("is_mobile_masthead_open", is_open, );

            if (initial_content) initial_content.inert = is_open;
            if (mobile_site_logo) mobile_site_logo.inert = is_open;
            if (mobile_site_title) mobile_site_title.inert = is_open;
            if (mobile_search_button) mobile_search_button.inert = is_open;
            if (search_content) search_content.inert = (is_open || !search_content.classList.contains("is_visible"));
            if (page_footer) page_footer.inert = is_open;
            if (!is_open && should_restore_focus) sidebar_trigger.focus();
        }

        sidebar_trigger.addEventListener("click", () => {
            const is_opening = !sidebar_container.classList.contains("is_open");

            if (is_opening) close_search();

            set_sidebar_state(is_opening);
        }, );

        close_mobile_sidebar = (should_restore_focus = false) => {
            if (!sidebar_container.classList.contains("is_open")) return;

            set_sidebar_state(false, should_restore_focus);
        };

        sidebar_filter.addEventListener("click", () => {
            set_sidebar_state(false, true);
        }, );

        // Keep keyboard focus inside the open mobile sidebar.
        document.addEventListener("keydown", (event) => {
            if (!sidebar_container.classList.contains("is_open")) return;

            if (event.key === "Escape") {
                set_sidebar_state(false, true);
                return;
            }

            if (event.key !== "Tab") return;

            const focusable_elements = Array.from(
                sidebar_container.querySelectorAll(focusable_selector, ),
            ).filter((element) => element.getClientRects().length > 0, );

            if (focusable_elements.length === 0) return;

            const last_focusable_element = (
                focusable_elements[focusable_elements.length - 1]
            );

            if (event.shiftKey && document.activeElement === sidebar_trigger) {
                event.preventDefault();
                last_focusable_element.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === last_focusable_element
            ) {
                event.preventDefault();
                sidebar_trigger.focus();
            }
        }, );

        mobile_media_query.addEventListener("change", (event) => {
            if (event.matches) return;

            const active_element = document.activeElement;
            const has_hidden_focus = (sidebar_container.contains(active_element) || sidebar_trigger === active_element || mobile_site_metadata?.contains(active_element));

            set_sidebar_state(false);

            if (has_hidden_focus) desktop_site_title?.focus();
        }, );

        const accordion_groups = sidebar_container.querySelectorAll(".js_mobile_masthead_accordion_group", );
        const prefers_reduced_motion = window.matchMedia("(prefers-reduced-motion: reduce)", );
        const accordion_animations = new Map();

        function set_accordion_state(accordion_group, is_open) {
            const accordion_header = accordion_group.querySelector(".mobile_masthead_accordion_header", );

            if (!accordion_header) return;

            const current_animation = accordion_animations.get(accordion_group);
            const start_height = accordion_group.getBoundingClientRect().height;

            if (current_animation) current_animation.cancel();

            accordion_group.open = true;
            accordion_group.classList.toggle("is_open", is_open);

            const border_height = (accordion_group.offsetHeight - accordion_group.clientHeight);
            const end_height = is_open ? accordion_group.getBoundingClientRect().height : accordion_header.getBoundingClientRect().height + border_height;

            if (prefers_reduced_motion.matches) {
                accordion_group.open = is_open;
                accordion_group.style.removeProperty("overflow");
                accordion_animations.delete(accordion_group);
                return;
            }

            accordion_group.style.overflow = "hidden";

            const accordion_animation = accordion_group.animate(
                {
                    height: [`${start_height}px`, `${end_height}px`],
                },
                {
                    duration: 250,
                    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                },
            );

            accordion_animations.set(accordion_group, accordion_animation);

            accordion_animation.addEventListener("finish", () => {
                if (
                    accordion_animations.get(accordion_group) !==
                    accordion_animation
                ) {
                    return;
                }

                accordion_group.open = is_open;
                accordion_group.style.removeProperty("overflow");
                accordion_animations.delete(accordion_group);
            }, );
        }

        accordion_groups.forEach((accordion_group) => {
            const accordion_header = accordion_group.querySelector(
                ".mobile_masthead_accordion_header",
            );

            if (!accordion_header) return;

            accordion_group.classList.toggle("is_open", accordion_group.open);

            accordion_header.addEventListener("click", (event) => {
                event.preventDefault();

                const is_opening = !accordion_group.classList.contains("is_open");

                if (is_opening) {
                    accordion_groups.forEach((other_accordion_group) => {
                        if (
                            other_accordion_group !== accordion_group
                            && other_accordion_group.classList.contains("is_open")
                        ) {
                            set_accordion_state(other_accordion_group, false);
                        }
                    }, );
                }

                set_accordion_state(accordion_group, is_opening);
            }, );
        }, );
    }

    function initialize_masthead() {
        initialize_desktop_flyout();
        initialize_search();
        initialize_mobile_sidebar();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize_masthead, { once: true }, );
    } else {
        initialize_masthead();
    }
})();
