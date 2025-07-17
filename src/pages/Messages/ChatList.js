import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountMessageItem from '~/components/AccountMessageItem';
import { fetchAccounts } from '~/thunks/accounts';
import { fetchMessages } from '~/thunks/messages';
import Image from '~/components/Image';
import images from '~/assets/images';
import { selectUser, triggerScroll } from '~/features/messages/messagesSlice';
import { PopperWrapper } from '~/components/Popper';
import Search from '~/layouts/components/Search';

const cx = classNames.bind(styles);

const ChatList = () => {
    const [search, setSearch] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [activeId, setActiveId] = useState(false);

    const dispatch = useDispatch();
    const inputRef = useRef();

    const { list: messages } = useSelector((state) => state.messages);
    const { list: accounts } = useSelector((state) => state.accounts);
    const loginUser = useSelector((state) => state.messages.loginUser);

    useEffect(() => {
        dispatch(fetchAccounts({ keyword: search.trim() }));

        if (search.trim().length > 0 && accounts.length > 0) {
            setShowResult(true);
        }
    }, [dispatch, search, accounts]);

    const listUser = accounts
        .map((acc) => {
            const lastMsg = messages
                .filter(
                    (msg) =>
                        (msg.sender === loginUser.id && msg.receiver === acc.id) ||
                        (msg.receiver === loginUser.id && msg.sender === acc.id),
                )
                .sort((a, b) => new Date(b.createOnTime) - new Date(a.createOnTime))[0];

            return lastMsg
                ? {
                      ...acc,
                      lastMessage: `${lastMsg.sender === loginUser.id ? 'Bạn: ' : ''}${lastMsg.message}`,
                      lastTime: lastMsg.createOnTime,
                  }
                : null;
        })
        .filter(Boolean) // loại bỏ user không có tin nhắn
        .sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime));

    const handleSelect = (data) => {
        const chatUser = {
            receiver: data?.receiver || data?.id,
            receiverName: data?.receiverName || data?.displayName,
            receiverAvatar: data?.receiverAvatar || data?.avatar,
        };
        dispatch(selectUser(chatUser));
        dispatch(triggerScroll());
        dispatch(fetchMessages({ sender: data?.sender }));
        setActiveId(data?.receiver || data?.id);
    };

    const handleClear = () => {
        setSearch('');
        dispatch(fetchAccounts({ keyword: 'none' }));
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearch(searchValue);
            dispatch(
                fetchAccounts({
                    keyword: search.trim(),
                }),
            );
        }
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('title')}>
                <h2>Danh sách tin nhắn</h2>
                <HeadlessTippy
                    interactive
                    visible={showResult}
                    onClickOutside={() => {
                        setShowResult(false);
                        setSearch('');
                    }}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                {accounts.map((item) => (
                                    <AccountMessageItem key={item.id} data={item} onClick={() => handleSelect(item)} />
                                ))}
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div>
                        <Search
                            inputRef={inputRef}
                            searchValue={search}
                            className={cx('search')}
                            onChange={handleChange}
                            onClear={handleClear}
                        />
                    </div>
                </HeadlessTippy>
            </div>
            <div className={cx('accounts-wrapper')}>
                {!!listUser && listUser.length > 0 ? (
                    listUser.map((msg, index) => (
                        <AccountMessageItem
                            key={index}
                            data={msg}
                            onClick={() => handleSelect(msg)}
                            active={activeId === msg.receiver || activeId === msg.id}
                        />
                    ))
                ) : (
                    <div className={cx('message-empty')}>
                        <Image className={cx('empty-icon')} src={images.noData} alt="No data" />
                        <p>Không có tin nhắn nào</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;
