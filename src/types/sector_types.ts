export type Department = {
    departmentName: string,
    _id?: string
};

export type Sector = {
    _id?: string,
    sectorName: string,
    departments: Department[],
    visibleToPublic: boolean
};