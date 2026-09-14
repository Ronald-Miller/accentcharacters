import { AUTHOR, dates, site } from "@/lib/site";

/** Reusable E-E-A-T schema.org fragments. */

export function authorPerson() {
  return {
    "@type": "Person",
    "@id": `${site.url}/author/${AUTHOR.slug}#person`,
    name: AUTHOR.name,
    url: `${site.url}/author/${AUTHOR.slug}`,
    image: `${site.url}${AUTHOR.avatar}`,
    jobTitle: AUTHOR.role,
    description: AUTHOR.shortBio,
    knowsAbout: AUTHOR.expertise,
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function organization() {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    founder: { "@id": `${site.url}/author/${AUTHOR.slug}#person` },
  };
}

export function webPage(opts: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    about: {
      "@type": "Thing",
      name: "Accent letters and diacritical marks",
    },
    author: { "@id": `${site.url}/author/${AUTHOR.slug}#person` },
    reviewedBy: { "@id": `${site.url}/author/${AUTHOR.slug}#person` },
    datePublished: dates.published,
    dateModified: dates.modified,
  };
}
