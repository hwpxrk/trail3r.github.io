# Build and maintain the theme assets.


require "bundler/gem_tasks" unless Dir.glob("*.gemspec").empty?
require "jekyll"
require "json"
require "listen"
require "rake/clean"
require "shellwords"
require "time"
require "yaml"

task :default => %i[copyright changelog js version]

package_json = JSON.parse(File.read("package.json"))

def get_ignored_paths
    [
        /_config\.ya?ml/,
        /_site/,
        /\.jekyll-metadata/,
    ]
end

def create_listen_handler(base_path, options)
    site = Jekyll::Site.new(options)

    Jekyll::Command.process_site(site)

    proc do |modified_paths, added_paths, removed_paths|
        started_at = Time.now
        changed_paths = modified_paths + added_paths + removed_paths
        relative_paths = changed_paths.map do |path|
            Pathname.new(path).relative_path_from(base_path).to_s
        end

        print Jekyll.logger.message(
            "Regenerating:",
            "#{relative_paths.join(", ")} changed... ",
        )

        begin
            Jekyll::Command.process_site(site)
            puts "regenerated in #{Time.now - started_at} seconds."
        rescue StandardError => error
            puts "error:"
            Jekyll.logger.warn "Error:", error.message
            Jekyll.logger.warn "Error:", "Run jekyll build --trace for more information."
        end
    end
end

task :preview do
    base_path = Pathname.new(".").expand_path
    options = Jekyll.configuration(
        "source" => base_path.join("test").to_s,
        "destination" => base_path.join("test/_site").to_s,
        "force_polling" => false,
        "serving" => true,
        "theme" => "minimal-mistakes-jekyll",
    )

    ENV["LISTEN_GEM_DEBUGGING"] = "1"
    listener = Listen.to(
        base_path.join("_data"),
        base_path.join("_includes"),
        base_path.join("_layouts"),
        base_path.join("_sass"),
        base_path.join("assets"),
        options["source"],
        ignore: get_ignored_paths,
        force_polling: options["force_polling"],
        &create_listen_handler(base_path, options)
    )

    begin
        listener.start
        Jekyll.logger.info "Auto-regeneration:", "enabled for '#{options["source"]}'"

        unless options["serving"]
            trap("INT") do
                listener.stop
                puts "     Halting auto-regeneration."
                exit 0
            end

            sleep
        end
    rescue ThreadError
        # The listener stops when the process is interrupted.
    end

    Jekyll::Commands::Serve.process(options)
end

