/*
상단 네비게이션 메뉴바의 플라이 아웃 메뉴와 모바일 사이드바를 제어합니다.

참고사항(Notes)
-------------
데스크톱 환경의 플라이 아웃 메뉴와 모바일 환경의 사이드바를 제어합니다.

연관(Related)
------------
"_includes/customs/masthead.html": 상단 네비게이션 메뉴바의 HTML 마크업 구조를 정의합니다.
"_sass/customs/_masthead.scss": 상단 네비게이션 메뉴바의 레이아웃과 디자인을 정의합니다.
*/


(() => {
    "use strict";

    const masthead = document.querySelector(".masthead", );

    if (!masthead) return;  // 상단 네비게이션 메뉴바가 없으면 불필요한 초기화를 생략합니다.

    function initialize_desktop_flyout() {
        const flyout_container = masthead.querySelector(".js_masthead_flyout_container", );
        const flyout_triggers = masthead.querySelectorAll(".js_masthead_flyout_trigger", );
        const flyout_dismissers = masthead.querySelectorAll(
            ".masthead_site_logo, .masthead_site_title, .masthead_menu_link",
        );
        const search_button = masthead.querySelector(".js_masthead_search_bar", );
        const mobile_media_query = window.matchMedia("(max-width: 768px)", );

        if (!flyout_container || flyout_triggers.length === 0) return;

        let active_flyout_trigger = flyout_triggers[0];
        let is_restoring_flyout_focus = false;

        function set_flyout_state(is_open) {
            masthead.classList.toggle("is_flyout_open", is_open);
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

        // 플라이 아웃 메뉴 내부에 키보드 포커스가 있으면 포인터가 벗어나도 열린 상태를 유지합니다.
        function close_flyout_from_pointer() {
            if (!flyout_container.contains(document.activeElement)) {
                close_flyout();
            }
        }

        function close_flyout_and_restore_focus() {
            if (!masthead.classList.contains("is_flyout_open")) return;

            close_flyout();
            is_restoring_flyout_focus = true;
            active_flyout_trigger.focus();
            is_restoring_flyout_focus = false;
        }

        flyout_triggers.forEach((flyout_trigger) => {
            flyout_trigger.addEventListener("mouseenter", () => {
                open_flyout(flyout_trigger);
            }, );
            flyout_trigger.addEventListener("focus", () => {
                if (!is_restoring_flyout_focus) open_flyout(flyout_trigger);
            }, );
            flyout_trigger.addEventListener("click", () => {
                open_flyout(flyout_trigger);
            }, );
        }, );

        masthead.addEventListener("mouseleave", close_flyout_from_pointer, );
        masthead.addEventListener("focusout", (event) => {
            if (!masthead.contains(event.relatedTarget)) close_flyout();
        }, );

        flyout_dismissers.forEach((flyout_dismisser) => {
            flyout_dismisser.addEventListener("mouseenter", close_flyout_from_pointer, );
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

        mobile_media_query.addEventListener("change", () => {
            close_flyout();
        }, );

        set_flyout_state(false);
    }

    function initialize_search() {
        const search_buttons = masthead.querySelectorAll(
            ".js_masthead_search_bar, .js_mobile_masthead_search_button",
        );
        const initial_content = document.querySelector(".initial-content", );
        const search_content = document.querySelector(".search-content", );
        const search_input = search_content?.querySelector("input", );

        if (search_buttons.length === 0) return;
        if (!initial_content || !search_content) return;

        function toggle_search() {
            const is_opening = !search_content.classList.contains("is--visible");

            search_content.classList.toggle("is--visible", is_opening);
            initial_content.classList.toggle("is--hidden", is_opening);

            if (is_opening && search_input) {
                window.setTimeout(() => {
                    search_input.focus();
                }, 400, );
            }
        }

        search_buttons.forEach((search_button) => {
            search_button.addEventListener("click", toggle_search, );
        }, );
    }

    function initialize_mobile_sidebar() {
        const sidebar_trigger = masthead.querySelector(".js_mobile_masthead_sidebar_trigger", );
        const sidebar_container = masthead.querySelector(".js_mobile_masthead_sidebar_container", );
        const sidebar_filter = masthead.querySelector(".js_mobile_masthead_filter", );

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
            sidebar_trigger.setAttribute("aria-label", is_open ? "전체 메뉴 접기" : "전체 메뉴 펼치기");
            sidebar_container.inert = !is_open;
            document.documentElement.classList.toggle("is_mobile_masthead_open", is_open);

            if (!is_open && should_restore_focus) sidebar_trigger.focus();
        }

        sidebar_trigger.addEventListener("click", () => {
            const is_opening = !sidebar_container.classList.contains("is_open");

            set_sidebar_state(is_opening);
        }, );

        sidebar_filter.addEventListener("click", () => {
            set_sidebar_state(false, true);
        }, );

        // 열린 모바일 사이드바 밖으로 키보드 포커스가 빠져나가지 않도록 순환시킵니다.
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

            const last_focusable_element = focusable_elements[focusable_elements.length - 1];

            if (event.shiftKey && document.activeElement === sidebar_trigger) {
                event.preventDefault();
                last_focusable_element.focus();
            } else if (!event.shiftKey && document.activeElement === last_focusable_element) {
                event.preventDefault();
                sidebar_trigger.focus();
            }
        }, );

        mobile_media_query.addEventListener("change", (event) => {
            if (!event.matches) set_sidebar_state(false);
        }, );

        const accordion_groups = sidebar_container.querySelectorAll(".js_mobile_masthead_accordion_group", );
        const prefers_reduced_motion = window.matchMedia("(prefers-reduced-motion: reduce)", );
        const accordion_animations = new Map();

        function set_accordion_state(accordion_group, is_open) {
            const accordion_header = accordion_group.querySelector(".mobile_masthead_accordion_header", );
            const current_animation = accordion_animations.get(accordion_group);
            const start_height = accordion_group.getBoundingClientRect().height;

            if (current_animation) current_animation.cancel();

            accordion_group.open = true;
            accordion_group.classList.toggle("is_open", is_open);

            const border_height = (accordion_group.offsetHeight - accordion_group.clientHeight);
            const end_height = is_open
                ? accordion_group.getBoundingClientRect().height
                : accordion_header.getBoundingClientRect().height + border_height;

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
                if (accordion_animations.get(accordion_group) !== accordion_animation) return;

                accordion_group.open = is_open;
                accordion_group.style.removeProperty("overflow");
                accordion_animations.delete(accordion_group);
            }, );
        }

        accordion_groups.forEach((accordion_group) => {
            const accordion_header = accordion_group.querySelector(".mobile_masthead_accordion_header", );

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

    document.addEventListener("DOMContentLoaded", () => {
        initialize_desktop_flyout();
        initialize_search();
        initialize_mobile_sidebar();
    }, );
})();
