import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({ inputRef, placeholder = 'Tìm kiếm...', searchValue, className, onChange, onClear }) {
    return (
        <div className={cx('search', className)}>
            <input
                ref={inputRef}
                value={searchValue}
                placeholder={placeholder}
                spellCheck={false}
                onChange={onChange}
            />
            {!!searchValue && (
                <button className={cx('clear')} onClick={onClear}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}

            <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default Search;
