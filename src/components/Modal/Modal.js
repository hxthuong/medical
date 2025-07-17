import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Modal = ({ title, size = 'modal-sm', className, children, btnGroup, isOpen, onClose, onClick }) => {
    if (!isOpen) return;

    if (!btnGroup && onClick) {
        btnGroup = (
            <>
                <Button outline onClick={() => onClose()}>
                    Hủy bỏ
                </Button>
                <Button className={cx('btn-primary')} onClick={onClick}>
                    Lưu
                </Button>
            </>
        );
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={cx('modal-overlay')} onClick={handleOverlayClick}>
            <div className={cx('modal-content', { [size]: size }, className)}>
                <div className={cx('modal-header')}>
                    <h2 className={cx('modal-title')}>{title}</h2>
                    <Button className={cx('modal-close')} onClick={onClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </Button>
                </div>
                <div className={cx('modal-body')}>{children}</div>
                {btnGroup && <div className={cx('modal-footer')}>{btnGroup}</div>}
            </div>
        </div>
    );
};

export default Modal;
