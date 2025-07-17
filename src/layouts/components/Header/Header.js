import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faKey, faList, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { useState } from 'react';
import ModalChangePass from './ModalChangePass';
import { useDispatch } from 'react-redux';
import { editAccount } from '~/thunks/accounts';
import { clearLocalStorage, loadFromLocalStorage } from '~/utils/localStorageRequest';

const cx = classNames.bind(styles);

function Header({ title }) {
    const login = loadFromLocalStorage('user') ?? null;
    const data = login?.user;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const handleChangePassword = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        let formData = new FormData();
        const accountData = { ...login.user, online: false };
        formData.append('Data', JSON.stringify(accountData));
        formData.append('Files', null);
        dispatch(editAccount(formData));

        clearLocalStorage();
        window.location.reload();
    };

    const MENU_ACTIONS = [
        { title: 'Thông tin', icon: <FontAwesomeIcon icon={faUser} />, to: `/profile/${data?.username}` },
        { title: 'Đổi mật khẩu', icon: <FontAwesomeIcon icon={faKey} />, onClick: handleChangePassword },
        { title: 'Đăng xuất', icon: <FontAwesomeIcon icon={faSignOut} />, onClick: handleLogout },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-info')}>
                <Button className={cx('btn-icon')} onClick={() => console.log()}>
                    <FontAwesomeIcon icon={faList} />
                </Button>
                <h1 className={cx('title')}>{title}</h1>
            </div>
            <Menu items={MENU_ACTIONS}>
                <div className={cx('actions')}>
                    <AccountItem data={data} type="mini" />
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </Menu>
            <ModalChangePass visible={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Header;
