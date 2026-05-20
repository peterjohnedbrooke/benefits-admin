import {http, HttpResponse} from 'msw';
import { benefits } from '../data/benefits';

export const benefitsHandlers = [
    http.get('/api/benefits', () => {
        return HttpResponse.json(benefits);
    }),
];