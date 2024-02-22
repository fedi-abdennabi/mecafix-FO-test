export type Input = {
    id?: number;
    inputName?: string;
    inputType?: string;
    inputValue?:string | null; 
    inputOrder?: number | null ; 
    subCategoryId?: number,
    folder_id?:number,
    options?:{ label: string; value: string; }[], 
    helper?:string | null,     
    sub_category_default_id?:number, 
    label?:string,
    required?:boolean,
    display?:boolean,
    principalImage?:boolean
};

export type InputListResult = {
    data: Input[];
};