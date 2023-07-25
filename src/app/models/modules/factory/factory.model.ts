export class FactoryItem {
    created_at!: any;
    updated_at!: any;
    item_code!: number;
    item_name!: string;
    item_type!: string;
    price!: number;
    description!: string;
}

export class FactoryOrder {
    created_at!: any;
    updated_at!: any;
    order_code!: number;
    order_date!: any;
    order_status!: string;
    total_price!: number;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class FactoryOrderItem {
    created_at!: any;
    updated_at!: any;
    item_number!: number;
    quantity!: number;
    order!: string;
    factory_item!: {
        id: string;
        data: {
            item_code: string;
            item_name: string;
            price: number;
        }
    };
}
