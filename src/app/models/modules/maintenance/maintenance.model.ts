export class Issue {
    created_at!: any;
    updated_at!: any;
    issue_code!: string;
    issue_subject!: string;
    issue_type!: string;
    issue_date!: string;
    reported_to!: string;
    description!: string;
    issue_status!: string;
    comments!: string;
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

export class Service {
    created_at!: any;
    updated_at!: any;
    service_code!: string;
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
