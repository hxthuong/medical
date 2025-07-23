import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import { PopperWrapper } from '~/components/Popper';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ title, children }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={cx('wrapper')}>
            <Sidebar expanded={isExpanded} />
            <div className={cx('container', isExpanded ? 'expanded' : 'collapsed')}>
                <Header title={title} onClick={handleExpandSidebar} isExpanded={isExpanded} />

                <div className={cx('content-wrapper')}>
                    <PopperWrapper className={cx('content')}>{children}</PopperWrapper>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
