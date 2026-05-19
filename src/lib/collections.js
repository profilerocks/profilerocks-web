import { getCollection } from "astro:content";

/**
 * @type {any[]}
 */
export const blogCollection = await getCollection("blog");
