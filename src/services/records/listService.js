import * as httpRequest from '~/utils/httpRequest';

const listService = async (params) => {
    try {
        const res = await httpRequest.post('ServiceDetail/Gets', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default listService;
