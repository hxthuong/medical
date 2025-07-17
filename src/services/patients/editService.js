import * as httpRequest from '~/utils/httpRequest';

const editService = async (params) => {
    try {
        const res = await httpRequest.post('Registrations/Edit', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default editService;
