import profileNameIdAttributes from "#shared/profile.json";
import redirects from "#shared/redirects.json";

const regexProfile = new RegExp(profileNameIdAttributes.regex);

/**
 * @function isProfileNameValid
 * @param {string} value
 * @returns {boolean}
 */
export function isProfileNameIdValid(value) {
  return (
    value.length >= profileNameIdAttributes.minLength &&
    value.length <= profileNameIdAttributes.maxLength &&
    regexProfile.test(value) &&
    !(value in redirects)
  );
}

export default isProfileNameIdValid;
