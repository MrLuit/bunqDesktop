export const attemptingToLoadApiKey = "attemptingToLoadApiKey";
export const derivingKeyFromPassword = "derivingKeyFromPassword";
export const registerEncryptionKeys = "registerEncryptionKeys";
export const installDevice = "installDevice";
export const createApiSession = "createApiSession";
export const checkStoredData = "checkStoredData";

export function loadingScreenSetLoading(type) {
    console.log("loading", type);
    return {
        type: "LOADING_SCREEN_SET_LOADING",
        payload: {
            type: type
        }
    };
}
export function loadingScreenSetNotLoading(type) {
    return {
        type: "LOADING_SCREEN_SET_NOT_LOADING",
        payload: {
            type: type
        }
    };
}

export function loadingScreenHasLoaded(type) {
    console.log("hasLoaded", type);
    return {
        type: "LOADING_SCREEN_HAS_LOADED",
        payload: {
            type: type
        }
    };
}
export function loadingScreenHasNotLoaded(type) {
    return {
        type: "LOADING_SCREEN_HAS_NOT_LOADED",
        payload: {
            type: type
        }
    };
}

export function loadingScreenSetType(type, text) {
    return {
        type: "LOADING_SCREEN_SET_TYPE",
        payload: {
            type: type,
            text: text
        }
    };
}
export function loadingScreenClearTypes() {
    console.warn("clear types!!!");
    return {
        type: "LOADING_SCREEN_CLEAR_TYPES"
    };
}
