import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, {
    allowDangerousHtml: false
  })
  .use(rehypeStringify);

/**
 * @function
 * @param {string} markdown
 * @returns {string}
 */
export default function markdownToHtml(markdown) {
  return String(processor.processSync(markdown));
}
