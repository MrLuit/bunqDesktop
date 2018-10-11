export function loadingScreenSetLoading(type) {
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
    return {
        type: "LOADING_SCREEN_CLEAR_TYPES"
    };
}
