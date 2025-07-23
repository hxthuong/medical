import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSpinner, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import accountsService from '~/services/accounts';
import images from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '~/thunks/accounts';
import { saveToLocalStorage } from '~/utils/localStorageRequest';
import { setLogin } from '~/features/accounts/accountsSlice';

const cx = classNames.bind(styles);

function Login() {
    const [visiblePass, setVisiblePass] = useState(false);
    const [register, setRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [gender, setGender] = useState('1');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { account } = useSelector((state) => state.accounts);

    // const [login, setLogin] = useState(() => {
    //     const storage = loadFromLocalStorage('user') ?? null;
    //     return storage && storage.isLogin ? storage : null;
    // });

    const handleVisiblePassword = (e) => {
        e.preventDefault();
        setVisiblePass(!visiblePass);
    };

    useEffect(() => {
        if (account && account.username) {
            dispatch(setLogin(account));
            saveToLocalStorage('user', { isLogin: true, user: account });
        }
    }, [dispatch, account]);

    // useEffect(() => {
    //     const accountData = account === null ? null : { ...account, online: account && account !== '' };

    //     const userLogin =
    //         accountData === null
    //             ? null
    //             : {
    //                   isLogin: accountData ? true : false,
    //                   user: accountData ?? null,
    //               };

    //     if (accountData) {
    //         // saveToLocalStorage('user', { isLogin: true, user: accountData });
    //         dispatch(setLogin({ login: true, account: accountData }));
    //         navigate('/');
    //         setLoading(false);
    //     } else if (accountData === '') {
    //         userLogin.isLogin = false;
    //     }

    //     let formData = new FormData();
    //     formData.append('Data', JSON.stringify(accountData));
    //     formData.append('Files', null);
    //     dispatch(editAccount(formData));

    //     setLogin(userLogin);
    // }, [account, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(false);

        if (register) {
            accountsService.register({
                username,
                password,
                displayName,
                gender: gender === '1',
                avatar: images.logo,
            });

            setTimeout(() => {
                setLoading(false);
            }, 1000);

            return;
        }

        await dispatch(loginAccount({ username, password }));
        setPassword('');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setRegister(true);
    };

    // let Alert = () => {
    //     // if (isLogin === null || isLogin === '') return;
    //     // if (!isLogin) {
    //     //     return <p className={cx('text-danger')}>Username hoặc pasword không đúng</p>;
    //     // } else {
    //     //     navigate('/');
    //     // }
    // };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <form>
                        <div className={cx('form-header')}>
                            <h2 className={cx('form-title')}>{register ? 'Đăng ký' : 'Đăng nhập'}</h2>
                        </div>
                        <div className={cx('form-body')}>
                            <div className={cx('form-group')}>
                                <div className={cx('form-control')}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <input
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className={cx('form-control')}>
                                    <FontAwesomeIcon icon={faLock} />
                                    <input
                                        type={visiblePass ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button className={cx('btn-visible')} onClick={handleVisiblePassword}>
                                        {!visiblePass ? (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEye} />
                                        )}
                                    </button>
                                </div>
                                {register && (
                                    <>
                                        <div className={cx('form-control')}>
                                            <FontAwesomeIcon icon={faUserTag} />
                                            <input
                                                placeholder="Display name"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                required
                                            />
                                        </div>
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
                                    </>
                                )}
                            </div>
                            <div className={cx('form-group', register ? 'last-group' : '')}>
                                <Button type="submit" size="large" className={cx('btn-primary')} onClick={handleSubmit}>
                                    {register ? 'Đăng ký' : 'Đăng nhập'}
                                </Button>
                            </div>
                            {/* {<Alert />} */}
                            {!register && (
                                <div className={cx('form-group')}>
                                    <span>Hoặc </span>
                                    <Button href="/register" type="text" onClick={handleRegister}>
                                        Đăng ký ngay
                                    </Button>
                                </div>
                            )}

                            {/* <button type="submit" className={cx('btn', 'btn-primary')}></button> */}
                        </div>
                    </form>
                </div>
            </div>
            {loading && (
                <div className={cx('loading')}>
                    <FontAwesomeIcon icon={faSpinner} className={cx('icon-loading')} />
                </div>
            )}
        </div>
    );
}

export default Login;
