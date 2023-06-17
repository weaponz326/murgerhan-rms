export class Branch {
    created_at!: any;
    updated_at!: any;
    branch_name!: string;
    location!: string;
    special_features!: string;
    number_of_staff!: number;
    manager!: {
        id: string;
        data: {
            staff_id: string;
            full_name: string;
        }
    };
}

export class Log {
    log_code!: string;
    created_at!: any;
    updated_at!: any;
    activity!: string;
    previous_entry!: string;
    inputed_entry!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
    editor!: {
        id: string;
        data: {
            staff_id: string;
            full_name: string;
        }
    };
}
