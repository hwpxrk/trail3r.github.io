/* Enhance Tree-Sitter code blocks. */


(() => {
    "use strict";

    const codeblocks = document.querySelectorAll(".highlighter-tree-sitter", );
    const language_prefix = "language-";

    const opening_brackets = new Set(["(", "{", "["]);
    const closing_brackets = new Map([
        [")", "("],
        ["}", "{"],
        ["]", "["],
    ]);
    const bracket_pattern = /([()[\]{}])/;
    const bracket_depth_limit = 8;

    const copy_state_reset_delay = 1000;
    const copy_icon_path = (
        "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2" +
        "v-9a2 2 0 0 0-2-2ZM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9" +
        "a2 2 0 0 1 2 2v1"
    );
    const copied_icon_path = "M20 6 9 17l-5-5";
    const copy_button_class = "codeblock_copy_button";
    const copy_button_selector = `.${copy_button_class}`;

    const minimum_floating_line_count = 20;
    const floating_top_gap = 8;
    const floating_right_gap = 11;
    const viewport_edge_gap = 8;
    const original_button_visibility_gap = 10;
    const codeblock_bottom_gap = 20;

    if (codeblocks.length === 0) return;

    function create_codeblock_element(element_name, class_name, text_content = "") {
        const element = document.createElement(element_name);

        element.className = class_name;
        element.textContent = text_content;

        return element;
    }

    function get_code_element(codeblock) {
        return codeblock.querySelector("pre > code", );
    }

    function get_line_count(code) {
        const normalized_code = code.replace(/\r?\n$/, "");

        return Math.max(1, normalized_code.split(/\r?\n/).length);
    }

    function get_copy_button(codeblock) {
        return codeblock.querySelector(copy_button_selector, );
    }


    // Render metadata.
    function get_codeblock_language(codeblock) {
        const language_class = Array.from(codeblock.classList).find(
            (class_name) => class_name.startsWith(language_prefix),
        );
        const language = language_class?.slice(language_prefix.length).trim();

        return language || "Code";
    }

    function render_codeblock_metadata(codeblock) {
        const pre = codeblock.querySelector(":scope > pre", );
        const existing_masthead = codeblock.querySelector(
            ":scope > .codeblock_masthead",
        );

        if (!pre || existing_masthead) return;

        const filename = codeblock.dataset.filename?.trim();
        const masthead = create_codeblock_element("div", "codeblock_masthead", );
        const metadata = create_codeblock_element(
            "div",
            "codeblock_masthead_metadata",
        );

        metadata.append(
            create_codeblock_element(
                "span",
                "codeblock_masthead_language",
                get_codeblock_language(codeblock),
            ),
        );

        if (filename) {
            metadata.append(
                create_codeblock_element(
                    "span",
                    "codeblock_masthead_filename",
                    filename,
                ),
            );
        }

        masthead.append(metadata);
        pre.before(masthead);
    }


    // Render line numbers.
    function create_line_number_gutter(line_count) {
        const gutter = create_codeblock_element("div", "codeblock_gutter", );

        for (let line_number = 1; line_number <= line_count; line_number += 1) {
            gutter.append(create_codeblock_element("span", "", line_number, ));
        }

        return gutter;
    }

    function render_codeblock_line_numbers(codeblock) {
        let body = codeblock.querySelector(":scope > .codeblock_body", );
        const pre = body
            ? body.querySelector(":scope > pre", )
            : codeblock.querySelector(":scope > pre", );
        const existing_gutter = body?.querySelector(
            ":scope > .codeblock_gutter",
        );

        if (!pre || existing_gutter) return;

        if (!body) {
            body = create_codeblock_element("div", "codeblock_body", );

            pre.before(body);
            body.append(pre);
        }

        pre.before(
            create_line_number_gutter(
                get_line_count(pre.textContent ?? ""),
            ),
        );
    }


    // Highlight nested bracket.
    function create_bracket_element(owner_document, bracket_character, depth = null) {
        const bracket = owner_document.createElement("span");

        bracket.textContent = bracket_character;

        if (depth === null) {
            bracket.className = "codeblock_bracket_mismatch";
            return bracket;
        }

        const color_depth = ((depth - 1) % bracket_depth_limit) + 1;

        bracket.classList.add(
            "codeblock_bracket",
            `codeblock_bracket_depth_${color_depth}`,
        );

        return bracket;
    }

    function is_processable_text_node(text_node) {
        const text = text_node.nodeValue ?? "";
        const parent = text_node.parentElement;

        if (!parent || !bracket_pattern.test(text)) return false;

        const excluded_context = parent.closest(
            ".codeblock_bracket, .codeblock_bracket_mismatch, .ts-comment",
        );

        if (excluded_context) return false;

        const string_context = parent.closest(".ts-string, .ts-embedded");

        return (!string_context || string_context.classList.contains("ts-embedded"));
    }

    function get_bracket_text_nodes(code_element) {
        const owner_document = code_element.ownerDocument;
        const tree_walker = owner_document.createTreeWalker(
            code_element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(text_node) {
                    if (is_processable_text_node(text_node)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }

                    return NodeFilter.FILTER_REJECT;
                },
            },
        );
        const text_nodes = [];
        let text_node = tree_walker.nextNode();

        while (text_node) {
            text_nodes.push(text_node);
            text_node = tree_walker.nextNode();
        }

        return text_nodes;
    }

    function render_rainbow_brackets(code_element) {
        const owner_document = code_element.ownerDocument;
        const bracket_stack = [];
        const text_nodes = get_bracket_text_nodes(code_element);

        for (const text_node of text_nodes) {
            const fragment = owner_document.createDocumentFragment();
            const tokens = (text_node.nodeValue ?? "").split(bracket_pattern);

            for (const token of tokens) {
                if (!token) continue;

                if (opening_brackets.has(token)) {
                    const depth = bracket_stack.length + 1;
                    const element = create_bracket_element(
                        owner_document,
                        token,
                        depth,
                    );

                    bracket_stack.push({ character: token, depth, element });
                    fragment.append(element);
                    continue;
                }

                if (closing_brackets.has(token)) {
                    const expected_opener = closing_brackets.get(token);
                    const opener = bracket_stack.at(-1);

                    if (opener?.character === expected_opener) {
                        fragment.append(
                            create_bracket_element(
                                owner_document,
                                token,
                                opener.depth,
                            ),
                        );
                        bracket_stack.pop();
                    } else {
                        fragment.append(
                            create_bracket_element(owner_document, token),
                        );
                    }

                    continue;
                }

                fragment.append(owner_document.createTextNode(token));
            }

            text_node.replaceWith(fragment);
        }

        for (const opener of bracket_stack) {
            opener.element.className = "codeblock_bracket_mismatch";
        }
    }


    // Control code copying function.
    async function copy_to_clipboard(text) {
        if (!navigator.clipboard?.writeText) {
            throw new Error("Clipboard API is not supported", );
        }

        await navigator.clipboard.writeText(text, );
    }

    function create_codeblock_copy_icon() {
        const svg_namespace = "http://www.w3.org/2000/svg";
        const icon = document.createElementNS(svg_namespace, "svg");
        const path = document.createElementNS(svg_namespace, "path");

        icon.classList.add("codeblock_copy_button_icon");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("fill", "none");
        icon.setAttribute("stroke", "currentColor");
        icon.setAttribute("stroke-width", "2");
        icon.setAttribute("stroke-linecap", "round");
        icon.setAttribute("stroke-linejoin", "round");
        icon.setAttribute("focusable", "false");
        icon.setAttribute("aria-hidden", "true");
        path.setAttribute("d", copy_icon_path);
        icon.append(path);

        return icon;
    }

    function update_codeblock_copy_icon(icon, is_copied) {
        icon.firstElementChild?.setAttribute(
            "d",
            is_copied ? copied_icon_path : copy_icon_path,
        );
    }

    function update_copy_button_label(button, label) {
        button.setAttribute("aria-label", label);
        button.title = label;
    }

    function render_codeblock_copy_button(codeblock) {
        const masthead = codeblock.querySelector(
            ":scope > .codeblock_masthead",
        );
        const code = get_code_element(codeblock);
        const existing_button = get_copy_button(codeblock);

        if (!masthead || !code || existing_button) return;

        const wrapper = create_codeblock_element("div", "codeblock_copy", );
        const button = create_codeblock_element("button", copy_button_class, );
        const icon = create_codeblock_copy_icon();

        button.type = "button";
        update_copy_button_label(button, "코드 복사");

        button.append(icon);
        wrapper.append(button);
        masthead.append(wrapper);

        let is_copying = false;
        let reset_timer = null;

        function update_copy_button_state(label, is_copied) {
            update_copy_button_label(button, label);
            update_codeblock_copy_icon(icon, is_copied);
            button.classList.toggle("is_copied", is_copied);

            button.dispatchEvent(
                new CustomEvent("codeblock_copy_state", {
                    bubbles: true,
                    detail: {
                        label,
                        copied: is_copied,
                    },
                }),
            );
        }

        function schedule_copy_button_state_reset() {
            reset_timer = window.setTimeout(() => {
                reset_timer = null;
                update_copy_button_state("코드 복사", false);
            }, copy_state_reset_delay, );
        }

        async function copy_codeblock_text() {
            if (is_copying) return;

            is_copying = true;

            if (reset_timer !== null) {
                window.clearTimeout(reset_timer);
                reset_timer = null;
            }

            try {
                await copy_to_clipboard(code.textContent ?? "");
                update_copy_button_state("복사 완료", true);
            } catch {
                update_copy_button_state("복사 실패", false);
            } finally {
                is_copying = false;
                schedule_copy_button_state_reset();
            }
        }

        button.addEventListener("click", copy_codeblock_text, );
        button.addEventListener("codeblock_copy_request", copy_codeblock_text, );
    }


    // Float the copy button.
    function is_floating_target(codeblock) {
        const code = get_code_element(codeblock);
        const copy_button = get_copy_button(codeblock);
        const line_count = code ? get_line_count(code.textContent ?? "") : 0;

        return Boolean(
            copy_button &&
            line_count > minimum_floating_line_count,
        );
    }

    function initialize_floating_copy_button() {
        const masthead = document.querySelector(".masthead", );
        const existing_floating_wrapper = document.querySelector(
            ".codeblock_copy_floating",
        );
        const target_codeblocks = Array.from(codeblocks).filter(is_floating_target, );

        if (
            !masthead ||
            existing_floating_wrapper ||
            target_codeblocks.length === 0
        ) {
            return;
        }

        const floating_wrapper = create_codeblock_element(
            "div",
            "codeblock_copy_floating",
        );
        const floating_button = create_codeblock_element(
            "button",
            "codeblock_copy_button",
        );
        const floating_icon = create_codeblock_copy_icon();

        floating_wrapper.style.display = "none";
        floating_button.type = "button";
        update_copy_button_label(floating_button, "코드 복사");

        floating_button.append(floating_icon);
        floating_wrapper.append(floating_button);
        document.body.append(floating_wrapper);

        let active_codeblock = null;
        let floating_top = 0;
        let is_update_scheduled = false;

        function hide_floating_button() {
            floating_wrapper.style.display = "none";
            active_codeblock = null;
        }

        function update_floating_button_top_offset() {
            const masthead_bottom = masthead.getBoundingClientRect().bottom;

            floating_top = Math.round(
                Math.max(0, masthead_bottom) + floating_top_gap,
            );
        }

        function synchronize_floating_copy_button(original_button) {
            const label = original_button.getAttribute("aria-label");

            if (!label) return false;

            const is_copied = original_button.classList.contains("is_copied");

            update_copy_button_label(floating_button, label);
            update_codeblock_copy_icon(floating_icon, is_copied);
            floating_button.classList.toggle("is_copied", is_copied);

            return true;
        }

        function find_active_codeblock() {
            for (const codeblock of target_codeblocks) {
                const codeblock_rectangle = codeblock.getBoundingClientRect();

                if (
                    codeblock_rectangle.bottom < 0 ||
                    codeblock_rectangle.top > window.innerHeight
                ) {
                    continue;
                }

                const original_button = get_copy_button(codeblock);

                if (!original_button) continue;

                const original_button_rectangle = (
                    original_button.getBoundingClientRect()
                );

                if (
                    original_button_rectangle.bottom >
                    floating_top - original_button_visibility_gap
                ) {
                    continue;
                }

                if (
                    codeblock_rectangle.bottom <=
                    floating_top +
                    original_button_rectangle.height +
                    codeblock_bottom_gap
                ) {
                    continue;
                }

                return codeblock;
            }

            return null;
        }

        function update_floating_button() {
            const next_codeblock = find_active_codeblock();

            if (!next_codeblock) {
                hide_floating_button();
                return;
            }

            if (next_codeblock !== active_codeblock) {
                const original_button = get_copy_button(next_codeblock);

                if (
                    !original_button ||
                    !synchronize_floating_copy_button(original_button)
                ) {
                    hide_floating_button();
                    return;
                }

                active_codeblock = next_codeblock;
                floating_wrapper.style.display = "block";
            }

            const codeblock_right = active_codeblock.getBoundingClientRect().right;
            const floating_right = Math.max(
                viewport_edge_gap,
                Math.round(
                    window.innerWidth -
                    codeblock_right +
                    floating_right_gap,
                ),
            );

            floating_wrapper.style.top = `${floating_top}px`;
            floating_wrapper.style.right = `${floating_right}px`;
        }

        function schedule_floating_button_update() {
            if (is_update_scheduled) return;

            is_update_scheduled = true;

            window.requestAnimationFrame(() => {
                is_update_scheduled = false;
                update_floating_button();
            });
        }

        floating_button.addEventListener("click", () => {
            if (!active_codeblock) return;

            const original_button = get_copy_button(active_codeblock);

            if (!original_button) {
                hide_floating_button();
                return;
            }

            original_button.dispatchEvent(
                new CustomEvent("codeblock_copy_request", {
                    bubbles: true,
                }),
            );
        });

        document.addEventListener("codeblock_copy_state", (event) => {
            if (!active_codeblock || !active_codeblock.contains(event.target)) return;

            const label = event.detail?.label;
            const is_copied = Boolean(event.detail?.copied);

            if (typeof label === "string") {
                update_copy_button_label(floating_button, label);
            }

            update_codeblock_copy_icon(floating_icon, is_copied);
            floating_button.classList.toggle("is_copied", is_copied);
        });

        window.addEventListener(
            "scroll",
            schedule_floating_button_update,
            { passive: true },
        );
        window.addEventListener("resize", () => {
            update_floating_button_top_offset();
            schedule_floating_button_update();
        });
        window.addEventListener(
            "load",
            schedule_floating_button_update,
            { once: true },
        );

        const masthead_resize_observer = new ResizeObserver(() => {
            update_floating_button_top_offset();
            schedule_floating_button_update();
        });

        masthead_resize_observer.observe(masthead);

        update_floating_button_top_offset();
        update_floating_button();
    }


    // Initialize code blocks.
    function initialize_codeblock(codeblock) {
        render_codeblock_metadata(codeblock);
        render_codeblock_line_numbers(codeblock);

        const code_element = get_code_element(codeblock);

        if (code_element) render_rainbow_brackets(code_element);

        render_codeblock_copy_button(codeblock);
    }

    codeblocks.forEach(initialize_codeblock, );
    initialize_floating_copy_button();
})();
