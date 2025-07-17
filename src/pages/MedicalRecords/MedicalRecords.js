import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'react-datepicker/dist/react-datepicker-min.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './MedicalRecords.module.scss';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import { deletePatient, fetchPatients } from '~/thunks/patients';
import { ModalPatient } from './Modals';
import ModalDelete from '~/components/Modal/ModalDelete';

const cx = classNames.bind(styles);

function MedicalRecords() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [patient, setPatient] = useState(null);
    const [reloadFlag, setReloadFlag] = useState(1);

    const dispatch = useDispatch();
    const { list: searchResult } = useSelector((state) => state.patients);

    useEffect(() => {
        const request = {
            id: null,
            name: '',
            department: '',
            roomNo: '',
        };

        dispatch(fetchPatients(request));
    }, [dispatch, reloadFlag]);

    const renderSchedule = (row) => (
        <>
            <Tippy content="Xem lịch khám" placement="bottom">
                <Link className={cx('btn-action')}>
                    <FontAwesomeIcon icon={faEye} />
                </Link>
            </Tippy>
            <Tippy content="Thêm lịch khám" placement="bottom">
                <Link className={cx('btn-action', 'text-primary')}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </Tippy>
        </>
    );

    const renderActions = (row) => (
        <>
            <Tippy content="Xem thông tin" placement="bottom">
                <Link className={cx('btn-action')} to={`/record/${row.id}`}>
                    <FontAwesomeIcon icon={faEye} />
                </Link>
            </Tippy>
            <Tippy content="Chỉnh sửa" placement="bottom">
                <Link className={cx('btn-action', 'text-warning')} onClick={() => handleOpenEditModal(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
            </Tippy>
            <Tippy content="Xóa" placement="bottom">
                <Link className={cx('btn-action', 'text-danger')} onClick={() => handleOpenDeleteModal(row)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </Link>
            </Tippy>
        </>
    );

    const columns = [
        { accessor: 'STT', label: 'STT', width: '5%', className: cx('text-center') },
        { accessor: 'name', label: 'Tên bệnh nhân', width: '20%' },
        { accessor: 'dateOfBirth', label: 'Ngày sinh', width: '15%', className: cx('text-center') },
        { accessor: 'phone', label: 'Số điện thoại', width: '12%' },
        { accessor: 'address', label: 'Địa chỉ', width: '28%' },
        {
            accessor: 'schedules',
            label: 'Lịch khám',
            width: '10%',
            className: cx('text-center'),
            render: renderSchedule,
        },
        {
            accessor: 'actions',
            label: 'Hành động',
            width: '10%',
            className: cx('text-center'),
            render: renderActions,
        },
    ];

    const handleOpenAddModal = () => {
        setPatient(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (row) => {
        setPatient(row);
        setIsModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsModalOpen(false);
        setReloadFlag((prev) => prev + 1);
    };

    const handleOpenDeleteModal = (row) => {
        setPatient(row);
        setIsModalDeleteOpen(true);
    };

    const handleDelete = () => {
        if (patient) {
            dispatch(deletePatient({ id: patient.id }));
        }
        setReloadFlag((prev) => prev + 1);
    };

    const handleCloseDeleteModal = () => {
        setIsModalDeleteOpen(false);
        setReloadFlag((prev) => prev + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Quản lý hồ sơ bệnh nhân</h2>
            </div>
            <DataTable
                columns={columns}
                data={searchResult}
                rowsPerPage={10}
                children={
                    <Button
                        className={cx('btn-primary')}
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={handleOpenAddModal}
                    >
                        Tạo hồ sơ bệnh nhân
                    </Button>
                }
            />
            <ModalPatient
                className={cx('modal-patient')}
                title={patient ? 'Cập nhật hồ sơ bệnh án' : 'Thêm mới hồ sơ bệnh án'}
                size="modal-md"
                visible={isModalOpen}
                data={patient || null}
                onClose={handleCloseEditModal}
            />
            <ModalDelete
                content={`Thông tin bệnh nhân ${patient?.name}?` ?? ''}
                isOpen={isModalDeleteOpen}
                onClose={handleCloseDeleteModal}
                onClick={handleDelete}
            />
        </div>
    );
}

export default MedicalRecords;
