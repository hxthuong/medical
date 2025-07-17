import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { useTableData } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './DataTable.module.scss';
import Search from '~/layouts/components/Search';
import { pageNumber } from './pageNumber';

const cx = classNames.bind(styles);

const DataTable = ({ data, columns, rowsPerPage = 5, scroll = false, hasSearch = true, children }) => {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const inputRef = useRef();

    const { paginated, totalPages } = useTableData({
        data,
        columns,
        search,
        sortField,
        sortOrder,
        currentPage,
        rowsPerPage,
    });

    if (columns) {
        columns = columns.map((col) => ({
            ...col,
            visible: col.visible !== false,
        }));
    }

    //phân trang
    const pageNumbers = pageNumber(3, currentPage, totalPages);

    const handleSort = (acessor) => {
        if (sortField === acessor) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(acessor);
            setSortOrder('asc');
        }
    };

    const handleClear = () => {
        setSearch('');
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearch(searchValue);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search-group')}>
                {hasSearch && (
                    <Search inputRef={inputRef} searchValue={search} onChange={handleChange} onClear={handleClear} />
                )}
                {children}
            </div>
            <div className={cx('content')}>
                <div className={cx('table-wrapper')}>
                    <table className={cx('table')}>
                        <thead className={cx('table-header', scroll ? 'scroll-header' : '')}>
                            <tr>
                                {columns.map(
                                    (col) =>
                                        col.visible && (
                                            <th
                                                key={col.accessor}
                                                onClick={() => handleSort(col.accessor)}
                                                style={{ cursor: 'pointer' }}
                                                width={col.width}
                                                className={cx(col.className)}
                                            >
                                                {col.label}
                                                {sortField === col.accessor ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                                            </th>
                                        ),
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.length > 0 &&
                                paginated.map((row, idx) => (
                                    <tr key={idx}>
                                        {columns.map(
                                            (col) =>
                                                col.visible && (
                                                    <td key={col.accessor} className={col.className}>
                                                        {col.render ? col.render(row) : row[col.accessor]}
                                                    </td>
                                                ),
                                        )}
                                    </tr>
                                ))}
                            {(!data || (data && data.length === 0)) && (
                                <tr>
                                    <td className={cx('no-data')} colSpan={columns.length}>
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={cx('pagination')}>
                    <button
                        className={cx('btn-pagination')}
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1 || totalPages === 1}
                    >
                        <FontAwesomeIcon icon={faAnglesLeft} />
                    </button>

                    <button
                        className={cx('btn-pagination')}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || totalPages === 1}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    {/* {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            className={cx('btn-pagination', currentPage === i + 1 ? 'active' : '')}
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))} */}

                    {pageNumbers.map((page) => (
                        <button
                            className={cx('btn-pagination', currentPage === page ? 'active' : '')}
                            key={page}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className={cx('btn-pagination')}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 1}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>

                    <button
                        className={cx('btn-pagination')}
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages || totalPages === 1}
                    >
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
