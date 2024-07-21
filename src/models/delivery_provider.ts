export interface DeliveryProvider {
    id: number,
    provider_name: string,
    country_operate:string[],
    api_address?: string,
    api_key?: string,
    api_password?: string,
    support_email?: string,
    comments?: string,
    actions?: string
}