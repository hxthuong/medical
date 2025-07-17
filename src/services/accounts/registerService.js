import * as httpRequest from '~/utils/httpRequest';

const registerService = async (params) => {
    try {
        const res = await httpRequest.post('Users/Register', params, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default registerService;
