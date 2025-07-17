import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import AccountItem from '~/components/AccountItem';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';
import { getRoutesByRole } from '~/config/roles';

const cx = classNames.bind(styles);

function Sidebar() {
    const login = loadFromLocalStorage('user') ?? null;
    const role = login && login.user ? login.user.role : null;
    const routes = getRoutesByRole(role);

    return (
        <div className={cx('wrapper')}>
            <Image src={images.logo} alt="Medical" className={cx('logo')} />
            <div className={cx('menu-sidebar')}>
                {routes.map(
                    (item, index) =>
                        item.visible && <SidebarItem key={index} to={item.path} title={item.title} icon={item.icon} />,
                )}
            </div>
            <div className={cx('account-content')}>
                <AccountItem data={login?.user} color="light" />
            </div>
        </div>
    );
}

export default Sidebar;
