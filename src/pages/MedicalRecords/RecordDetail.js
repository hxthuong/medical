import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MedicalRecords.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import DataTable from '~/components/DataTable';
import Tippy from '@tippyjs/react';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { ModalBooking } from './Modals';
import ModalDelete from '~/components/Modal/ModalDelete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecord, fetchRecords } from '~/thunks/records';
import { fetchPatients } from '~/thunks/patients';
import { selectPatient, selectService } from '~/features/records/recordsSlice';

const cx = classNames.bind(styles);

function RecordDetail() {
    const navigate = useNavigate();
    const { recordId } = useParams();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(1);

    const { list: patients } = useSelector((state) => state.patients);
    const { list: recordList } = useSelector((state) => state.records);
    const patient = useSelector((state) => state.records.selectPatient);
    const service = useSelector((state) => state.records.selectService);

    useEffect(() => {
        dispatch(fetchPatients({ ID: recordId }));
        dispatch(fetchRecords({ registrationID: recordId }));
    }, [dispatch, recordId, reloadFlag]);

    useEffect(() => {
        if (patients?.length) {
            dispatch(selectPatient(patients[0]));
        }
    }, [patients, dispatch]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleOpenModalAdd = () => {
        setIsEdit(false);
        dispatch(selectService(null));
        setIsModalOpen(true);
    };

    const handleOpenModalEdit = (row) => {
        setIsEdit(true);
        dispatch(selectService(row ?? null));
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setReloadFlag((prev) => prev + 1); // Luôn tăng lên → trigger reload
    };

    const handleOpenModalDelete = (row) => {
        dispatch(selectService(row ?? null));
        setIsModalDeleteOpen(true);
    };

    const handleDelete = () => {
        if (service) {
            dispatch(deleteRecord({ registrationID: service.registrationID, serviceID: service.id }));
        }
        setReloadFlag((prev) => prev + 1);
    };

    const renderStatus = (row) => {
        switch (row.status) {
            case 'scheduled':
                return <span className="badge badge-warning">Đã đến hẹn</span>;
            case 'overdue':
                return <span className="badge badge-danger">Đã quá hẹn</span>;
            case 'completed':
                return <span className="badge badge-success">Đã hoàn thành</span>;
            default:
                return <span className="badge badge-primary">Đã đăng ký</span>;
        }
    };

    const renderActions = (row) => (
        <>
            <Tippy content="Chỉnh sửa" placement="bottom">
                <Link className={cx('btn-action', 'text-warning')} onClick={() => handleOpenModalEdit(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
            </Tippy>
            <Tippy content="Xóa" placement="bottom">
                <Link className={cx('btn-action', 'text-danger')} onClick={() => handleOpenModalDelete(row)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </Link>
            </Tippy>
        </>
    );

    const columns = [
        { accessor: 'STT', label: 'STT', width: '5%', className: cx('text-center') },
        { accessor: 'serviceName', label: 'Tên dịch vụ', width: '40%' },
        { accessor: 'price', label: 'Đơn giá', width: '12%', className: cx('text-center') },
        { accessor: 'usageCount', label: 'Số lần', width: '9%', className: cx('text-center') },
        { accessor: 'requestDate', label: 'Ngày yêu cầu thực hiện', width: '12%', className: cx('text-center') },
        {
            accessor: 'statusName',
            label: 'Trạng thái',
            width: '12%',
            className: cx('text-center'),
            render: renderStatus,
        },
        {
            accessor: 'actions',
            label: 'Hành động',
            width: '10%',
            className: cx('text-center'),
            render: renderActions,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Thông tin bệnh nhân</h2>
                <Button
                    href={'/'}
                    className={cx('btn-back', 'text-primary')}
                    onClick={handleBack}
                    leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                >
                    Trở về
                </Button>
            </div>
            <div className={cx('patient-info')}>
                <div className={cx('info-group', 'row')}>
                    <div className={cx('col-md-6', 'row', 'info')}>
                        <div className={cx('col-md-3', 'info-title')}>Bệnh nhân</div>
                        <div className={cx('col-md-9', 'info-content')}>{patient?.name}</div>
                    </div>
                    <div className={cx('col-md-6', 'row', 'info')}>
                        <div className={cx('col-md-3', 'info-title')}>Ngày sinh</div>
                        <div className={cx('col-md-9', 'info-content')}>
                            {patient?.dateOfBirth} - {patient?.age} tuổi
                        </div>
                    </div>
                </div>
                <div className={cx('info-group', 'row')}>
                    <div className={cx('col-md-6', 'row', 'info')}>
                        <div className={cx('col-md-3', 'info-title')}>Điện thoại</div>
                        <div className={cx('col-md-9', 'info-content')}>{patient?.phone}</div>
                    </div>
                    <div className={cx('col-md-6', 'row', 'info')}>
                        <div className={cx('col-md-3', 'info-title')}>Giới tính</div>
                        <div className={cx('col-md-9', 'info-content')}>{patient?.gender === true ? 'Nam' : 'Nữ'}</div>
                    </div>
                </div>
                <div className={cx('info-group', 'row')}>
                    <div className={cx('col-md-6', 'row', 'info')}>
                        <div className={cx('col-md-3', 'info-title')}>Địa chỉ</div>
                        <div className={cx('col-md-9', 'info-content')}>{patient?.address}</div>
                    </div>
                    <div className={cx('col-md-6', 'row', 'info')}>
                        <div className={cx('col-md-3', 'info-title')}>Khoa - Phòng</div>
                        <div className={cx('col-md-9', 'info-content')}>
                            {patient?.department}
                            {patient?.roomNo && <span> - Phòng {patient?.roomNo}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('records')}>
                <div className={cx('record-title')}>
                    <h2>Lịch sử đăng ký</h2>
                </div>
                <DataTable
                    columns={columns}
                    data={recordList}
                    rowsPerPage={10}
                    children={
                        <Button
                            className={cx('btn-primary')}
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={handleOpenModalAdd}
                        >
                            Đăng ký dịch vụ
                        </Button>
                    }
                />

                <ModalBooking
                    className={cx('modal-patient')}
                    title={isEdit ? 'Cập nhật dịch vụ' : 'Đăng ký dịch vụ'}
                    visible={isModalOpen}
                    onClose={handleCloseModal}
                />

                <ModalDelete
                    content={`${service?.serviceName}?` ?? ''}
                    isOpen={isModalDeleteOpen}
                    onClose={() => setIsModalDeleteOpen(false)}
                    onClick={handleDelete}
                />
            </div>
        </div>
    );
}

export default RecordDetail;
