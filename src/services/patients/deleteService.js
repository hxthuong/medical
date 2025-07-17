import httpRequest from '~/utils/httpRequest';

const deleteService = async (id) => {
    try {
        const res = await httpRequest.remove('Registrations/Delete', {
            params: {
                ID: id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default deleteService;