task :history => :changelog
task :changelog => "docs/_docs/18-history.md"
file "docs/_docs/18-history.md" => "CHANGELOG.md" do |task_file|
    front_matter = {
        title: "History",
        classes: "wide",
        permalink: "/docs/history/",
        excerpt: "Change log of enhancements and bug fixes made to the theme.",
        sidebar: {
            nav: "docs",
        },
        last_modified_at: Time.now.iso8601,
        toc: false,
    }

    front_matter = JSON.parse(JSON.dump(front_matter))

    File.open(task_file.name, "w") do |file|
        file.puts front_matter.to_yaml
        file.puts "---"
        file.puts ""
        file.puts "<!--\n    Sourced from CHANGELOG.md\n    See Rakefile `task :changelog` for details\n-->"
        file.puts ""
        file.puts "{% raw %}"

        # Remove the changelog title.
        changelog = File.read(task_file.prerequisites.first)
            .gsub(/^# [^\n]*$/m, "")
            .gsub(/\(#(\d+)\)$/m, "[#\\1](https://github.com/mmistakes/minimal-mistakes/issues/\\1)")
            .strip

        file.write changelog
        file.puts ""
        file.puts "{% endraw %}"
    end
end

COPYRIGHT_LINES = [
    "Minimal Mistakes Jekyll Theme #{package_json["version"]} by Michael Rose",
    "Copyright 2013-#{Time.now.year} Michael Rose - mademistakes.com | @mmistakes",
    "Free for personal and commercial use under the MIT license",
    "https://github.com/mmistakes/minimal-mistakes/blob/master/LICENSE",
]

COPYRIGHT_FILES = [
    "_includes/copyright.html",
    "_includes/copyright.js",
    "_sass/minimal-mistakes/_copyright.scss",
]

def generate_copyright_file(filename, header, prefix, footer)
    File.open(filename, "w") do |file|
        file.puts header
        COPYRIGHT_LINES.each do |line|
            file.puts "#{prefix}#{line}"
        end
        file.puts footer
    end
end

file "_includes/copyright.html" => "package.json" do |task_file|
    generate_copyright_file(task_file.name, "<!--", "  ", "-->")
end

file "_includes/copyright.js" => "package.json" do |task_file|
    generate_copyright_file(task_file.name, "/*!", " * ", " */")
end

file "_sass/minimal-mistakes/_copyright.scss" => "package.json" do |task_file|
    generate_copyright_file(task_file.name, "/*!", " * ", " */")
end

task :copyright => COPYRIGHT_FILES

CLEAN.include(*COPYRIGHT_FILES)

JAVASCRIPT_SOURCES = [
    "assets/js/vendor/jquery/jquery-3.6.0.js",
    "assets/js/plugins/jquery.magnific-popup.js",
    "assets/js/minimal_mistakes/responsive_embeds.js",
    "assets/js/minimal_mistakes/masthead.js",
    "assets/js/minimal_mistakes/accessibility.js",
    "assets/js/minimal_mistakes/anchor_navigation.js",
    "assets/js/minimal_mistakes/table_of_contents.js",
    "assets/js/minimal_mistakes/heading_permalinks.js",
    "assets/js/minimal_mistakes/image_lightbox.js",
    "assets/js/minimal_mistakes/author_profile.js",
    "assets/js/minimal_mistakes/expandable_tag.js",
    "assets/js/minimal_mistakes/social_share.js",
]
JAVASCRIPT_BUNDLE = "assets/js/main.min.js"
JAVASCRIPT_SOURCE_MAP = "#{JAVASCRIPT_BUNDLE}.map"
JAVASCRIPT_OUTPUTS = [JAVASCRIPT_BUNDLE, JAVASCRIPT_SOURCE_MAP]
JAVASCRIPT_PREREQUISITES = ["_includes/copyright.js"] + JAVASCRIPT_SOURCES

def build_javascript_bundle
    command = %w[npx --yes --package uglify-js uglifyjs -c --comments /@mmistakes/ --source-map -m -o]
    command += [JAVASCRIPT_BUNDLE] + JAVASCRIPT_PREREQUISITES

    sh Shellwords.join(command)
end

desc "Build the JavaScript bundle and source map."
task :js => JAVASCRIPT_OUTPUTS

JAVASCRIPT_OUTPUTS.each do |output|
    file output => JAVASCRIPT_PREREQUISITES do
        build_javascript_bundle
    end
end

desc "Watch JavaScript sources and rebuild the bundle."
task :watch_js do
    listener = Listen.to(
        "assets/js",
        ignore: /main\.min\.js(?:\.map)?$/,
    ) do
        build_javascript_bundle
    end

    trap("INT") do
        listener.stop
        exit 0
    end

    begin
        listener.start
        sleep
    rescue ThreadError
        # The listener stops when the process is interrupted.
    end
end

task :version => ["docs/_data/theme.yml", "README.md", "docs/_pages/home.md"]

file "docs/_data/theme.yml" => "package.json" do |task_file|
    theme = { "version" => package_json["version"] }

    File.open(task_file.name, "w") do |file|
        file.puts "# For use with in-page templates."
        file.puts theme.to_yaml
    end
end

file "README.md" => "package.json" do |task_file|
    content = File.read(task_file.name)
    content = content.gsub(/(mmistakes\/minimal-mistakes@)[\d.]+/, "\\1#{package_json["version"]}")
    File.write(task_file.name, content)
end

file "docs/_pages/home.md" => "package.json" do |task_file|
    content = File.read(task_file.name)
    content = content.gsub(/(\breleases\/tag\/|Latest release v)[\d.]+/, "\\1#{package_json["version"]}")
    File.write(task_file.name, content)
end

task :gem do
    sh "gem build minimal-mistakes-jekyll.gemspec"
end
