import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountMessageItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function AccountMessageItem({ data, color, active, onClick = defaultFn }) {
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
