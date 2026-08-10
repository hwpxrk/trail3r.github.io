/* Make embedded media responsive. */


(() => {
    "use strict";

    const main_content = document.querySelector("#main", );
    const embed_selector = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        "object",
        "embed",
    ].join(", ");

    if (!main_content) return;

    function is_ignored_embed(embed) {
        const is_nested_object = (
            embed.tagName === "OBJECT" &&
            Boolean(embed.parentElement?.closest("object", ))
        );
        const is_object_child = (
            embed.tagName === "EMBED" &&
            embed.parentElement?.tagName === "OBJECT"
        );

        return Boolean(
            is_nested_object ||
            is_object_child ||
            embed.closest(".fitvidsignore", ) ||
            embed.closest(".fluid_width_video_wrapper", ) ||
            embed.closest(".responsive_video_container", )
        );
    }

    function get_embed_dimensions(embed) {
        const width_attribute = Number.parseFloat(embed.getAttribute("width", ));
        const height_attribute = Number.parseFloat(embed.getAttribute("height", ));
        const embed_rectangle = embed.getBoundingClientRect();
        const width = (Number.isFinite(width_attribute) && width_attribute > 0 ? width_attribute : embed_rectangle.width);
        const height = (Number.isFinite(height_attribute) && height_attribute > 0 ? height_attribute : embed_rectangle.height);

        if (width > 0 && height > 0) return { width, height };

        return { width: 16, height: 9 };
    }

    function ensure_responsive_embed_styles() {
        if (document.querySelector("#responsive_embed_styles", )) return;

        const style = document.createElement("style");

        style.id = "responsive_embed_styles";
        style.textContent = (
            ".fluid_width_video_wrapper{width:100%;position:relative;padding:0;}" +
            ".fluid_width_video_wrapper iframe," +
            ".fluid_width_video_wrapper object," +
            ".fluid_width_video_wrapper embed{" +
            "position:absolute;top:0;left:0;width:100%;height:100%;}"
        );

        document.head.append(style);
    }

    function wrap_embed(embed, embed_index) {
        const { width, height } = get_embed_dimensions(embed);
        const wrapper = document.createElement("div");

        if (!embed.id) embed.id = `responsive_embed_${embed_index}`;

        wrapper.className = "fluid_width_video_wrapper";
        wrapper.style.paddingTop = `${(height / width) * 100}%`;

        embed.before(wrapper);
        wrapper.append(embed);
        embed.removeAttribute("height", );
        embed.removeAttribute("width", );
    }

    const embeds = Array.from(main_content.querySelectorAll(embed_selector, )).filter(
        (embed) => !is_ignored_embed(embed),
    );

    if (embeds.length > 0) {
        ensure_responsive_embed_styles();
        embeds.forEach(wrap_embed, );
    }
})();
