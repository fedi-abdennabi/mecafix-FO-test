import { SubCategorys } from "../Categories/SubCategories/subCategory.type";

export type Categories = {
  id: number;
  categoryName?: string;
  folderId?:number;
  subCategorys?:SubCategorys[]
};

export type CategoriesListResult = {
  data: Categories[];
  current_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  total: number;
  last_page: number;
  per_page: number;
};
