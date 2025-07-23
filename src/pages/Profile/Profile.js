import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import ModalChangePass from '~/layouts/components/Header/ModalChangePass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { editAccount, fetchAccounts } from '~/thunks/accounts';
import { getNameByRole } from '~/config/roles';
import { saveToLocalStorage } from '~/utils/localStorageRequest';
import config from '~/config';

const cx = classNames.bind(styles);

function Profile() {
    const { username } = useParams();

    const [account, setAccount] = useState(null);
    const [previewImage, setPreviewImage] = useState();
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { list: accounts } = useSelector((state) => state.accounts);

    useEffect(() => {
        dispatch(fetchAccounts({ keyword: username }));
    }, [dispatch, username]);

    useEffect(() => {
        if (accounts?.length) {
            setAccount(accounts[0]);
        }
    }, [accounts]);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            // console.log('Selected file:', {
            //     name: file.name,
            //     type: file.type,
            //     size: `${(file.size / 1024).toFixed(2)} KB`,
            // });
            setPreviewImage(URL.createObjectURL(file));

            setFile(file);
        }
    };

    const handleSave = () => {
        let formData = new FormData();

        const accountData = {
            ...account,
            displayName: name || account?.displayName,
            avatar: previewImage || account?.avatar,
        };

        formData.append('Data', JSON.stringify(accountData));

        formData.append('Files', file);

        saveToLocalStorage('user', { isLogin: true, user: accountData });

        dispatch(editAccount(formData));

        // setName('');

        // navigate(`${config.routes.profile.replace(':username', account?.username)}`);
    };

    const ActiveStatus = (status) => {
        if (!status) return '';

        if (status === true) return <span className="text-success">Hoạt động</span>;
        else if (status === false) return <span className="text-danger">Vô hiệu</span>;
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Tài khoản</h2>
                <Button href={'/'} className={cx('btn-back', 'text-primary')} onClick={handleChangePassword}>
                    Đổi mật khẩu
                </Button>
            </div>

            <div className={cx('account-info')}>
                <div className={cx('avatar-wrapper')}>
                    <label htmlFor="fileUpload" className={cx('avatar-content')}>
                        <img
                            className={cx('avatar')}
                            src={previewImage || account?.avatar || images.noImage}
                            onError={(e) => {
                                e.target.onerror = null; // tránh lặp vô hạn nếu fallback cũng lỗi
                                e.target.src = images.noImage; // ảnh thay thế
                            }}
                            alt="avatar"
                        />
                        <div className={cx('overlay')}>
                            <span>
                                <FontAwesomeIcon icon={faCamera} />
                            </span>
                        </div>
                    </label>
                    <input
                        id="fileUpload"
                        className={cx('file-upload')}
                        type="file"
                        accept="image/*"
                        onChange={handleChangeFile}
                    />
                </div>
                <div className={cx('info-wrapper')}>
                    <div className={cx('row', 'info-item')}>
                        <div className={cx('col-md-3', 'form-label')}>Họ tên:</div>
                        <div className={cx('col-md-9', 'info-content')}>
                            <input
                                className={cx('form-control')}
                                value={name || account?.displayName}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('row', 'info-item')}>
                        <div className={cx('col-md-3', 'form-label')}>Vai trò:</div>
                        <div className={cx('col-md-9', 'info-content')}>
                            <input
                                className={cx('form-control')}
                                value={getNameByRole(account?.role) || 'Nhân viên'}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={cx('row', 'info-item')}>
                        <div className={cx('col-md-3', 'form-label')}>Hoạt động:{account?.active}</div>
                        <div className={cx('col-md-9', 'info-content')}>{ActiveStatus(account?.active)}</div>
                    </div>
                    <div className={cx('row', 'info-item')}>
                        <div className={cx('col-md-3', 'form-label')}>Giới tính:</div>
                        <div className={cx('col-md-9', 'info-content')}>
                            <div className={cx('col-md-9', 'info-content')}>
                                {account?.gender === true ? 'Nam' : 'Nữ'}
                            </div>
                        </div>
                    </div>
                    <div className={cx('row', 'info-item')}>
                        <div className={cx('col-md-3', 'form-label')}>Trạng thái:</div>
                        <div className={cx('col-md-9', 'info-content')}>
                            <span className={account?.online === true ? 'text-success' : ''}>
                                {account?.online === true ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                    <div className={cx('action', 'text-center')}>
                        <Button className={cx('btn-primary')} onClick={handleSave}>
                            Lưu
                        </Button>
                    </div>
                </div>
            </div>

            <ModalChangePass visible={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Profile;
