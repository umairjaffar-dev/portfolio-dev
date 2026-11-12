/** Pulls the address out of a `mailto:` href (ignores any ?subject=… part). */
export const emailFromHref = (href: string) =>
  decodeURIComponent(href.replace(/^mailto:/, "").split("?")[0]);
