export class UserBasicProfile {
    created_at!: any;
    updated_at!: any;
    terms_acceptance_status!: boolean;
    full_name!: string;
    date_of_birth!: any;
    ni_number!: string;
    email!: string;
    phone!: string;
    address!: string;
}

export class UserAdditionalProfile {
    created_at!: any;
    updated_at!: any;
    nationality!: string;
    religion!: string;
    marital_status!: string;
    e_contact_name!: string;
    e_contact_number!: string;
}

export class UserAvailabilty {
    created_at!: any;
    updated_at!: any;
    contract_type!: string;
    availability!: {
        monday: {
            available: boolean; time_from: any; time_to: any;
        };
        tuesday: {
            available: boolean; time_from: any; time_to: any;
        };
        wednesday: {
            available: boolean; time_from: any; time_to: any;
        };
        thursday: {
            available: boolean; time_from: any; time_to: any;
        };
        friday: {
            available: boolean; time_from: any; time_to: any;
        };
        saturday: {
            available: boolean; time_from: any; time_to: any;
        };
        sunday: {
            available: boolean; time_from: any; time_to: any;
        };
    }
}

export class UserRole {
    created_at!: any;
    updated_at!: any;
    full_name!: string;
    staff_id!: string;
    staff_role!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    }
}