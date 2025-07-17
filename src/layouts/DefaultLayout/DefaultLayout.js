import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import { PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function DefaultLayout({ title, children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                <Header title={title} />

                <div className={cx('content-wrapper')}>
                    <PopperWrapper className={cx('content')}>{children}</PopperWrapper>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
