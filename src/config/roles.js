import { adminRoutes, doctorRoutes, staffRoutes } from '~/routes/routes';

const roles = [
    {
        id: 1,
        role: 'admin',
        roleDesc: 'Admin',
        routes: adminRoutes,
    },
    {
        id: 2,
        role: 'doctor',
        roleDesc: 'Bác sĩ',
        routes: doctorRoutes,
    },
    {
        id: 3,
        role: 'staff',
        roleDesc: 'Hành chính',
        routes: staffRoutes,
    },
    {
        id: 4,
        role: 'user',
        roleDesc: 'Nhân viên',
        routes: staffRoutes,
    },
];

export const getNameByRole = (roleName) => {
    const role = roles.find((r) => r.role === roleName);
    return role ? role.roleDesc : null;
};

export const getRoutesByRole = (roleName) => {
    const role = roles.find((r) => r.role === roleName);
    return role ? role.routes : [];
};

export default roles;
