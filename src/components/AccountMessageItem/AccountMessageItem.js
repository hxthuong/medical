import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountMessageItem.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function AccountMessageItem({ data, color, active, onClick = defaultFn }) {
    // const { list: accounts } = useSelecto((state) => state.accounts);

    // const account = accounts && accounts.length > 0 ? accounts.find((x) => x.id === data?.receiver) : null;
    // console.log(data);
    return (
        <Link to={''} className={cx('wrapper', { [color]: color }, active ? 'active' : '')} onClick={onClick}>
            <Image
                className={cx('avatar')}
                src={data?.avatar || data?.receiverAvatar || images.logo}
                alt={data?.displayName || data?.receiverName}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data?.displayName || data?.receiverName || 'Chưa xác định'}</span>
                    {!data?.lastMessage && !!data?.online && (
                        <span className={cx('text-success', 'online')}>
                            <FontAwesomeIcon icon={faCircle} />
                        </span>
                    )}
                </h4>
                <span className={cx('message')}>{data?.lastMessage}</span>
            </div>
        </Link>
    );
}

AccountMessageItem.propTypes = {
    data: PropTypes.object.isRequired,
    color: PropTypes.string,
    type: PropTypes.string,
};

export default AccountMessageItem;
