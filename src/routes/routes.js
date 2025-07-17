import config from '~/config';

import MedicalRecords from '~/pages/MedicalRecords';
import { RecordDetail } from '~/pages/MedicalRecords';
import Departments from '~/pages/Departments';
import Schedule from '~/pages/Schedule';
import Users from '~/pages/Users';
import Messages from '~/pages/Messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendar, faMessage, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
// import { DefaultLayout } from '~/layouts';
import Profile from '~/pages/Profile';

//Admin
const adminRoutes = [
    // {
    //     title: 'Khoa',
    //     icon: <FontAwesomeIcon icon={faBuilding} />,
    //     path: config.routes.home,
    //     component: Departments,
    //     visible: true,
    // },
    // {
    //     title: 'Lịch biểu',
    //     icon: <FontAwesomeIcon icon={faCalendar} />,
    //     path: config.routes.schedule,
    //     component: Schedule,
    //     visible: true,
    // },
    {
        title: 'Người dùng',
        icon: <FontAwesomeIcon icon={faUsers} />,
        path: config.routes.home,
        component: Users,
        visible: true,
    },
    {
        title: 'Tin nhắn',
        icon: <FontAwesomeIcon icon={faMessage} />,
        path: config.routes.messages,
        component: Messages,
        visible: true,
    },
    {
        title: 'Thông tin tài khoản',
        icon: '',
        path: config.routes.profile,
        component: Profile,
        visible: false,
    },
];

//Administrative staff
const staffRoutes = [
    {
        title: 'Hồ sơ bệnh án',
        icon: <FontAwesomeIcon icon={faUser} />,
        path: config.routes.home,
        component: MedicalRecords,
        visible: true,
    },
    {
        title: 'Hồ sơ bệnh án',
        icon: '',
        path: config.routes.recordDetail,
        component: RecordDetail,
        visible: false,
        back: config.routes.home,
    },
    {
        title: 'Lịch biểu',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        path: config.routes.schedule,
        component: Schedule,
        visible: true,
    },
    {
        title: 'Tin nhắn',
        icon: <FontAwesomeIcon icon={faMessage} />,
        path: config.routes.messages,
        component: Messages,
        visible: true,
    },
    {
        title: 'Thông tin tài khoản',
        icon: '',
        path: config.routes.profile,
        component: Profile,
        visible: false,
    },
];

//Doctor
const doctorRoutes = [
    {
        title: 'Lịch biểu',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        path: config.routes.home,
        component: Schedule,
        visible: true,
    },
    {
        title: 'Tin nhắn',
        icon: <FontAwesomeIcon icon={faMessage} />,
        path: config.routes.messages,
        component: Messages,
        visible: true,
    },
    {
        title: 'Thông tin tài khoản',
        icon: '',
        path: config.routes.profile,
        component: Profile,
        visible: false,
    },
];

export { adminRoutes, staffRoutes, doctorRoutes };
