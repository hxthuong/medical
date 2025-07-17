import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import classNames from 'classnames/bind';
import styles from '../MedicalRecords.module.scss';
import Modal from '~/components/Modal';
import { addPatient, editPatient } from '~/thunks/patients';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';

const cx = classNames.bind(styles);

function ModalPatient({ title, data, visible, className, onClose }) {
    const [gender, setGender] = useState(!data || data?.gender === true ? '1' : '0');
    const [name, setName] = useState();
    const [birthday, setBirthday] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [department, setDepartment] = useState();
    const [roomNo, setRoomNo] = useState();

    const datePickerRef = useRef();
    const dispatch = useDispatch();

    // const { list } = useSelector((state) => state.services);

    useEffect(() => {
        if (data?.gender !== undefined) {
            setGender(data.gender ? '1' : '0');
        }
    }, [data]);

    const changeDate = (date) => {
        if (date) {
            const [day, month, year] = date.split('/');
            date = format(new Date(year, month - 1, day), 'yyyy-MM-dd');
        }

        return date;
    };

    const handleClick = () => {
        const userData = loadFromLocalStorage('user') ?? null;

        const request = {
            ...data,
            id: data?.id || null,
            name: name.trim() || data?.name,
            dateOfBirth: birthday.trim() || changeDate(data?.dateOfBirth),
            gender: !gender ? data?.gender : gender === '1',
            address: address.trim() || data?.address,
            phone: phone.trim() || data?.phone,
            department: department.trim() || data?.department,
            roomNo: roomNo.trim() || data?.roomNo,
            modifiedByUser: userData && userData.user ? userData.user.id : null,
        };

        if (data) {
            dispatch(editPatient(request));
        } else {
            dispatch(addPatient(request));
        }

        handleClose();
    };

    const handleClose = () => {
        setGender('1');
        setName();
        setBirthday();
        setPhone();
        setAddress();
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
            <div className={cx('create-patients-content')}>
                <form className={cx('form')}>
                    <div className={cx('form-content')}>
                        <div className={classNames('row', 'form-group')}>
                            <div className={'col-md-8'}>
                                <label className={'form-label'}>Tên bệnh nhân</label>
                                <input
                                    className={classNames('form-control')}
                                    value={name || data?.name || null}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={'col-md-4'}>
                                <label className={'form-label'}>Giới tính</label>
                                <div className={cx('checkbox-content')}>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="genderMale"
                                            value="1"
                                            onChange={(e) => setGender(e.target.value)}
                                            checked={gender === '1'}
                                        />
                                        <label className="form-check-label" htmlFor="genderMale">
                                            Nam
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="genderFemale"
                                            value="0"
                                            onChange={(e) => setGender(e.target.value)}
                                            checked={gender === '0'}
                                        />
                                        <label className="form-check-label" htmlFor="genderFemale">
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classNames('row', 'form-group')}>
                            <div className={classNames('col-md-6')}>
                                <label className={'form-label'}>Ngày sinh</label>
                                <div className={cx('form-calendar')}>
                                    <DatePicker
                                        className="form-control"
                                        selected={birthday || changeDate(data?.dateOfBirth) || new Date()}
                                        onChange={(date) => setBirthday(date)}
                                        dateFormat={'dd/MM/yyyy'}
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
                            <div className={classNames('col-md-6')}>
                                <label className={'form-label'}>Số điện thoại</label>
                                <input
                                    className={classNames('form-control')}
                                    value={phone || data?.phone || null}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={'form-group'}>
                            <label className={'form-label'}>Địa chỉ</label>
                            <input
                                className={classNames('form-control')}
                                value={address || data?.address || null}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className={classNames('row', 'form-group')}>
                            <div className={'col-md-8'}>
                                <label className={'form-label'}>Khoa điều trị</label>
                                <input
                                    className={classNames('form-control')}
                                    value={department || data?.department || null}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                            </div>
                            <div className={'col-md-4'}>
                                <label className={'form-label'}>Phòng số</label>
                                <input
                                    className={classNames('form-control')}
                                    value={roomNo || data?.roomNo || null}
                                    onChange={(e) => setRoomNo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalPatient;
