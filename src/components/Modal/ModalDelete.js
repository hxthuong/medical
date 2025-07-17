import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ModalDelete = ({ content, isOpen, onClose, onClick }) => {
    if (!isOpen) return;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleClick = () => {
        onClick();
        onClose();
    };

    const btnGroup = (
        <>
            <Button outline onClick={() => onClose()}>
                Hủy bỏ
            </Button>
            <Button className={cx('btn-danger')} onClick={handleClick}>
                Xóa
            </Button>
        </>
    );

    return (
        <div className={cx('modal-overlay')} onClick={handleOverlayClick}>
            <div className={cx('modal-content', 'modal-sm', 'modal-delete')}>
                <div className={cx('modal-body')}>
                    <form className={cx('form')}>
                        <div className={cx('form-content')}>
                            <div className={classNames('row', 'form-group')}>
                                <div className={cx('col-md-12', 'icon-delete')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                                <div className={cx('col-md-12', 'delete-wrapper')} style={{ marginBottom: '10px' }}>
                                    <span className="text-center">Xác nhận xóa</span>
                                    <span className={cx('text-center', 'delete-content')}>{content}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={cx('modal-footer')}>{btnGroup}</div>
            </div>
        </div>
    );
};

export default ModalDelete;
