---
layout: none
---

/* Control Lunr search and result rendering. */


(() => {
    "use strict";

    const search_input = document.querySelector("#search_input", );
    const search_results_container = document.querySelector(
        "#search_results",
    );
    const search_results_found_text = {{
        site.data.ui-text[site.locale].results_found
        | default: "Result(s) found"
        | jsonify
    }};
    const post_metadata_by_url = {
        {% for post in site.posts %}
            {{ post.url | relative_url | jsonify }}: {
                subtitle: {{ post.subtitle | default: "" | jsonify }},
                date: {{ post.date | date: "%Y. %m. %d" | jsonify }},
                datetime: {{ post.date | date_to_xmlschema | jsonify }},
            }{% unless forloop.last %},{% endunless %}
        {% endfor %}
    };

    // Skip index construction outside the search interface.
    if (!search_input || !search_results_container) return;

    const search_index = lunr(function initialize_search_index() {
        this.field("title");
        this.field("subtitle");
        this.field("excerpt");
        this.field("categories");
        this.field("tags");
        this.ref("id");

        const configure_search_index = window.configure_lunr_search_index;

        if (configure_search_index) {
            configure_search_index.call(this);
        } else {
            // Preserve Korean tokens by removing the default English trimmer.
            this.pipeline.remove(lunr.trimmer);
        }

        search_posts.forEach((search_post, search_post_index) => {
            const post_metadata = post_metadata_by_url[search_post.url] ?? {};

            this.add({
                title: search_post.title,
                subtitle: post_metadata.subtitle ?? "",
                excerpt: search_post.excerpt,
                categories: search_post.categories,
                tags: search_post.tags,
                id: search_post_index,
            });
        }, );
    });

    function get_search_results(search_query) {
        const normalized_query = search_query.toLowerCase();
        const search_terms = normalized_query
            .split(lunr.tokenizer.separator)
            .filter((search_term) => search_term !== "");

        if (search_terms.length === 0) return [];

        const has_trailing_space = normalized_query.endsWith(" ");

        return search_index.query((query) => {
            search_terms.forEach((search_term) => {
                // Rank exact terms before partial and fuzzy matches.
                query.term(search_term, { boost: 100 });

                if (!has_trailing_space) {
                    query.term(search_term, {
                        usePipeline: false,
                        wildcard: lunr.Query.wildcard.TRAILING,
                        boost: 10,
                    });
                }

                query.term(search_term, {
                    usePipeline: false,
                    editDistance: 1,
                    boost: 1,
                });
            }, );
        });
    }

    function create_text_element(element_name, class_name, text) {
        const element = document.createElement(element_name);

        element.className = class_name;
        element.textContent = text;

        return element;
    }

    function create_search_result(search_post) {
        const post_metadata = post_metadata_by_url[search_post.url] ?? {};
        const post_category = Array.isArray(search_post.categories)
            ? search_post.categories[0]
            : search_post.categories;
        const post_tags = Array.isArray(search_post.tags)
            ? search_post.tags.map((tag) => `#${tag}`).join(" ")
            : "";
        const search_result = document.createElement("article");
        const search_result_link = document.createElement("a");
        const search_result_thumbnail = document.createElement("div");
        const search_result_metadata = document.createElement("div");
        const search_result_date = create_text_element(
            "time",
            "search_result_date",
            post_metadata.date ?? "",
        );

        search_result.className = "search_result";
        search_result_link.className = "search_result_link";
        search_result_link.href = search_post.url;
        search_result_thumbnail.className = "search_result_thumbnail";
        search_result_metadata.className = "search_result_metadata";
        search_result_date.dateTime = post_metadata.datetime ?? "";

        if (search_post.teaser) {
            const search_result_teaser = document.createElement("img");

            search_result_teaser.className = "search_result_teaser";
            search_result_teaser.src = search_post.teaser;
            search_result_teaser.alt = "";
            search_result_teaser.loading = "lazy";
            search_result_teaser.decoding = "async";
            search_result_thumbnail.append(search_result_teaser);
        }

        search_result_metadata.append(
            create_text_element("p", "search_result_category", post_category ?? ""),
            create_text_element("p", "search_result_title", search_post.title ?? ""),
            create_text_element("p", "search_result_subtitle", post_metadata.subtitle ?? ""),
            create_text_element("p", "search_result_tags", post_tags),
            search_result_date,
        );
        search_result_link.append(search_result_thumbnail, search_result_metadata);
        search_result.append(search_result_link);

        return search_result;
    }

    function render_search_results(search_results) {
        const search_results_fragment = document.createDocumentFragment();
        const search_results_found = create_text_element(
            "p",
            "search_results_found",
            `${search_results.length}${search_results_found_text}`,
        );

        search_results_fragment.append(search_results_found);

        search_results.forEach((search_result) => {
            const search_post = search_posts[search_result.ref];

            if (search_post) search_results_fragment.append(create_search_result(search_post));
        }, );

        search_results_container.replaceChildren(search_results_fragment);
    }

    function handle_search_input() {
        const search_query = search_input.value;

        if (search_query.trim() === "") {
            search_results_container.replaceChildren();
            return;
        }

        render_search_results(get_search_results(search_query));
    }

    search_input.addEventListener("input", handle_search_input, );
})();
