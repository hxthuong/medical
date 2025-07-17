import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Modal from '~/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { editAccount, fetchAccounts } from '~/thunks/accounts';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';

const cx = classNames.bind(styles);

function ModalChangePass({ visible, onClose }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const loginUser = loadFromLocalStorage('user') ?? null;
    const { list: accounts } = useSelector((state) => state.accounts);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(fetchAccounts({ keyword: loginUser?.user?.username }));

        const account = accounts && accounts.length > 0 ? accounts[0] : null;

        if (oldPassword.trim() === '') {
            toast.error(`Vui lòng nhập mật khẩu cũ!`);
            return;
        }

        if (newPassword.trim() === '') {
            toast.error(`Vui lòng nhập mật khẩu mới!`);
            return;
        }

        if (reNewPassword.trim() === '') {
            toast.error(`Vui lòng nhập lại mật khẩu mới!`);
            return;
        }

        if (accounts && account?.password === oldPassword) {
            if (newPassword === reNewPassword) {
                let formData = new FormData();
                const request = { ...account, password: newPassword };
                formData.append('Data', JSON.stringify(request));
                formData.append('Files', null);
                dispatch(editAccount(formData));
                toast.success('Đổi mật khẩu thành công');
            } else {
                toast.error(`Mật khẩu mới và mật khẩu nhập lại không khớp nhau!`);
            }
        } else {
            toast.error(`Mật khẩu cũ không chính xác!`);
        }

        handleClose();
    };

    const handleClose = () => {
        setOldPassword('');
        setNewPassword('');
        setReNewPassword('');
        onClose();
    };

    return (
        <Modal title="Đổi mật khẩu" isOpen={visible} onClose={handleClose} onClick={handleClick}>
            <div className={cx('change-password-content')}>
                <div className={'form-group'}>
                    <input
                        type="password"
                        className={'form-control'}
                        placeholder="Mật khẩu cũ"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={'form-group'}>
                    <input
                        type="password"
                        className={'form-control'}
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={'form-group'}>
                    <input
                        type="password"
                        className={'form-control'}
                        placeholder="Nhập lại mật khẩu mới"
                        value={reNewPassword}
                        onChange={(e) => setReNewPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ModalChangePass;
