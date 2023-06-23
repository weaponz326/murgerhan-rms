export class StockItem {
    created_at!: any;
    updated_at!: any;
    item_code!: string;
    item_name!: string;
    unit_price!: number;
    stock!: number;
    refill_ordered!: number;
    location!: string;
    container!: string;
    batch_number!: string;
    manufacturing_date!: any;
    expiry_date!: any;
    item_category!: {
        id: string;
        data: {
            category_code: string;
            category_name: string;
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

export class ItemCategory {
    created_at!: any;
    updated_at!: any;
    category_code!: string;
    category_name!: string;
    description!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class CategoryChecklist {
    created_at!: any;
    updated_at!: any;
    category!: string;
    item_number!: number;
    description!: string;
}

export class Supplier {
    created_at!: any;
    updated_at!: any;
    supplier_code!: string;
    supplier_name!: string;
    phone!: string;
    email!: string;
    address!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class SupplierItem {
    created_at!: any;
    updated_at!: any;
    supplier!: string;
    stock_item!: {
        id: string;
        data: {
            item_code: string;
            item_name: string;
            unit_price: string;
        }
    };
}

export class Purchasing {
    created_at!: any;
    updated_at!: any;
    purchasing_code!: string;
    purchasing_date!: any;
    purchasing_status!: string;
    delivery_date!: any;
    total_price!: number;
    supplier!: {
        id: string;
        data: {
            supplier_code: string;
            supplier_name: string;
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

export class PurchasingItem {
    created_at!: any;
    updated_at!: any;
    item_number!: number;
    quantity!: number;
    purchasing!: string;
    stock_item!: {
        id: string;
        data: {
            item_code: string;
            item_name: string;
            unit_price: number;
        }
    };
}

