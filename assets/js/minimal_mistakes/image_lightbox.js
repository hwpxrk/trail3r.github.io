/* Initialize linked image lightboxes. */


(() => {
    "use strict";

    const image_extension_pattern = /\.(?:gif|jpe?g|png|webp)$/i;
    const image_links = Array.from(document.querySelectorAll("a[href]", )).filter(
        (anchor) => {
            const has_direct_image = Boolean(anchor.querySelector(":scope > img", ));
            const link_url = new URL(anchor.href, window.location.href, );

            return (
                has_direct_image &&
                (
                    anchor.classList.contains("image_popup", ) ||
                    image_extension_pattern.test(link_url.pathname)
                )
            );
        },
    );

    image_links.forEach((image_link) => {
        image_link.classList.add("image_popup", );
    }, );

    const jquery = window.jQuery;
    const has_magnific_popup = (
        jquery && typeof jquery.fn.magnificPopup === "function"
    );

    if (image_links.length === 0 || !has_magnific_popup) return;

    jquery(image_links).magnificPopup({
        type: "image",
        tLoading: "Loading image #%curr%...",
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
        },
        image: {
            tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
        },
        removalDelay: 500,
        mainClass: "mfp-zoom-in",
        callbacks: {
            beforeOpen() {
                this.st.image.markup = this.st.image.markup.replace(
                    "mfp-figure",
                    "mfp-figure mfp-with-anim",
                );
            },
        },
        closeOnContentClick: true,
        midClick: true,
    });
})();
