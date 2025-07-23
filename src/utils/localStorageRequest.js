export const saveToLocalStorage = (key, value) => {
    localStorage.removeItem(key);
    const expiry = Date.now() + 30 * 60 * 1000; // 30 phút
    localStorage.setItem(key, JSON.stringify({ value, expiry }));
};

const defaultFn = () => {};

export const loadFromLocalStorage = (key, callBack = defaultFn) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const { value, expiry } = JSON.parse(itemStr);
        if (Date.now() > expiry) {
            if (key === 'user') callBack(value);
            localStorage.removeItem(key);
            return null;
        }
        return value;
    } catch (e) {
        if (key === 'user') callBack();
        localStorage.removeItem(key); // malformed data
        return null;
    }
};

export const clearLocalStorage = (key) => {
    if (!key) {
        localStorage.clear();
    } else {
        localStorage.removeItem(key);
    }
};
