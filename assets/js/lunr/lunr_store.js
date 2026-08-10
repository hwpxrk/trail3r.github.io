---
layout: none
---

/* Generate the Lunr search data store. */


{% assign has_search_post = false %}
const search_posts = [
    {%- for collection in site.collections -%}
        {%- assign searchable_documents = collection.docs
            | where_exp: "document", "document.search != false" -%}
        {%- for document in searchable_documents -%}
            {%- if document.header.teaser -%}
                {%- assign search_post_teaser = document.header.teaser -%}
            {%- else -%}
                {%- assign search_post_teaser = site.teaser -%}
            {%- endif -%}
            {%- capture search_post_excerpt -%}
                {{- document.content
                    | newline_to_br
                    | replace: "<br />", " "
                    | replace: "</p>", " "
                    | replace: "</h1>", " "
                    | replace: "</h2>", " "
                    | replace: "</h3>", " "
                    | replace: "</h4>", " "
                    | replace: "</h5>", " "
                    | replace: "</h6>", " "
                    | strip_html
                    | strip_newlines -}}
            {%- endcapture -%}
            {%- unless site.search_full_content == true -%}
                {%- assign search_post_excerpt = search_post_excerpt
                    | truncatewords: 50 -%}
            {%- endunless -%}
            {%- if has_search_post -%},{%- endif %}
    {
        "title": {{ document.title | jsonify }},
        "excerpt": {{ search_post_excerpt | jsonify }},
        "categories": {{ document.categories | jsonify }},
        "tags": {{ document.tags | jsonify }},
        "url": {{ document.url | relative_url | jsonify }},
        "teaser": {{ search_post_teaser | relative_url | jsonify }}
    }
            {%- assign has_search_post = true -%}
        {%- endfor -%}
    {%- endfor -%}
    {%- if site.lunr.search_within_pages -%}
        {%- assign searchable_pages = site.pages
            | where_exp: "document", "document.search != false"
            | where_exp: "document", "document.title != null" -%}
        {%- for document in searchable_pages -%}
            {%- capture search_post_excerpt -%}
                {{- document.content
                    | newline_to_br
                    | replace: "<br />", " "
                    | replace: "</p>", " "
                    | replace: "</h1>", " "
                    | replace: "</h2>", " "
                    | replace: "</h3>", " "
                    | replace: "</h4>", " "
                    | replace: "</h5>", " "
                    | replace: "</h6>", " "
                    | strip_html
                    | strip_newlines -}}
            {%- endcapture -%}
            {%- unless site.search_full_content == true -%}
                {%- assign search_post_excerpt = search_post_excerpt
                    | truncatewords: 50 -%}
            {%- endunless -%}
            {%- if has_search_post -%},{%- endif %}
    {
        "title": {{ document.title | jsonify }},
        "excerpt": {{ search_post_excerpt | jsonify }},
        "url": {{ document.url | absolute_url | jsonify }}
    }
            {%- assign has_search_post = true -%}
        {%- endfor -%}
    {%- endif %}
];
