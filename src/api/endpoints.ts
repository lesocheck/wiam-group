const BASE_URL = 'https://dummyjson.com';

export const API = {
  CATEGORY_LIST: `${BASE_URL}/products/category-list`,
  SUBMIT_LOAN: `${BASE_URL}/products/add`,
} as const;
