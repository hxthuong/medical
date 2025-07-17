import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function SidebarItem({ icon, title, to }) {
    return (
        <NavLink className={(nav) => cx('sidebar-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

export default SidebarItem;
