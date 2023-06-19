export class Unit {
    created_at!: any;
    updated_at!: any;
    unit_code!: string;
    unit_name!: string;
    unit_type!: string;
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

export class Incident {
    created_at!: any;
    updated_at!: any;
    incident_code!: string;
    incident_subject!: string;
    incident_date!: any;
    incident_status!: string;
    incident_type!: string;
    description!: string;
    resolution!: string;
    comments!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}
