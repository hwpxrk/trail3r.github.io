/* Control post URL copy buttons and share menu. */


(() => {
    "use strict";

    const label_reset_delay = 500;

    async function copy_to_clipboard(text) {
        if (!navigator.clipboard) {
            throw new Error("Clipboard API is not supported", );
        }

        await navigator.clipboard.writeText(text, );
    }

    function get_label(button) {
        return (
            button.querySelector(".btn__label", ) ||
            button.querySelector("span", )
        );
    }

    function set_label(button, text) {
        const label = get_label(button);

        if (label) {
            label.textContent = text;
        }

        button.setAttribute("aria-label", text, );
        button.setAttribute("title", text, );
    }

    function reset_label(button) {
        set_label(button, button.dataset.copyDefaultLabel, );
        button.classList.remove("is-copied", "is-copy-failed", );
    }

    function bind_copy_button(button) {
        const label = get_label(button);

        button.dataset.copyDefaultLabel = (
            label?.textContent ||
            button.getAttribute("aria-label", ) ||
            "URL 복사"
        );

        button.addEventListener("click", async () => {
            const url = button.dataset.copyUrl || window.location.href;

            try {
                await copy_to_clipboard(url, );
                set_label(button, "URL 복사 완료!", );
                button.classList.add("is-copied", );
                button.classList.remove("is-copy-failed", );
            } catch {
                set_label(button, "복사 실패", );
                button.classList.add("is-copy-failed", );
                button.classList.remove("is-copied", );
            } finally {
                if (button.copy_reset_timer) {
                    clearTimeout(button.copy_reset_timer, );
                }

                button.copy_reset_timer = setTimeout(
                    () => reset_label(button, ),
                    label_reset_delay,
                );
            }
        }, );
    }

    function initialize_copy_buttons() {
        document
            .querySelectorAll("[data-copy-url-button]", )
            .forEach(bind_copy_button, );
    }

    function get_share_menu(button) {
        return document.getElementById(
            button.getAttribute("aria-controls", ),
        );
    }

    function close_share_menu(button, return_focus = false) {
        const share_menu = get_share_menu(button);

        if (!share_menu || share_menu.hidden) return;

        share_menu.hidden = true;
        button.setAttribute("aria-expanded", "false", );

        if (return_focus) {
            button.focus();
        }
    }

    function bind_share_menu(button) {
        const share_menu = get_share_menu(button);

        if (!share_menu) return;

        button.addEventListener("click", (event) => {
            const will_open = share_menu.hidden;

            event.stopPropagation();
            share_menu.hidden = !will_open;
            button.setAttribute("aria-expanded", String(will_open, ), );
        }, );

        share_menu.addEventListener("click", (event) => {
            event.stopPropagation();

            if (event.target.closest(".post__share-link", )) {
                close_share_menu(button, );
            }
        }, );
    }

    function initialize_share_menus() {
        const share_menu_buttons = document.querySelectorAll(
            "[data-share-menu-button]",
        );

        if (share_menu_buttons.length === 0) return;

        share_menu_buttons.forEach(bind_share_menu, );

        document.addEventListener("click", () => {
            share_menu_buttons.forEach(
                (button) => close_share_menu(button, ),
            );
        }, );

        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;

            share_menu_buttons.forEach(
                (button) => close_share_menu(button, true, ),
            );
        }, );
    }

    function initialize() {
        initialize_copy_buttons();
        initialize_share_menus();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, );
    } else {
        initialize();
    }
})();
