import type { Benefit } from '@/lib/types';

export const benefits: Benefit[] = [
    {
        id: 'ben-bupa',
        name: 'Bupa Healthcare',
        description: 'Private medical insurance covering GP, specialist, and hospital care.',
        category: 'Health',
        monthlyCost: 85,
    },
    {
        id: 'ben-eap',
        name: 'Employee Assistance Programme',
        description: '24/7 confidential support for mental health, legal, and financial concerns.',
        category: 'Health',
        monthlyCost: 8,
    },
    {
        id: 'ben-pension',
        name: 'Pension Top-Up',
        description: 'Salary sacrifice scheme to boost pension contributions tax-efficiently.',
        category: 'Finance',
        monthlyCost: 50,
    },
    {
        id: 'ben-life',
        name: 'Life Assurance',
        description: '4x salary lump-sum cover paid to nominated beneficiaries.',
        category: 'Finance',
        monthlyCost: 12,
    },
    {
        id: 'ben-cycle',
        name: 'Cycle to Work',
        description: 'Tax-free bike purchase scheme up to £3,000.',
        category: 'Tech',
        monthlyCost: 35,
    },
    {
        id: 'ben-tech',
        name: 'Tech Salary Sacrifice',
        description: 'Spread the cost of laptops, phones, and home office kit.',
        category: 'Tech',
        monthlyCost: 45,
    },
    {
        id: 'ben-gym',
        name: 'Gym Membership',
        description: 'Discounted nationwide gym and studio access.',
        category: 'Lifestyle',
        monthlyCost: 30,
    },
    {
        id: 'ben-birthday',
        name: 'Birthday Off',
        description: 'An extra day of paid leave on your birthday each year.',
        category: 'Lifestyle',
        monthlyCost: 0,
    },
    {
        id: 'ben-wellness',
        name: 'Wellness Days',
        description: 'Four additional wellbeing days per year, no questions asked.',
        category: 'Lifestyle',
        monthlyCost: 0,
    },
];
