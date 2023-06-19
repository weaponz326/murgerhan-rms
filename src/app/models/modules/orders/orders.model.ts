export class Product {
    created_at!: any;
    updated_at!: any;
    product_code!: string;
    product_name!: string;
    product_type!: string;
    price!: number;
    description!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class Order {
    created_at!: any;
    updated_at!: any;
    order_code!: string;
    order_date!: any;
    order_status!: string;
    delivery_date!: any;
    total_price!: number;
    vendor!: {
        id: string;
        data: {
            vendor_id: string;
            vendor_name: string;
        }
    };
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class OrderItem {
    created_at!: any;
    updated_at!: any;
    item_number!: number;
    quantity!: number;
    order!: string;
    product!: {
        id: string;
        data: {
            product_code: string;
            product_name: string;
            price: number;
        }
    };
}
