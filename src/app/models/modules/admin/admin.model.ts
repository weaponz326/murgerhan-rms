export class Branch {
    created_at!: any;
    updated_at!: any;
    branch_name!: string;
    location!: string;
    special_features!: string;
    manager!: {
        staff_id: string;
        full_name: string;
    };
    number_of_staff!: number;
}
