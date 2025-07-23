import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'react-datepicker/dist/react-datepicker-min.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './MedicalRecords.module.scss';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import { deletePatient, fetchPatients } from '~/thunks/patients';
import { ModalBooking, ModalPatient } from './Modals';
import ModalDelete from '~/components/Modal/ModalDelete';
import { selectPatient } from '~/features/records/recordsSlice';
import { fetchRecords } from '~/thunks/records';
import { format } from 'date-fns';
import words from '~/assets/templates/words';
import { generateDocFromTemplate } from '~/utils/docRequest';

const cx = classNames.bind(styles);

function MedicalRecords() {
    const [isModalBookingOpen, setIsModalBookingOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(1);

    const dispatch = useDispatch();
    const { list: searchResult } = useSelector((state) => state.patients);
    const patient = useSelector((state) => state.records.selectPatient);

    useEffect(() => {
        const request = {
            id: null,
            name: '',
            department: '',
            roomNo: '',
        };

        dispatch(fetchPatients(request));
    }, [dispatch, reloadFlag]);

    const renderActions = (row) => (
        <>
            <Tippy content="Xem thông tin" placement="bottom">
                <Link className={cx('btn-action')} to={`/record/${row.id}`}>
                    <FontAwesomeIcon icon={faEye} />
                </Link>
            </Tippy>
            <Tippy content="Thêm lịch khám" placement="bottom">
                <Link className={cx('btn-action', 'text-primary')} onClick={() => handleOpenBookingModal(row)}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </Tippy>
            <Tippy content="Tải file" placement="bottom">
                <Link className={cx('btn-action', 'text-success')} onClick={() => handleExport(row)}>
                    <FontAwesomeIcon icon={faDownload} />
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
        { accessor: 'address', label: 'Địa chỉ', width: '33%' },
        {
            accessor: 'actions',
            label: 'Hành động',
            width: '15%',
            className: cx('text-center'),
            render: renderActions,
        },
    ];

    //booking
    const handleOpenBookingModal = (row) => {
        dispatch(selectPatient(row ?? null));
        setIsModalBookingOpen(true);
    };

    //actions
    const handleOpenAddModal = () => {
        dispatch(selectPatient(null));
        setIsModalEditOpen(true);
    };

    const handleOpenEditModal = (row) => {
        dispatch(selectPatient(row ?? null));
        setIsModalEditOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsModalEditOpen(false);
        setReloadFlag((prev) => prev + 1);
    };

    const handleOpenDeleteModal = (row) => {
        dispatch(selectPatient(row ?? null));
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

    const handleExport = async (row) => {
        const records = await dispatch(fetchRecords({ registrationID: row?.id }));

        const data = {
            name: row?.name || '',
            age: row?.age || '',
            male: row?.gender === true || false,
            female: row?.gender !== true || false,
            address: row?.address || '',
            phone: row?.phone || '',
            department: row?.department || '',
            room: row?.roomNo || '',
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            services: () => {
                return (
                    records &&
                    records.payload.length &&
                    records.payload.map((item, index) => {
                        return {
                            row: index + 1,
                            serviceName: item.serviceName,
                            usageCount: item.usageCount,
                            price: `${item.price}đ` || '',
                            total:
                                `${(Number(item.price?.replace('.', '')) * item.usageCount).toLocaleString(
                                    'de-DE',
                                )}đ` || '',
                            requestDate: item.requestDate || '',
                        };
                    })
                );
            },
        };
        const templateFile = words.registrationService;
        const response = await fetch(templateFile);
        const arrayBuffer = await response.arrayBuffer();
        await generateDocFromTemplate(arrayBuffer, data, 'giay-dang-ky.docx');
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
            <ModalBooking
                className={cx('modal-patient')}
                title={'Đặt lịch khám'}
                size="modal-md"
                visible={isModalBookingOpen}
                data={null}
                onClose={() => setIsModalBookingOpen(false)}
            />

            <ModalPatient
                className={cx('modal-patient')}
                title={patient ? 'Cập nhật hồ sơ bệnh án' : 'Thêm mới hồ sơ bệnh án'}
                size="modal-md"
                visible={isModalEditOpen}
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
