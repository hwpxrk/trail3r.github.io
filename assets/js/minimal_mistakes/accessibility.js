/* Improve accessibility for generated content. */


(() => {
    "use strict";

    document.querySelectorAll(".task-list-item-checkbox", ).forEach((checkbox) => {
        if (!(checkbox instanceof HTMLInputElement)) return;

        const status = document.createElement("span");

        status.className = "screen_reader_only";
        status.textContent = checkbox.checked ? "완료: " : "미완료: ";

        checkbox.setAttribute("aria-hidden", "true", );
        checkbox.after(status);
    }, );

    const image_sliders = document.querySelectorAll(".image_slider", );

    function can_scroll_horizontally(image_slider) {
        return image_slider.scrollWidth > image_slider.clientWidth + 1;
    }

    function synchronize_image_slider(image_slider) {
        const is_scrollable = can_scroll_horizontally(image_slider, );

        if (is_scrollable && !image_slider.hasAttribute("tabindex", )) {
            image_slider.tabIndex = 0;
            image_slider.dataset.generatedTabindex = "true";
        }

        if (!is_scrollable && image_slider.dataset.generatedTabindex) {
            image_slider.removeAttribute("tabindex", );
            delete image_slider.dataset.generatedTabindex;
        }
    }

    image_sliders.forEach((image_slider, slider_index) => {
        if (!image_slider.hasAttribute("role", )) {
            image_slider.setAttribute("role", "region", );
        }

        if (!image_slider.hasAttribute("aria-label", )) {
            image_slider.setAttribute("aria-label", `가로 이미지 모음 ${slider_index + 1}`, );
        }

        image_slider.addEventListener("keydown", (event) => {
            if (!can_scroll_horizontally(image_slider, )) return;

            const scroll_distance = image_slider.clientWidth * 0.85;
            const scroll_options = { behavior: "smooth" };

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                image_slider.scrollBy({ ...scroll_options, left: -scroll_distance }, );
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                image_slider.scrollBy({ ...scroll_options, left: scroll_distance }, );
            } else if (event.key === "Home") {
                event.preventDefault();
                image_slider.scrollTo({ ...scroll_options, left: 0 }, );
            } else if (event.key === "End") {
                event.preventDefault();
                image_slider.scrollTo({...scroll_options, left: image_slider.scrollWidth, }, );
            }
        }, );

        image_slider.querySelectorAll("img", ).forEach((image) => {
            image.addEventListener("load", () => synchronize_image_slider(image_slider, ), { once: true }, );
        }, );

        synchronize_image_slider(image_slider, );
    }, );

    if (image_sliders.length > 0) {
        if ("ResizeObserver" in window) {
            const image_slider_resize_observer = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    synchronize_image_slider(entry.target, );
                }, );
            }, );

            image_sliders.forEach((image_slider) => {
                image_slider_resize_observer.observe(image_slider, );
            }, );
        } else {
            window.addEventListener("resize", () => {
                image_sliders.forEach(synchronize_image_slider, );
            }, );
        }
    }
})();
