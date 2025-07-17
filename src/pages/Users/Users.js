import classNames from 'classnames/bind';
import styles from './Users.module.scss';
import DataTable from '~/components/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, fetchAccounts } from '~/thunks/accounts';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import { faEdit, faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button';
import Image from '~/components/Image';
import images from '~/assets/images';
import { ModalUser } from './Modals';
import ModalDelete from '~/components/Modal/ModalDelete';

const cx = classNames.bind(styles);

function Users() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [reloadFlag, setReloadFlag] = useState(1);
    const [account, setAccount] = useState(null);
    const [canEdit, setCanEdit] = useState(false);

    const dispatch = useDispatch();
    const { list: searchResult } = useSelector((state) => state.accounts);

    useEffect(() => {
        dispatch(fetchAccounts({ keyword: '' }));
    }, [dispatch, reloadFlag]);

    const renderActions = (row) => (
        <>
            <Tippy content="Xem thông tin" placement="bottom">
                <Link className={cx('btn-action')} onClick={() => handleOpenEditModal(row, false)}>
                    <FontAwesomeIcon icon={faEye} />
                </Link>
            </Tippy>
            <Tippy content="Chỉnh sửa" placement="bottom">
                <Link className={cx('btn-action', 'text-warning')} onClick={() => handleOpenEditModal(row)}>
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
            </Tippy>
            <Tippy content="Xóa" placement="bottom">
                <Link className={cx('btn-action', 'text-danger')} onClick={() => handleOpenDeleteModal(row)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </Link>
            </Tippy>
        </>
    );

    const columns = [
        { accessor: 'STT', label: 'STT', width: '5%', className: cx('text-center') },
        {
            accessor: 'avatar',
            label: 'Ảnh đại diện',
            width: '10%',
            className: cx('text-center'),
            render: (row) => <Image className={cx('avatar')} src={row.avatar || images.logo} alt={row.displayName} />,
        },
        { accessor: 'username', label: 'Tài khoản', width: '20%' },
        { accessor: 'displayName', label: 'Tên hiển thị', width: '20%' },
        {
            accessor: 'genderDesc',
            label: 'Giới tính',
            width: '8%',
            className: cx('text-center'),
        },
        { accessor: 'roleDesc', label: 'Vai trò', width: '12%' },
        {
            accessor: 'actions',
            label: 'Hành động',
            width: '10%',
            className: cx('text-center'),
            render: renderActions,
        },
    ];

    const handleOpenAddModal = () => {
        setCanEdit(true);
        setAccount(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (row, isEdit = true) => {
        setCanEdit(isEdit);
        setAccount(row);
        setIsModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsModalOpen(false);
        setReloadFlag((prev) => prev + 1);
    };

    const handleOpenDeleteModal = (row) => {
        setAccount(row);
        setIsModalDeleteOpen(true);
    };

    const handleDelete = () => {
        if (account) {
            dispatch(deleteAccount({ id: account.id }));
        }
        setReloadFlag((prev) => prev + 1);
    };

    const handleCloseDeleteModal = () => {
        setIsModalDeleteOpen(false);
        setReloadFlag((prev) => prev + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h2>Quản lý người dùng</h2>
            </div>
            <DataTable
                columns={columns}
                data={searchResult}
                rowsPerPage={10}
                children={
                    <Button
                        className={cx('btn-primary')}
                        leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                        onClick={handleOpenAddModal}
                    >
                        Thêm người dùng
                    </Button>
                }
            />
            <ModalUser
                className={cx('modal-user')}
                title={account ? (canEdit ? 'Cập nhật người dùng' : 'Xem thông tin người dùng') : 'Thêm mới người dùng'}
                size="modal-lg"
                visible={isModalOpen}
                data={account || null}
                canEdit={canEdit}
                onClose={handleCloseEditModal}
            />
            <ModalDelete
                content={`Thông tin người dùng ${account?.displayName}?` ?? ''}
                isOpen={isModalDeleteOpen}
                onClose={handleCloseDeleteModal}
                onClick={handleDelete}
            />
        </div>
    );
}

export default Users;
