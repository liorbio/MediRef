export type AbbreviatedItem = { name: string, cat: string };
export type Item = {
    name: string,
    cat: string,
    sector: string,
    department: string,
    catType: "מקט רגיל" | "מקט ערכה",
    description: string,
    imageLink?: string,
    models?: AbbreviatedItem[],
    accessories?: AbbreviatedItem[],
    consumables?: AbbreviatedItem[],
    belongsToKits?: AbbreviatedItem[],
    similarItems?: AbbreviatedItem[],
    kitItem?: AbbreviatedItem[]
};