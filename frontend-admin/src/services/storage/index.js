const PREFIX = 'local::';

const set = (key, value) => {
    if (!localStorage) {
        return;
    }

    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(PREFIX + key, serializedValue);
    } catch (error) {
        throw new Error('Store serialization failed');
    }
}

const get = (key) => {
    if (!localStorage) {
        return;
    }

    try {
        const serializedValue = localStorage.getItem(PREFIX + key);

        if (!serializedValue) {
            return;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        throw new Error('Store deserialization failed');
    }
}

const removeItem = (key) => {
    if (!localStorage) {
        return;
    }

    try {
        localStorage.removeItem(PREFIX + key);
    } catch (error) {
        throw new Error('Store deserialization failed');
    }
}

const removeAllItem = () => {
    if (!localStorage) {
        return;
    }

    try {
        localStorage.clear();
    } catch (error) {
        throw new Error('Store deserialization failed');
    }
}

const OAUTH_TOKEN = 'charbet_access_token'; 
const REFRESH_TOKEN = 'charbet_refresh_token';
const USER_INFO = 'charbet_user_info';
const EMAIL_VERIFICATION_TOKEN = 'charbet_email_verification_token';

const LocalStorageService = {
    set, 
    get,
    removeItem,
    removeAllItem,
    OAUTH_TOKEN,
    REFRESH_TOKEN,
    USER_INFO,
    EMAIL_VERIFICATION_TOKEN
};

export default LocalStorageService;