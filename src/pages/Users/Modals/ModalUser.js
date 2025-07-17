import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '../Users.module.scss';
import Modal from '~/components/Modal';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';
import images from '~/assets/images';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { editAccount } from '~/thunks/accounts';
import Button from '~/components/Button';
import roles from '~/config/roles';

const cx = classNames.bind(styles);

function ModalUser({ title, data, visible, size, canEdit, className, onClose }) {
    const [avatar, setAvatar] = useState();
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState(!data || data?.gender === true ? '1' : '0');
    const [active, setActive] = useState(!data || data?.active === true ? '1' : '0');

    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.gender !== undefined) {
            setGender(data.gender ? '1' : '0');
        }

        if (data?.active !== undefined) {
            setActive(data.active ? '1' : '0');
        }
    }, [data]);

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));

            setFile(file);
        }
    };

    const handleClick = () => {
        const userData = loadFromLocalStorage('user') ?? null;

        const request = {
            ...data,
            id: data?.id || null,
            username: username.trim() || data?.username,
            password: password.trim() || data?.password,
            displayName: displayName.trim() || data?.displayName,
            gender: !gender ? data?.gender : gender === '1',
            active: !active ? data?.active : active === '1',
            role: role || data?.role,
            avatar: avatar || data?.avatar,
            modifiedByUser: userData && userData.user ? userData.user.id : null,
        };

        let formData = new FormData();

        formData.append('Data', JSON.stringify(request));

        formData.append('Files', file);

        dispatch(editAccount(formData));

        handleClose();
    };

    const handleClose = () => {
        setGender('1');
        setActive('1');
        setUsername('');
        setPassword('');
        setDisplayName('');
        setRole(null);
        setAvatar(null);
        onClose();
    };

    const renderButton = (
        <Button className={cx('btn-primary')} onClick={handleClose}>
            Đóng
        </Button>
    );

    return (
        <Modal
            title={title}
            size={size}
            className={cx(className)}
            isOpen={visible}
            btnGroup={!canEdit ? renderButton : null}
            onClose={handleClose}
            onClick={handleClick}
        >
            <div className={cx('create-patients-content')}>
                <form className={cx('form')}>
                    <div className={cx('form-content')}>
                        <div className={classNames('row', 'form-group')}>
                            <div className={'col-md-3'}>
                                <div className={cx('avatar-wrapper')}>
                                    <label htmlFor="fileUpload" className={cx('avatar-content')}>
                                        <img
                                            className={cx('avatar-user')}
                                            src={avatar || data?.avatar || images.noImage}
                                            alt="avatar"
                                        />
                                        <div className={cx('overlay', !canEdit ? 'disabled' : '')}>
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
                                        disabled={!canEdit}
                                    />
                                </div>
                            </div>
                            <div className={'col-md-9'}>
                                <div className={classNames('row', 'form-group')}>
                                    <div className={'col-md-6'}>
                                        <label className={'form-label'}>Tài khoản</label>
                                        <input
                                            className={classNames('form-control')}
                                            value={username || data?.username || null}
                                            onChange={(e) => setUsername(e.target.value)}
                                            disabled={!canEdit}
                                        />
                                    </div>
                                    <div className={'col-md-6'}>
                                        <label className={'form-label'}>Mật khẩu</label>
                                        <input
                                            type={'password'}
                                            className={classNames('form-control')}
                                            value={password || data?.password || null}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={!canEdit}
                                        />
                                    </div>
                                </div>
                                <div className={classNames('row', 'form-group')}>
                                    <div className={'col-md-8'}>
                                        <label className={'form-label'}>Tên hiển thị</label>
                                        <input
                                            className={classNames('form-control')}
                                            value={displayName || data?.displayName || null}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            disabled={!canEdit}
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
                                                    disabled={!canEdit}
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
                                                    disabled={!canEdit}
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
                                        <label className={'form-label'}>Vai trò</label>
                                        <select
                                            className={classNames('form-control', 'select-service')}
                                            value={role || data?.role}
                                            onChange={(e) => setRole(e.target.value)}
                                            disabled={!canEdit}
                                        >
                                            <option>Chọn vai trò</option>
                                            {roles.map((item) => (
                                                <option key={item.id} value={item.role}>
                                                    {item.roleDesc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={'col-md-6'}>
                                        <label className={'form-label'}>Hoạt động</label>
                                        <div className={cx('checkbox-content')}>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="status"
                                                    id="active"
                                                    value="1"
                                                    onChange={(e) => setActive(e.target.value)}
                                                    checked={active === '1'}
                                                    disabled={!canEdit}
                                                />
                                                <label className="form-check-label" htmlFor="active">
                                                    Hoạt động
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="status"
                                                    id="disabled"
                                                    value="0"
                                                    onChange={(e) => setActive(e.target.value)}
                                                    checked={active === '0'}
                                                    disabled={!canEdit}
                                                />
                                                <label className="form-check-label" htmlFor="disabled">
                                                    Vô hiệu
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalUser;
