// import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import { defineConfig, envField, fontProviders } from "astro/config";
import icon from "astro-icon";
import license from "rollup-plugin-license";
import { loadEnv } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import redirects from "./shared/redirects.json";

const DEFAULT_HREF_APP = "https://app.profile.rocks";
const OUT_DIR = "./dist";

const {
  HREF_APP = DEFAULT_HREF_APP,
  HREF_SETTINGS = "https://app.profile.rocks/u/settings",
  SITE = "https://www.profile.rocks"
} = loadEnv(process.env.NODE_ENV || "production", process.cwd());

/**
 * @type {Record<string,string>}
 */
const REDIRECT_PATHS = Object.freeze({
  about: "/i/about",
  app: HREF_APP,
  blog: "/i/blog",
  faq: "/i/faq",
  help: "/i/help",
  pricing: "/i/pricing",
  privacy: "/i/privacy",
  settings: HREF_SETTINGS,
  terms: "/i/terms"
});

for (const path in redirects) {
  // @ts-expect-error: if `redirects[path]` is null, it will be deleted in the next step.
  redirects[path] = REDIRECT_PATHS[redirects[path]];
  // @ts-expect-error: `redirects[path]` is deleted if null.
  if (!redirects[path]) {
    // @ts-expect-error: `redirects[path]` is deleted.
    delete redirects[path];
  }
}

const fontSource = fontProviders.fontsource();

// https://astro.build/config
export default defineConfig({
  experimental: {
    clientPrerender: true
  },

  site: SITE,

  /**
   * Disable redirects for now.
   * @ts-expect-error: `redirects` is modified in the loop above.
   */
  // redirects,

  output: "static",

  // TODO: add cloudflare adapter and fix MIME.
  /*adapter: cloudflare({
    imageService: "compile"
  }),*/

  integrations: [
    icon(),
    playformCompress({
      CSS: false,
      HTML: true,
      Image: false,
      JavaScript: false,
      JSON: false,
      SVG: false
    }),
    sitemap({
      filter: page => !page.includes("legal-notice") && !page.includes("privacy")
    })
  ],

  root: ".",

  srcDir: "./src",

  publicDir: "./public",

  outDir: OUT_DIR,

  compressHTML: true,

  security: {
    checkOrigin: true,
    /**
     * Astro by default only sets script-src and style-src in the HTML.
     * Rest of directives are set in the `public/_headers` file.
     */
    csp: {
      scriptDirective: {
        resources: ["'self'", "https://challenges.cloudflare.com"]
      }
    }
  },

  build: {
    inlineStylesheets: "never"
  },

  vite: {
    plugins: [
      license({
        sourcemap: false,
        thirdParty: {
          includePrivate: true,
          includeSelf: true,
          multipleVersions: true,
          output: {
            file: OUT_DIR + "/LICENSES/DEPENDENCIES.txt",
            encoding: "utf-8"
          }
        }
      }),
      viteStaticCopy({
        targets: [
          {
            src: "ICON-LICENSES.md",
            dest: "LICENSES",
            rename: "ICONS.md"
          }
        ]
      })
    ]
  },

  env: {
    schema: {
      CONTROLLER: envField.string({
        context: "client",
        access: "public"
      }),
      LEGAL_DATA: envField.string({
        context: "client",
        access: "public"
      }),
      HREF_APP: envField.string({
        context: "client",
        access: "public",
        default: DEFAULT_HREF_APP,
        url: true
      }),
      HREF_PROFILE: envField.string({
        context: "client",
        access: "public",
        default: "https://profile.rocks",
        url: true
      }),
      HREF_PROFILE_CREATE: envField.string({
        context: "client",
        access: "public",
        default: "https://app.profile.rocks/p",
        url: true
      }),
      HREF_PROFILE_CREATE_PREMIUM: envField.string({
        context: "client",
        access: "public",
        default: "https://app.profile.rocks/p?premium=1",
        url: true
      }),
      PLATFORM_NAME: envField.string({ context: "client", access: "public", default: "profile.rocks" }),
      PLATFORM_DESCRIPTION: envField.string({
        context: "client",
        access: "public",
        default: "The Map of Your Online Presence"
      }),
      SITE: envField.string({
        context: "client",
        access: "public",
        default: SITE,
        url: true
      })
    },
    validateSecrets: true
  },

  fonts: [
    {
      provider: fontSource,
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500],
      subsets: ["latin"]
    },
    {
      provider: fontSource,
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: [400],
      subsets: ["latin"]
    }
  ]
});
