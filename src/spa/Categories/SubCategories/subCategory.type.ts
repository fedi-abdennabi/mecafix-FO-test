export type SubCategorys = {
    id: number;
    subCategoryName: string;
    categoryId?:number;
    done:boolean; 
    display:boolean;
};

export type SubCategorysListResult = {
    data: SubCategorys[];
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