/* Control the featured posts carousel. */


(() => {
    "use strict";

    const featured_posts_carousels = document.querySelectorAll(".js_featured_posts_carousel", );
    const prefers_reduced_motion = window.matchMedia("(prefers-reduced-motion: reduce)", );

    if (featured_posts_carousels.length === 0) return;

    function initialize_featured_posts(featured_posts_carousel) {
        const featured_posts = featured_posts_carousel.querySelector(".js_featured_posts", );

        if (!featured_posts) return;

        const featured_post_items = featured_posts.querySelectorAll(".js_featured_post", );
        const featured_posts_navigation = featured_posts_carousel.querySelector(".js_featured_posts_navigation", );
        const previous_button = featured_posts_carousel.querySelector(".js_featured_posts_button_previous", );
        const next_button = featured_posts_carousel.querySelector(".js_featured_posts_button_next", );

        if (featured_post_items.length < 2) return;
        if (!featured_posts_navigation || !previous_button || !next_button) return;

        let is_controls_update_scheduled = false;

        function update_featured_posts_controls() {
            const maximum_scroll_left = (featured_posts.scrollWidth - featured_posts.clientWidth);
            const scroll_left = featured_posts.scrollLeft;
            const has_overflow = maximum_scroll_left > 1;

            featured_posts_navigation.hidden = !has_overflow;
            previous_button.disabled = (!has_overflow || scroll_left <= 1);
            next_button.disabled = (!has_overflow || scroll_left >= maximum_scroll_left - 1);
        }

        function schedule_featured_posts_controls_update() {
            if (is_controls_update_scheduled) return;

            is_controls_update_scheduled = true;

            window.requestAnimationFrame(() => {
                is_controls_update_scheduled = false;
                update_featured_posts_controls();
            });
        }

        function get_featured_posts_scroll_step() {
            const computed_style = window.getComputedStyle(featured_posts);
            const column_gap = Number.parseFloat(computed_style.columnGap) || 0;
            const featured_post_width = (featured_post_items[0].getBoundingClientRect().width);

            return featured_post_width + column_gap;
        }

        function scroll_featured_posts(direction) {
            featured_posts.scrollBy({
                left: direction * get_featured_posts_scroll_step(),
                behavior: prefers_reduced_motion.matches ? "auto" : "smooth",
            });
        }

        previous_button.addEventListener("click", () => scroll_featured_posts(-1), );
        next_button.addEventListener("click", () => scroll_featured_posts(1), );
        featured_posts.addEventListener("scroll", schedule_featured_posts_controls_update, { passive: true }, );

        if ("ResizeObserver" in window) {
            const resize_observer = new ResizeObserver(update_featured_posts_controls, );

            resize_observer.observe(featured_posts);
        } else {
            window.addEventListener("resize", schedule_featured_posts_controls_update, );
        }

        window.addEventListener("load", update_featured_posts_controls, { once: true }, );
        update_featured_posts_controls();
    }

    featured_posts_carousels.forEach(initialize_featured_posts, );
})();
