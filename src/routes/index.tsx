import { createFileRoute } from "@tanstack/react-router";
import htmlRaw from "../../public/site/index.html?raw";
import cssRaw from "../../public/site/style.css?raw";
import jsRaw from "../../public/site/script.js?raw";

// Inline CSS + JS into the HTML so the document is fully self-contained
// and doesn't depend on the dev server serving /public/site/* paths.
const inlinedHtml = htmlRaw
  .replace(
    '<link rel="stylesheet" href="style.css" />',
    `<style>${cssRaw}</style>`
  )
  .replace(
    '<script src="script.js"></script>',
    `<script>${jsRaw}</script>`
  )
  // Rewrite relative asset paths to absolute /site/assets/ so they resolve from the public folder
  .replace(/(["'(])assets\//g, '$1/site/assets/');

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        new Response(inlinedHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
