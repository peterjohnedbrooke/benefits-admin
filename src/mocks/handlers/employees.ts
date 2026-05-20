import {http, HttpResponse} from 'msw';
import { employees } from '../data/employees';

export const employeesHandlers = [
    http.get('/api/employees', () => {
        return HttpResponse.json(employees);
    }),

    http.get('/api/employees/:id', ({params}) => {
        const employee = employees.find((e) => e.id === params.id);
        if (!employee) {
            return new HttpResponse({ error: 'Employee not found' }, { status: 404 });
        }
        return HttpResponse.json(employee);
    }),
];