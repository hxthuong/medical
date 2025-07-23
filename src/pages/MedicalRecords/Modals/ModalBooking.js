import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import classNames from 'classnames/bind';
import styles from '../MedicalRecords.module.scss';
import Modal from '~/components/Modal';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';
import { fetchAccounts } from '~/thunks/accounts';
import { fetchServices } from '~/thunks/services';
import { selectFiles, selectPatient, selectService } from '~/features/records/recordsSlice';
import { addFiles, deleteFile, fetchFiles } from '~/thunks/files';
import { addRecord, editRecord } from '~/thunks/records';
import FileUpload from '~/components/FileUpload';

const cx = classNames.bind(styles);

function ModalBooking({ title, visible, className, onClose }) {
    const [record, setRecord] = useState(null);
    const [doctor, setDoctor] = useState();
    const [usageCount, setUsageCount] = useState();
    const [requestDate, setRequestDate] = useState();
    const [notes, setNotes] = useState();
    const [requestTime, setRequestTime] = useState();
    const [cost, setCost] = useState();

    const datePickerRef = useRef();
    const dispatch = useDispatch();

    const { list: doctors } = useSelector((state) => state.accounts);
    const { list: services } = useSelector((state) => state.services);
    const { list: records } = useSelector((state) => state.records);
    const { list: files } = useSelector((state) => state.files);
    const patient = useSelector((state) => state.records.selectPatient);
    const service = useSelector((state) => state.records.selectService);
    const filesSelect = useSelector((state) => state.records.selectFiles);

    //Gọi danh sách bác sĩ và danh sách dịch vụ
    useEffect(() => {
        dispatch(fetchAccounts({ role: 'doctor' }));
        dispatch(fetchServices({ id: null }));
    }, [dispatch]);

    useEffect(() => {
        if (patient && service) {
            dispatch(fetchFiles({ objectID: patient?.id, serviceID: service?.id }));
            // dispatch(fetchRecords({ registrationID: patient.id, serviceID: service.id }));
        }
    }, [dispatch, patient, service]);

    useEffect(() => {
        if (service && records?.length) {
            setRecord(records.find((x) => x.id === service.id));
        }
    }, [service, records]);

    const changeDate = (date) => {
        if (date) {
            const [day, month, year] = date.split('/');
            date = format(new Date(year, month - 1, day), 'yyyy-MM-dd');
        }

        return date;
    };

    const handleChangeCount = (e) => {
        const count = e.target.value;
        setUsageCount(count);

        if (service) {
            const total = Number(Number(count) || 1) * service.price;
            setCost(total.toLocaleString('de-DE') || 0);
        }
    };

    const handleChange = (e) => {
        const serviceId = e.target.value;

        const selectedService = services?.find((x) => x.id === serviceId);
        if (selectedService) {
            const total = Number(usageCount || 1) * selectedService.price;
            setCost(total.toLocaleString('de-DE') || 0);
        }

        dispatch(selectService(selectedService ?? null));
    };

    const handleClick = () => {
        if (!patient) return;

        let date = requestDate || changeDate(record?.requestDate);
        const now = new Date();
        const reqDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let status = reqDate < today ? 'overdue' : reqDate.getTime() === today.getTime() ? 'scheduled' : '';

        const request = {
            registrationID: patient?.id,
            serviceID: service?.id || record?.id,
            usageCount: Number(usageCount || record?.usageCount) || 1,
            requestDate: date,
            status: status,
            doctorID: doctor || record?.doctorID,
            requestTime: requestTime || record?.requestTime,
            notes: notes || record?.notes,
        };

        if (record) {
            dispatch(editRecord(request));
        } else {
            request.serviceID = service?.id;
            dispatch(addRecord(request));
        }

        if (filesSelect && filesSelect.length > 0) {
            const login = loadFromLocalStorage('user') ?? null;

            let formData = new FormData();

            formData.append('ObjectID', service?.registrationID || patient?.id);

            formData.append('ServiceID', service?.id || record?.id);

            formData.append('UploadedBy', login ? login?.user?.id : null);

            filesSelect.forEach((file) => {
                if (!file.url && file instanceof File) {
                    formData.append('Files', file);
                }
            });

            const filesDelete = files.filter((b) => !filesSelect.some((a) => a.id === b.id));
            if (filesDelete && filesDelete.length > 0) {
                filesDelete.forEach((file) => {
                    dispatch(deleteFile({ id: file.id }));
                });
            }

            dispatch(addFiles(formData));
        }

        handleClose();
    };

    const handleClose = () => {
        dispatch(selectService(null));
        dispatch(selectPatient(null));
        dispatch(selectFiles([]));
        setRecord(null);
        setDoctor();
        setUsageCount(1);
        setRequestDate();
        setNotes('');
        setRequestTime('');
        setCost(0);
        onClose();
    };

    return (
        <Modal
            title={title}
            size="modal-md"
            className={cx(className)}
            isOpen={visible}
            onClose={handleClose}
            onClick={handleClick}
        >
            <div className={cx('booking-content')}>
                <form className={cx('form')}>
                    <div className={cx('form-content')}>
                        {/* 🧑‍⚕️ Thông tin bệnh nhân */}
                        <div className={classNames('row', 'form-group')}>
                            <div className="col-md-8">
                                <label className="form-label">Tên bệnh nhân</label>
                                <input className="form-control" value={patient?.name || ''} disabled />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Số điện thoại</label>
                                <input className="form-control" value={patient?.phone || ''} disabled />
                            </div>
                        </div>

                        {/* 🏥 Thông tin khám */}
                        <div className={classNames('row', 'form-group')}>
                            <div className="col-md-9">
                                <label className="form-label">Dịch vụ</label>
                                <select
                                    value={service?.id || record?.id || null}
                                    className={classNames('form-control', 'select-service')}
                                    onChange={handleChange}
                                >
                                    <option>Chọn dịch vụ</option>
                                    {services.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.serviceName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Số lần</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={usageCount || record?.usageCount || 1}
                                    min={1}
                                    max={100}
                                    onChange={handleChangeCount}
                                />
                            </div>
                        </div>

                        <div className={classNames('row', 'form-group')}>
                            <div className="col-md-5">
                                <label className="form-label">Bác sĩ</label>
                                <select
                                    className="form-control"
                                    value={doctor || record?.doctorID || null}
                                    onChange={(e) => setDoctor(e.target.value)}
                                >
                                    <option>Chọn bác sĩ</option>
                                    {doctors?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.displayName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Ngày thực hiện</label>
                                <div className={cx('form-calendar')}>
                                    <DatePicker
                                        className="form-control"
                                        selected={requestDate || changeDate(record?.requestDate) || new Date()}
                                        onChange={(date) => setRequestDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        ref={datePickerRef}
                                    />
                                    <span
                                        className={cx('icon-calendar')}
                                        onClick={() => datePickerRef.current.setFocus()}
                                    >
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Giờ khám</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={requestTime || record?.requestTime || ''}
                                    onChange={(e) => setRequestTime(`${e.target.value}:00`)}
                                />
                            </div>
                        </div>

                        {/* 💰 Chi phí */}
                        <div className={classNames('row', 'form-group')}>
                            <div className="col-md-12">
                                <span>
                                    <strong>Chi phí: </strong>
                                    <span className={cx('text-success')}>
                                        {cost ||
                                            (record &&
                                                (
                                                    record?.usageCount * Number(record?.price.replace('.', ''))
                                                ).toLocaleString('DE-de')) ||
                                            0}
                                    </span>
                                    <span> VNĐ</span>
                                </span>
                            </div>
                        </div>

                        {/* 📎 Hồ sơ đính kèm */}
                        <div className={classNames('row', 'form-group')}>
                            <div className="col-md-12">
                                <FileUpload title={'Hồ sơ đính kèm'} data={record ? files : []} multiple />
                            </div>
                        </div>

                        {/* 📝 Ghi chú */}
                        <div className={classNames('row', 'form-group')}>
                            <div className="col-md-12">
                                <label className="form-label">Ghi chú</label>
                                <textarea
                                    className="form-control"
                                    value={notes || record?.notes || ''}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalBooking;
