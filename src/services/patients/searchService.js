import * as httpRequest from '~/utils/httpRequest';

const searchService = async (params) => {
    try {
        const res = await httpRequest.post('Registrations/Gets', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default searchService;
