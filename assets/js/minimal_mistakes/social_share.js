/* Control post sharing. */


(() => {
    "use strict";

    const label_reset_delay = 500;

    async function copy_to_clipboard(text) {
        if (!navigator.clipboard?.writeText) {
            throw new Error("Clipboard API is not supported", );
        }

        await navigator.clipboard.writeText(text, );
    }

    function set_copy_button_label(button, text) {
        button.setAttribute("aria-label", text, );
        button.setAttribute("title", text, );
    }

    function reset_copy_button_label(button) {
        set_copy_button_label(button, button.dataset.copyDefaultLabel, );
        button.classList.remove("is_copied", );
        button.copy_reset_timer = null;
    }

    function bind_copy_button(button) {
        button.dataset.copyDefaultLabel = (
            button.getAttribute("aria-label", ) ||
            "URL 복사"
        );

        button.addEventListener("click", async () => {
            const url = button.dataset.copyUrl || window.location.href;

            try {
                await copy_to_clipboard(url, );
                set_copy_button_label(button, "URL 복사 완료!", );
                button.classList.add("is_copied", );
            } catch {
                set_copy_button_label(button, "복사 실패", );
                button.classList.remove("is_copied", );
            } finally {
                if (button.copy_reset_timer) {
                    window.clearTimeout(button.copy_reset_timer, );
                }

                button.copy_reset_timer = window.setTimeout(
                    () => reset_copy_button_label(button, ),
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

            if (event.target.closest(".post_share_link", )) {
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

    function initialize_social_share() {
        initialize_copy_buttons();
        initialize_share_menus();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize_social_share,
            { once: true },
        );
    } else {
        initialize_social_share();
    }
})();
