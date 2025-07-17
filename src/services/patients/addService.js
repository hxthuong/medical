import * as httpRequest from '~/utils/httpRequest';

const addService = async (params) => {
    try {
        const res = await httpRequest.post('Registrations/Add', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default addService;
