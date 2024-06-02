// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "New York Real Estate",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  // pages: [
  //   {
  //     name: "Examples",
  //     pages: [
  //       {name: "Dashboard", path: "/example-dashboard"},
  //       {name: "Report", path: "/example-report"}
  //     ]
  //   }
  // ],

  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // root: "docs", // path to the source root for preview
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  header: `<style>

#observablehq-header a[href] {
  color: inherit;
}

#observablehq-header a[target="_blank"] {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
}

#observablehq-header a[target="_blank"]:hover span {
  text-decoration: underline;
}

#observablehq-header a[target="_blank"]::after {
  content: "\\2197";
}

#observablehq-header a[target="_blank"]:not(:hover, :focus)::after {
  color: var(--theme-foreground-muted);
}

@container not (min-width: 640px) {
  .hide-if-small {
    display: none;
  }
}

</style>
<div style="display: flex; align-items: center; gap: 0.5rem; height: 2.2rem; margin: -1.5rem -2rem 2rem -2rem; padding: 0.5rem 2rem; border-bottom: solid 1px var(--theme-foreground-faintest); font: 500 16px var(--sans-serif);">
  <a href="https://jaan.io/" style="display: flex; align-items: center;">
  <svg width="22" height="22" viewBox="0 0 21.92930030822754 22.68549919128418" fill="currentColor">
    <path d="M5.5 0L7 2H4zM16.5 0L18 2H15zM11 3V0h1v3zM0 7V5h3v1H1zM19 7V5h3v1h-2zM2 12h18v1H2zM0 17v-2h3v1H1zM19 17v-2h3v1h-2zM5.5 22L7 20h-3zM16.5 22L18 20h-3z"/>
    <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M11 8v6h4" stroke="currentColor" stroke-width="1.5" fill="none"/>
  </svg>
  </a>
  <div style="display: flex; flex-grow: 1; justify-content: space-between; align-items: baseline;">
    <a href="/new-york-real-estate">
      <span class="hide-if-small">Visualizing and Mapping </span> New York Real Estate
    </a>
    <span style="display: flex; align-items: baseline; gap: 0.5rem; font-size: 14px;">
      <a target="_blank" href="https://github.com/onefact/new-york-real-estate/"><span>View source</span></a>
    </span>
  </div>
</div>`,
};
