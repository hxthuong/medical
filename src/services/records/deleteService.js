import httpRequest from '~/utils/httpRequest';

const deleteService = async (registrationID, serviceID) => {
    try {
        const res = await httpRequest.remove('ServiceDetail/Delete', {
            params: {
                RegistrationID: registrationID,
                ServiceID: serviceID,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default deleteService;
