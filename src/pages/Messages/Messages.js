import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import ChatList from './ChatList';
import MessageList from './MessageList';
import { fetchMessages } from '~/thunks/messages';
import { loginUser } from '~/features/messages/messagesSlice';
import { loadFromLocalStorage } from '~/utils/localStorageRequest';

const cx = classNames.bind(styles);

const Messages = () => {
    const dispatch = useDispatch();

    const login = loadFromLocalStorage('user') ?? null;
    const user = login?.user;

    useEffect(() => {
        dispatch(loginUser(user));
        dispatch(fetchMessages({ sender: user?.id }));

        const interval = setInterval(() => {
            dispatch(fetchMessages({ userId: user?.id }));
        }, 2000); // gọi lại mỗi 2 giây

        return () => clearInterval(interval);
    }, [dispatch, user]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('col-md-3')}>
                    <ChatList />
                </div>
                <div className={cx('col-md-9', 'content-wrapper')}>
                    <MessageList />
                </div>
            </div>
        </div>
    );
};

export default Messages;
