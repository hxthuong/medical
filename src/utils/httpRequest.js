import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, options = {}, config = {}) => {
    const response = await httpRequest.post(path, options, config);
    return response.data;
};

export const put = async (path, options = {}, config = {}) => {
    const response = await httpRequest.put(path, options, config);
    return response.data;
};

export const remove = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

// 🟡 Gắn thêm các hàm vào object nếu muốn dùng httpRequest.xxx
httpRequest.remove = remove;

export default httpRequest;
