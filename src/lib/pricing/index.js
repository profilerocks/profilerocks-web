import free from "#shared/free.json";
import pricing from "#shared/pricing.json";

for (const product in pricing) {
  // @ts-expect-error: free is not defined in pricing, and it should be the first key.
  pricing[product] = { free: free[product], ...pricing[product] };
}

export default pricing;
