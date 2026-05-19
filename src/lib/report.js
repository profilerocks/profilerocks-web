import reportCategories from "#shared/report.json";

/**
 * @typedef ReportCategory
 * @property {string} title
 * @property {string} [description]
 */

/**
 * @type {Record<string,ReportCategory>}
 */
export const reportCategoriesData = {
  "abuse": {
    title: "Abuse",
    description: "Cruelty, exploitation, or promotion of harm against people or other living beings."
  },
  "age-restricted": {
    title: "Age restricted content",
    description: "Including, but not limited to, pornography."
  },
  "confusing": {
    title: "Confusing links",
    description: "Links that are intentionally confusing, misleading, or fraudulent."
  },
  "fraud": {
    title: "Scam or fraud",
    description: "Deceiving users for financial gain."
  },
  "harassment": {
    title: "Harassment",
    description: "Targeted insults or hate speech."
  },
  "illegal": {
    title: "Illegal goods or services",
    description: "Sale of drugs, weapons, or regulated items without permits."
  },
  "impersonation": {
    title: "Impersonation",
    description: "Falsely claiming to be another person or entity."
  },
  "ip-infringement": {
    title: "Intellectual property infringement",
    description: "Posting content you do not own or have rights to."
  },
  "misinformation": {
    title: "Misinformation",
    description: "Spreading false or misleading information that could cause harm or confusion."
  },
  "phishing": {
    title: "Phishing",
    description: "Attempting to steal user credentials or data."
  },
  "self-harm": {
    title: "Self-harm",
    description: "Content that encourages or promotes self-injury or suicide."
  },
  "violent": {
    title: "Violent content",
    description: "Promoting violence or graphic depictions of harm."
  }
};

const reportCategoriesSet = new Set(reportCategories);

for (const category in reportCategoriesData) {
  if (!reportCategoriesSet.has(category)) {
    delete reportCategoriesData[category];
  }
}

for (const category of reportCategories) {
  if (category !== "csam" && category !== "other" && !Object.hasOwn(reportCategoriesData, category)) {
    reportCategoriesData[category] = {
      title: category[0].toUpperCase() + category.substring(1).toLowerCase()
    };
  }
}

Object.freeze(reportCategoriesData);

export const reportCategoriesDataEntries = Object.freeze(Object.entries(reportCategoriesData));
