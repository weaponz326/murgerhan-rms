export class UserBasicProfile {
    created_at!: any;
    updated_at!: any;
    full_name!: string;
    date_of_birth!: any;
    ni_number!: string;
    email!: string;
    phone!: string;
    address!: string;
    profile_photo!: string;
    terms_acceptance_status!: boolean;
    terms_file!: string;
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
    staff_code!: string;
    staff_role!: string;
    branch!: {
        id: string;
        data: {
            branch_name: string;
            location: string;
        }
    }
}

export class ThirdPartyRole {
    created_at!: any;
    updated_at!: any;
    email!: string;
    full_name!: string;
    user_code!: string;
    company_type!: string;
    company!: {
        id: string;
        data: {
            company_code: string;
            company_name: string;
            phone: string;
            email: string;
        }
    }
}

export class Invitation {
    created_at!: any;
    updated_at!: any;
    invitation_code!: number;
    invitation_date!: any;
    invitee_name!: string;
    invitee_email!: string;
    invitation_type!: string;
    invitation_status!: string;
    email_subject!: string;
    email_message!: string;
    terms_file_url!: string;
    date_accepted!: any;
    account_accepted_id!: string;
}

export class InvitationsConfiguration {
    created_at!: any;
    updated_at!: any;
    staff_email_subject!: string;
    staff_email_message!: string;
    third_party_email_subject!: string;
    third_party_email_message!: string;
}