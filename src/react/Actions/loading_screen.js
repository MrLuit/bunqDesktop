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

export function loadingScreenSetHasLoaded(type) {
    return {
        type: "LOADING_SCREEN_SET_HAS_LOADED",
        payload: {
            type: type
        }
    };
}
export function loadingScreenSetHasNotLoaded(type) {
    return {
        type: "LOADING_SCREEN_SET_HAS_NOT_LOADED",
        payload: {
            type: type
        }
    };
}
