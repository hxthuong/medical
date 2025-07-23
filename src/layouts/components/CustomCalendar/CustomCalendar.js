import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './CustomCalendar.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import images from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { listPatients } from '~/thunks/patients';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';

function CustomCalendar() {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);

    const dispatch = useDispatch();

    const { list: patients } = useSelector((state) => state.patients);

    useEffect(() => {
        dispatch(listPatients({ id: null }));
    }, [dispatch]);

    const login = loadFromLocalStorage('user') ?? null;
    // Hàm kiểm tra ngày có icon
    const isEventDate = (date) =>
        patients.some(
            (d) => new Date(d.requestDate).toDateString() === date.toDateString() && d.doctorID === login?.user?.id,
        );

    const handlePrevMonth = () => {
        const prevMonth = new Date(date);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setDate(nextMonth);
    };

    const handleToday = () => {
        setDate(new Date());
        setSelectedDate(new Date());
        const schedules = patients.filter(
            (d) =>
                new Date(d.requestDate).toDateString() === new Date().toDateString() && d.doctorID === login?.user?.id,
        );
        setSchedules(schedules);
    };

    const handleClick = (value, event) => {
        setSelectedDate(value);
        const schedules = patients.filter(
            (d) => new Date(d.requestDate).toDateString() === value.toDateString() && d.doctorID === login?.user?.id,
        );
        setSchedules(schedules);
    };

    const handleAll = () => {
        const schedules = patients.filter((d) => d.doctorID === login?.user?.id);
        setSchedules(schedules);
    };

    console.log(schedules);
    return (
        <div className={'calendar-wrapper'}>
            <div className="row" style={{ width: '100%' }}>
                <div className="col-md-4">
                    <h2 className="calendar-title">Danh sách</h2>
                    <div className="calendar-buttons">
                        <Button outline onClick={handleAll}>
                            Tất cả
                        </Button>
                        <Button className={'btn-primary'} onClick={handleToday}>
                            Hôm nay
                        </Button>
                    </div>
                    {schedules && schedules.length > 0 ? (
                        <div className="calendar-list">
                            <ul>
                                {schedules.map((item) => (
                                    <li key={item.id}>
                                        {item.requestTime} - {new Date(item.requestDate).toLocaleDateString('en-GB')} -{' '}
                                        {item.name} - {item.serviceName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="calendar-empty">
                            <Image className="empty-icon" src={images.noData} alt="No data" />
                            <p>No data</p>
                        </div>
                    )}
                </div>
                <div className="col-md-8 calendar-wrapper">
                    <Calendar
                        value={selectedDate} // ngày được chọn
                        activeStartDate={date} // tháng đang hiển thị
                        onClickDay={handleClick}
                        onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate)}
                        locale="vi-VN"
                        prev2Label={null}
                        next2Label={null}
                        // minDate={new Date()}
                        tileContent={({ date, view }) =>
                            view === 'month' && isEventDate(date) ? (
                                <div style={{ textAlign: 'right', color: 'red' }}>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </div>
                            ) : null
                        }
                        formatMonthYear={(locale, date) => `tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`}
                    />
                    <div className="group-btn">
                        <Button className={'btn btn-icon btn-primary btn-prev'} onClick={handlePrevMonth}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>
                        <Button className={'btn btn-icon btn-primary btn-next'} onClick={handleNextMonth}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                    </div>

                    <Button className={'btn btn-primary btn-current'} onClick={handleToday}>
                        Hiện tại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CustomCalendar;
