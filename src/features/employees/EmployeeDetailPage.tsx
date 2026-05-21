import { useParams } from 'react-router-dom';

const EmployeeDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1 className="text-2xl font-semibold text-slate-900">Employee detail</h1>
            <p className="mt-2 text-slate-600">Viewing employee: {id}</p>
        </div>
    );
};

export default EmployeeDetailPage;
