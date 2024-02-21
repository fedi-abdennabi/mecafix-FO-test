export type DefaultSubCategories = {
    id?: number;
    subCategoryName?: string;
    default_category_id?:number;
};

export type DefaultSubCategoriesListResult = {
    data: DefaultSubCategories[];
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
