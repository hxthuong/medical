import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';
import images from '~/assets/images';
import { getNameByRole } from '~/config/roles';

const cx = classNames.bind(styles);

function AccountItem({ data, color, type }) {
    let roleName = getNameByRole(data?.role) || 'Nhân viên';

    return (
        <Link to={type !== 'mini' ? `/profile/${data?.username}` : ''} className={cx('wrapper', { [color]: color })}>
            <Image
                className={cx('avatar')}
                src={data?.avatar || data?.receiverAvatar || images.logo}
                alt={data?.displayName || data?.receiverName}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data?.displayName || data?.receiverName}</span>
                </h4>
                {/* {type !== 'mini' && <span className={cx('username')}>{data.username}</span>} */}
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
