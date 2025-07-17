import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

const defaulttFn = () => {};

function Menu({ children, items = [], onClick = defaulttFn }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={(e) => {
                        if (item.onClick) {
                            item.onClick(e);
                        }
                    }}
                />
            );
        });
    };
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );
    return (
        <div>
            <Tippy
                interactive
                delay={[0, 700]}
                // offset={[12, 8]}
                hideOnClick={true}
                placement="bottom-end"
                render={renderResult}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;
