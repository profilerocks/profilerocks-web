import { HREF_PROFILE } from "astro:env/client";

/**
 * @async
 * @function
 * @param {string} profilePublicId
 * @returns {Promise<Response>}
 */
export async function requestProfileDataForWebReport(profilePublicId) {
  return await fetch(HREF_PROFILE + "/s/report/profile/" + profilePublicId + "/data", {
    method: "POST"
  });
}

/**
 * @async
 * @function
 * @param {FormData} data
 * @returns {Promise<Response>}
 */
export async function requestProfileReportCreation(data) {
  /**
   * Send `application/x-www-form-urlencoded` instead of `multipart/form-data` because it is lighter.
   */
  const params = new URLSearchParams();

  for (const [key, value] of data) {
    if (typeof value === "string") {
      params.append(key, value);
    }
  }

  return await fetch(HREF_PROFILE + "/s/report/profile", {
    body: params,
    method: "POST"
  });
}
