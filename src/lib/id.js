import { regexBase64Url } from "#src/lib/regex";

/**
 * @function isBase64UrlIdValid
 * @param {string} id
 * @returns {boolean}
 */
export function isBase64UrlIdValid(id) {
  return id.length === 24 && regexBase64Url.test(id);
}
