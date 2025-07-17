import { useMemo } from 'react';

const useTableData = ({ data, columns, search, sortField, sortOrder, currentPage, rowsPerPage }) => {
    const processedData = useMemo(() => {
        let result = [...data];

        //filter
        if (search) {
            result = result.filter((row) =>
                columns.some((col) =>
                    row[col.accessor]?.toString().toLowerCase().includes(search.trim().toLowerCase()),
                ),
            );
        }

        //sort
        if (sortField) {
            result.sort((a, b) => {
                const valA = a[sortField];
                const valB = b[sortField];

                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        //pagination
        const total = result.length;
        const totalPages = Math.ceil(total / rowsPerPage);
        const paginated = result.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

        return {
            paginated,
            totalPages,
            totalRows: total,
        };
    }, [data, columns, search, sortField, sortOrder, currentPage, rowsPerPage]);

    return processedData;
};

export default useTableData;
