import * as httpRequest from '~/utils/httpRequest';

const addService = async (formData) => {
    try {
        const res = await httpRequest.post('Files/Add', formData);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default addService;
