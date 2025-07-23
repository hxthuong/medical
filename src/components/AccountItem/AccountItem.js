import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';
import images from '~/assets/images';
import { getNameByRole } from '~/config/roles';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem({ data, color, type, expanded = true, showOnline }) {
    let roleName = getNameByRole(data?.role) || 'Nhân viên';

    const { list: accounts } = useSelector((state) => state.accounts);

    const account = accounts && accounts.length > 0 ? accounts.find((x) => x.id === data?.receiver) : null;

    return (
        <Link
            to={type !== 'mini' ? `/profile/${data?.username}` : ''}
            className={cx('wrapper', !expanded ? 'collapsed' : '', { [color]: color })}
        >
            <Image
                className={cx('avatar')}
                src={data?.avatar || data?.receiverAvatar || images.logo}
                alt={data?.displayName || data?.receiverName}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data?.displayName || data?.receiverName}</span>
                </h4>
                {!!showOnline && (
                    <div className={cx('online-icons')}>
                        <span className={cx(account?.online ? 'text-success online' : 'offline')}>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                        <span>{account?.online ? ' Online' : ' Offline'}</span>
                    </div>
                )}
                {type !== 'mini' && <span className={cx('username')}>{roleName}</span>}
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
    color: PropTypes.string,
    type: PropTypes.string,
};

export default AccountItem;
