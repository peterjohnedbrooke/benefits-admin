export type Department = 'Engineering' | 'People' | 'Sales' | 'Marketing';

export type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    department: Department;
    startDate: string; // ISO date string
}

export type BenefitCategory = 'Health' | 'Finance' | 'Lifestyle' | 'Tech';

export type Benefit = {
    id: string;
    name: string;
    description: string; 
    category: BenefitCategory;
    monthlyCost: number; // Cost in GBP
}

export type EnrolmentStatus = 'active' | 'inactive';

export type Enrolment = {
    employeeId: string;
    benefitId: string;
    status: EnrolmentStatus;
    enrolledAt: string | null; // ISO date string
}

export type DashboardStats = {
    totalEmployees: number;
    activeEnrolments: number;
    monthlyCostGbp: number;
}
