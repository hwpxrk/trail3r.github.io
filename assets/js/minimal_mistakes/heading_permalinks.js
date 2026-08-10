/* Add permalink controls to content headings. */


(() => {
    "use strict";

    const page_content = document.querySelector(".page_content", );

    if (!page_content) return;

    function create_permalink(identifier) {
        const permalink = document.createElement("a");
        const accessible_label = document.createElement("span");
        const icon = document.createElement("i");

        permalink.className = "heading_permalink";
        permalink.href = `#${identifier}`;
        permalink.title = "이 제목으로 바로가기";

        accessible_label.className = "screen_reader_only";
        accessible_label.textContent = "이 제목으로 바로가기";

        icon.className = "fas fa-link";
        icon.setAttribute("aria-hidden", "true", );

        permalink.append(accessible_label, icon);

        return permalink;
    }

    page_content
        .querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]", )
        .forEach((heading) => {
            const existing_permalink = heading.querySelector(":scope > .heading_permalink", );

            if (!existing_permalink) {
                heading.append(create_permalink(heading.id, ));
            }
        }, );
})();
