/*
태그 아카이브의 숨겨진 태그 목록을 펼치고 접는 기능을 제어합니다.

참고사항(Notes)
-------------
태그 아카이브 페이지에서는 처음 15개를 제외한 태그 목록을 펼치거나 접습니다.

연관(Related)
------------
"_includes/customs/tag_archive.html": 태그 아카이브 목록과 펼치기 버튼의 HTML 마크업 구조를 정의합니다.
*/


(() => {
    "use strict";

    function set_tag_archive_expand_state(expand_button, is_expanded) {
        const tag_archive = expand_button.closest(".js_tag_archive", );
        const hidden_tags = tag_archive.querySelectorAll(".js_tag_archive_hidden_item", );
        const expand_text = expand_button.dataset.expandText || "태그 더 보기";
        const hide_text = expand_button.dataset.hideText || "태그 접기";

        hidden_tags.forEach((hidden_tag) => {
            hidden_tag.hidden = !is_expanded;
        });

        expand_button.setAttribute("aria-expanded", String(is_expanded), );
        expand_button.textContent = is_expanded ? hide_text : expand_text;
    }

    const tag_archive_expand_buttons = document.querySelectorAll(".js_tag_archive_toggle", );

    tag_archive_expand_buttons.forEach((expand_button) => {
        expand_button.hidden = false;
        set_tag_archive_expand_state(expand_button, false);

        expand_button.addEventListener("click", () => {
            const is_expanded = expand_button.getAttribute("aria-expanded", ) === "true";

            set_tag_archive_expand_state(expand_button, !is_expanded);
        });
    });
})();
