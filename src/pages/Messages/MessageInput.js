import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { addMessage } from '~/thunks/messages';

const cx = classNames.bind(styles);

const MessageInput = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const inputRef = useRef();
    const chatUser = useSelector((state) => state.messages.selectUser);
    const loginUser = useSelector((state) => state.messages.loginUser);
    const { list: messages } = useSelector((state) => state.messages);

    useEffect(() => {
        if (chatUser) inputRef?.current.focus();
    }, [chatUser, messages.length]);

    const handleSend = () => {
        if (text.trim() && chatUser) {
            const newMessage = {
                receiver: chatUser?.receiver,
                sender: loginUser?.id,
                message: text,
            };

            dispatch(addMessage(newMessage));
            setText('');
            inputRef.current.focus();
        }
    };

    return (
        <div className={cx('send-message')}>
            <input
                ref={inputRef}
                value={text}
                placeholder={'Nhập tin nhắn...'}
                spellCheck={false}
                onChange={(e) => setText(e.target.value)}
            />

            <button className={cx('send-btn')} onClick={handleSend}>
                <span className={cx('icon-btn')}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </span>
                <span className={cx('title-btn')}>Gửi</span>
            </button>
        </div>
    );
};

export default MessageInput;
