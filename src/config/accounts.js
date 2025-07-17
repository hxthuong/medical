import images from '~/assets/images';

const accounts = [
    {
        id: 1,
        username: 'admin.medical',
        password: '123456',
        displayName: 'Admin',
        role: 'admin',
        avatar: images.logo,
    },
    {
        id: 2,
        username: 'nva.medical',
        password: '123456',
        displayName: 'Nguyễn Văn A',
        role: 'doctor',
        avatar: images.logo,
    },
    {
        id: 3,
        username: 'ltb.medical',
        password: '123456',
        displayName: 'Lê Thị B',
        role: 'staff',
        avatar: images.logo,
    },
];

export default accounts;
