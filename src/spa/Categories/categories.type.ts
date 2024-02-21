import { SubCategorys } from "./SubCategories/subCategory.type";

export type Categorys={ 
    id: number;
    categoryName?: string;
    folderId?:number;
    sub_category?:SubCategorys[]
  }
  export type CategorysListResult = {
    data: Categorys[];
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
  
 