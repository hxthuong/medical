import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FileUpload.module.scss';
import Button from '~/components/Button';
import FileItem from './FileItem';
import { toast } from 'react-toastify';
import { PopperWrapper } from '../Popper';
import { useDispatch } from 'react-redux';
import { selectFiles } from '~/features/records/recordsSlice';

const cx = classNames.bind(styles);

function FileUpload({ title, data, multiple = true, className }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showFileList, setShowFileList] = useState(false);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();

    // Khi có file từ server truyền xuống
    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedFiles(() => [
                ...data.map((f) => ({
                    id: f?.id,
                    name: f?.fileName,
                    url: f?.filePath,
                    fromServer: true,
                })),
            ]);
        }
    }, [data]);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const existingNames = selectedFiles.map((f) => f.name);

        const filtered = newFiles.filter((f) => !existingNames.includes(f.name));
        const duplicated = newFiles.filter((f) => existingNames.includes(f.name));

        if (duplicated.length) {
            toast.warn(`File ${duplicated.map((f) => f.name).join(', ')} đã tồn tại`);
        }

        if (filtered.length) {
            const updated = [...selectedFiles, ...filtered];
            setSelectedFiles(updated);
            dispatch(selectFiles(updated)); // Lưu toàn bộ File object vào redux
        }

        e.target.value = null; // reset input
    };

    const handleRemoveFile = (e, indexToRemove) => {
        e.preventDefault();
        const updated = selectedFiles.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(updated);
        dispatch(selectFiles(updated));
    };

    return (
        <>
            <div className="form-label" htmlFor="fileUpload">
                <span>
                    {title} ({selectedFiles.length})
                </span>
                {selectedFiles.length > 0 && (
                    <HeadlessTippy
                        interactive
                        visible={showFileList}
                        placement="top"
                        onClickOutside={() => setShowFileList(false)}
                        render={(attrs) => (
                            <div className={cx('files-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper className={cx('files-content')}>
                                    <h3 className={cx('files-title')}>Danh sách file</h3>
                                    {selectedFiles.map((item, index) => (
                                        <FileItem key={index} data={item} onClick={(e) => handleRemoveFile(e, index)} />
                                    ))}
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <Button
                            type="button"
                            className={cx('btn-visible')}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowFileList((prev) => !prev);
                            }}
                        >
                            {showFileList ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </Button>
                    </HeadlessTippy>
                )}
            </div>

            <input
                id="fileUpload"
                type="file"
                className="form-control"
                multiple={multiple}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </>
    );
}

FileUpload.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
    multiple: PropTypes.bool,
    className: PropTypes.string,
};

export default FileUpload;
