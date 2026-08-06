/* Control tag expand function */


(() => {
    "use strict";

    function update_tag_archive_toggle(toggle_button, is_expanded) {
        const expand_text = toggle_button.dataset.expandText || "태그 더 보기";
        const hide_text = toggle_button.dataset.hideText || "태그 접기";

        toggle_button.setAttribute("aria-expanded", String(is_expanded), );
        toggle_button.textContent = is_expanded ? hide_text : expand_text;
    }

    function update_tag_item_visibility(hidden_tag_items, is_expanded) {
        hidden_tag_items.forEach((tag_item) => {
            tag_item.hidden = !is_expanded;
        });
    }

    function animate_tag_archive(tag_index, hidden_tag_items, is_expanded) {
        const start_height = tag_index.offsetHeight;

        update_tag_item_visibility(hidden_tag_items, is_expanded);

        const end_height = tag_index.offsetHeight;

        if (!is_expanded) {
            update_tag_item_visibility(hidden_tag_items, true);
        }

        tag_index.style.overflow = "hidden";

        return tag_index.animate(
            [
                { height: `${start_height}px` },
                { height: `${end_height}px` },
            ],
            {
                duration: 250,
                easing: "ease-in-out",
            },
        );
    }

    const prefers_reduced_motion = window.matchMedia("(prefers-reduced-motion: reduce)", ).matches;
    const tag_archive_toggle_buttons = document.querySelectorAll(".js_tag_archive_toggle", );

    tag_archive_toggle_buttons.forEach((toggle_button) => {
        const tag_archive = toggle_button.closest(".js_tag_archive", );
        const tag_index = tag_archive.querySelector(".taxonomy_index", );
        const hidden_tag_items = tag_archive.querySelectorAll(".js_tag_archive_hidden_item", );

        toggle_button.hidden = false;
        update_tag_item_visibility(hidden_tag_items, false);
        update_tag_archive_toggle(toggle_button, false);

        toggle_button.addEventListener("click", () => {
            const is_expanded = toggle_button.getAttribute("aria-expanded", ) === "true";
            const next_is_expanded = !is_expanded;

            update_tag_archive_toggle(toggle_button, next_is_expanded);

            if (prefers_reduced_motion) {
                update_tag_item_visibility(hidden_tag_items, next_is_expanded);

                return;
            }

            toggle_button.disabled = true;

            const tag_archive_animation = animate_tag_archive(
                tag_index,
                hidden_tag_items,
                next_is_expanded,
            );

            tag_archive_animation.addEventListener("finish", () => {
                update_tag_item_visibility(hidden_tag_items, next_is_expanded);

                tag_index.style.removeProperty("overflow");
                toggle_button.disabled = false;
            }, { once: true }, );
        });
    });
})();
