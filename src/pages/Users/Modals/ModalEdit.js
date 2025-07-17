import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import classNames from 'classnames/bind';
import styles from '../Users.module.scss';
import Modal from '~/components/Modal';
import { fetchServices } from '~/thunks/services';
import { addRecord, editRecord } from '~/thunks/records';

const cx = classNames.bind(styles);

function ModalEdit({ title, data, visible, onClose }) {
    const [service, setService] = useState();
    const [price, setPrice] = useState();
    const [usageCount, setUsageCount] = useState();
    const [requestDate, setRequestDate] = useState();

    const datePickerRef = useRef();
    const { recordId } = useParams();
    const dispatch = useDispatch();

    const { list: select } = useSelector((state) => state.services);

    useEffect(() => {
        dispatch(fetchServices({ id: null }));
    }, [dispatch]);

    const changeDate = (date) => {
        if (date) {
            const [day, month, year] = date.split('/');
            date = format(new Date(year, month - 1, day), 'yyyy-MM-dd');
        }

        return date;
    };

    const handleChange = (e) => {
        const serviceId = e.target.value;
        setService(serviceId);

        const selectedService = select.find((item) => item.id === serviceId);
        if (selectedService) {
            setPrice(selectedService.price.toLocaleString('de-DE') || 0);
            setUsageCount(selectedService.usageCount || 1);
            setRequestDate(new Date());
        }
    };

    const handleClose = () => {
        setService();
        setPrice();
        setUsageCount();
        setRequestDate();
        onClose();
    };

    const handleClick = () => {
        let date = requestDate || changeDate(data?.requestDate);
        const now = new Date();
        const reqDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let status = reqDate < today ? 'overdue' : reqDate.getTime() === today.getTime() ? 'scheduled' : '';

        const request = {
            registrationID: data?.registrationID || recordId,
            serviceID: service.trim() || data?.id,
            usageCount: Number(usageCount || data?.usageCount) || 0,
            requestDate: date.trim(),
            status: status,
        };

        if (data) {
            dispatch(editRecord(request));
        } else {
            request.serviceID = service;
            dispatch(addRecord(request));
        }

        handleClose();
    };

    return (
        <Modal title={title} size="modal-md" isOpen={visible} onClose={handleClose} onClick={handleClick}>
            <div className={cx('create-patients-content')}>
                <form className={cx('form')}>
                    <div className={cx('form-content')}>
                        <div className={classNames('row', 'form-group')}>
                            <div className={'col-md-12'} style={{ marginBottom: '10px' }}>
                                <label className={'form-label'}>Dịch vụ</label>
                                <select
                                    className={classNames('form-control', 'select-service')}
                                    value={service || data?.id}
                                    onChange={handleChange}
                                    disabled={!!data}
                                >
                                    <option>Chọn dịch vụ</option>
                                    {select.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.serviceName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={'col-md-4'}>
                                <label className={'form-label'}>Đơn giá</label>
                                <input
                                    className={classNames('form-control')}
                                    value={price || data?.price || 0}
                                    disabled
                                />
                            </div>
                            <div className={'col-md-2'}>
                                <label className={'form-label'}>Số lần</label>
                                <input
                                    type="number"
                                    className={classNames('form-control')}
                                    value={usageCount || data?.usageCount || 1}
                                    min={1}
                                    max={100}
                                    onChange={(e) => setUsageCount(e.target.value)}
                                />
                            </div>
                            <div className={classNames('col-md-6')}>
                                <label className={'form-label'}>Ngày thực hiện</label>
                                <div className={cx('form-calendar')}>
                                    <DatePicker
                                        className="form-control"
                                        selected={requestDate || changeDate(data?.requestDate) || new Date()}
                                        onChange={(date) => setRequestDate(date)}
                                        dateFormat={'dd/MM/yyyy'}
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
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalEdit;
