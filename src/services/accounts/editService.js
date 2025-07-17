import * as httpRequest from '~/utils/httpRequest';

const editService = async (formData) => {
    try {
        const res = await httpRequest.post('Users/Edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default editService;
