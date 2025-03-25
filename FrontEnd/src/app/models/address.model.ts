export interface Address {
    id?: number;
    client?: { id: number };
    clientId: number;
    address: string;
    number: string;
    complement?: string;
    postalCode?: string;
    city?: string;
    state?: string;
    country?: string;
}