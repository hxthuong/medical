import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FileUpload.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function FileItem({ data, className, onClick }) {
    return (
        <div className={cx('file-item', { [className]: className })}>
            <span className={cx('file-name')}>
                {data.url ? (
                    <a href={data.url} target="_blank" rel="noopener noreferrer" download>
                        {data.name}
                    </a>
                ) : (
                    data.name
                )}
            </span>
            <Button className={cx('btn-remove')} onClick={onClick}>
                <FontAwesomeIcon icon={faTimes} />
            </Button>
        </div>
    );
}

FileItem.propTypes = {
    data: PropTypes.object.isRequired,
    color: PropTypes.string,
    type: PropTypes.string,
};

export default FileItem;
