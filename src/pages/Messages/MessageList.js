import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import AccountItem from '~/components/AccountItem';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

const MessageList = () => {
    const { list: messages } = useSelector((state) => state.messages);
    const chatUser = useSelector((state) => state.messages.selectUser);
    const loginUser = useSelector((state) => state.messages.loginUser);
    const scrollTrigger = useSelector((state) => state.messages.scrollTrigger);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [scrollTrigger, messages.length]);

    const groupMessagesByDate = () => {
        const grouped = {};

        const listMess = messages.filter(
            (x) =>
                (x.sender === loginUser?.id && x.receiver === chatUser?.receiver) ||
                (x.sender === chatUser?.receiver && x.receiver === loginUser?.id),
        );

        listMess.forEach((msg) => {
            const date = msg.date;
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(msg);
        });

        // Chuyển về dạng mảng [{date, list}]
        return Object.entries(grouped).map(([date, list]) => ({
            date,
            list,
        }));
    };

    const messageData = groupMessagesByDate();

    return chatUser ? (
        <div className={cx('content')}>
            <div className={cx('header-info')}>
                <AccountItem data={chatUser} type="mini" />
            </div>
            <div className={cx('message-content')} ref={scrollRef}>
                {messageData.map((entry, i) => (
                    <div key={i}>
                        <div className={cx('date-label')}>
                            <h4>{entry.date}</h4>
                        </div>
                        <div className={cx('chat-content')}>
                            {entry.list.map((msg, j) => (
                                <MessageItem key={j} data={msg} className={cx('chat-item')} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('footer')}>
                <MessageInput />
            </div>
        </div>
    ) : (
        <div className={cx('content', 'content-empty')}></div>
    );
};

export default MessageList;
