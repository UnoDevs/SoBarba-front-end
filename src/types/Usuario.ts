export interface Usuario {
    id: number;
    name: string;
    description: string;
    email: string;
    phone: string;
    active: boolean;
    document: string;
    personTypes: ("CUSTOMER" | "EMPLOYEE" | "SUPPLIER" | "OWNER")[];
}
