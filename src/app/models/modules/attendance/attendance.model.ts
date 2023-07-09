export class Roster {
    created_at!: any;
    updated_at!: any;
    roster_code!: number;
    roster_name!: string;
    from_date!: any;
    to_date!: any;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}

export class RosterShift {
    created_at!: any;
    updated_at!: any;
    roster!: string;
    shift_name!: string;
    start_time!: any;
    end_time!: any;
}

export class RosterBatch {
    created_at!: any;
    updated_at!: any;
    roster!: string;
    batch_name!: string;
    batch_symbol!: string;
}

export class RosterPersonnel {
    created_at!: any;
    updated_at!: any;
    roster!: string;
    personnel!: {
        id: string;
        data: {
            staff_code: string;
            full_name: string;
            staff_role: string;
        };
    };
    batch!:{
        id: string;
        data: {
            batch_name: string;
            batch_symbol: string;        
        };
    };
}

export class RosterSheet {
    created_at!: any;
    updated_at!: any;
    roster!: string;
    shift!: string;
    date!: any;
    batch!:{
        id: string;
        data: {
            batch_name: string;
            batch_symbol: string;        
        };
    };
}

export class Attendance {
    created_at!: any;
    updated_at!: any;
    attendance_code!: number;
    attendance_name!: string;
    from_date!: any;
    to_date!: any;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    };
}