import * as httpRequest from '~/utils/httpRequest';

const listService = async (id) => {
    try {
        const res = await httpRequest.post('Messages/Gets', {
            params: {
                ID: id,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default listService;
