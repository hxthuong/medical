import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './Messages.module.scss';
import images from '~/assets/images';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function MessageItem({ data, color, active, className }) {
    const loginUser = useSelector((state) => state.messages.loginUser);
    const chatUser = useSelector((state) => state.messages.selectUser);

    const isMine = data?.sender === loginUser?.id;
    const avatar = isMine ? loginUser?.avatar : chatUser?.senderAvatar || chatUser?.receiverAvatar;
    const name = isMine ? loginUser?.name : chatUser?.senderName || chatUser?.receiverName;

    return (
        <div className={cx('message-item', { right: isMine }, className)}>
            {!isMine && <Image className={cx('avatar')} src={avatar || images.logo} alt={name} />}
            <div className={cx('bubble')}>
                <span className={cx('message')}>{data?.message}</span>
                <p className={cx('time')}>{data?.time}</p>
            </div>
            {isMine && <Image className={cx('avatar')} src={avatar || images.logo} alt={name} />}
        </div>
    );
}

MessageItem.propTypes = {
    data: PropTypes.object.isRequired,
    color: PropTypes.string,
    type: PropTypes.string,
};

export default MessageItem;
