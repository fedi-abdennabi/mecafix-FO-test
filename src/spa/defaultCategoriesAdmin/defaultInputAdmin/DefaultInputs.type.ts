export type DefaultInput = {
    id?: number;
    inputName?: string;
    inputType?: string;
    inputValue?:string | null; 
    inputOrder?: number | null ; 
    subCategoryId?: number,
    folder_id?:number,
    options?:{ labal: string; value: string; }[], 
    helper?:string | null,     
    sub_category_default_id?:number, 
    label?:string,
    required?:boolean,
    display?:boolean,
    principalImage?:boolean
};

export type DefaultInputListResult = {
    data: DefaultInput[];
};
