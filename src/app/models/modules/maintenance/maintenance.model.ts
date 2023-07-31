export class Issue {
    created_at!: any;
    updated_at!: any;
    issue_code!: number;
    issue_subject!: string;
    issue_type!: string;
    issue_date!: string;
    description!: string;
    issue_status!: string;
    comments!: string;
    reported_to!: {
        id: string;
        data: {
            staff_code: string;
            full_name: string;
            staff_role: string;
        }
    };
    system!: {
        id: string;
        data: {
            system_code: string;
            system_name: string;
        }
    }
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class IssueImage {
    created_at!: any;
    updated_at!: any;
    issue!: string;
    url!: string;
}

export class Service {
    created_at!: any;
    updated_at!: any;
    service_code!: number;
    service_subject!: string;
    service_type!: string;
    cost!: number;
    description!: string;
    service_status!: string;
    date_from!: any;
    date_to!: any;
    comments!: string;
    contractor!: {
        id: string;
        data: {
            contractor_code: string;
            contractor_name: string;
        }
    };
    system!: {
        id: string;
        data: {
            system_code: string;
            system_name: string;
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

export class Contractor {
    created_at!: any;
    updated_at!: any;
    contractor_code!: number;
    contractor_name!: string;
    contractor_type!: string;
    main_service!: string;
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

export class System {
    created_at!: any;
    updated_at!: any;
    system_code!: number;
    system_name!: string;
    system_type!: string;
    location!: string;
    condition!: string;
    description!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class SystemImage {
    created_at!: any;
    updated_at!: any;
    system!: string;
    image_category!: string;
    url!: string;
}