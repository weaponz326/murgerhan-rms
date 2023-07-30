export class Unit {
    created_at!: any;
    updated_at!: any;
    unit_code!: number;
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
    incident_code!: number;
    incident_subject!: string;
    incident_date!: any;
    incident_status!: string;
    incident_type!: string;
    description!: string;
    resolution!: string;
    comments!: string;
    reported_to!: {
        id: string;
        data: {
            staff_code: string;
            full_name: string;
            staff_role: string;
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

export class Task {
    created_at!: any;
    updated_at!: any;
    task_code!: number;
    task_name!: string;
    task_type!: string;
    from_date!: any;
    to_date!: any;
    task_status!: string;
    description!: string;
    occurance!: string;
    frequency!: string;
    primary_assignee!: {
        id: string;
        data: {
            staff_code: string;
            full_name: string;
            staff_role: string;
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

export class TaskItem {
    created_at!: any;
    updated_at!: any;
    item_number!: number;
    task_description!: string;
    item_status!: boolean;
    task!: string;
    unit!: {
        id: string;
        data: {
            unit_code: string;
            unit_name: string;
        }
    };
}

export class TaskImage {
    created_at!: any;
    updated_at!: any;
    task!: string;
    url!: string;
}
