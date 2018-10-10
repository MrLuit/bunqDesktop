export const defaultState = {
    has_loaded: {},
    loading: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case "LOADING_SCREEN_SET_LOADING":
            const isLoading = {
                ...state.loading,
                [action.payload.type]: true
            };
            return {
                ...state,
                loading: isLoading
            };
        case "LOADING_SCREEN_SET_NOT_LOADING":
            const isNotLoading = {
                ...state.loading,
                [action.payload.type]: false
            };
            return {
                ...state,
                loading: isNotLoading
            };
        case "LOADING_SCREEN_SET_HAS_LOADED":
            const hasLoaded = {
                ...state.has_loaded,
                [action.payload.type]: true
            };
            return {
                ...state,
                has_loaded: hasLoaded
            };
        case "LOADING_SCREEN_SET_HAS_NOT_LOADED":
            const hasNotLoaded = {
                ...state.has_loaded,
                [action.payload.type]: true
            };
            const isNotLoadingSecondary = {
                ...state.loading,
                [action.payload.type]: false
            };
            return {
                ...state,
                has_loaded: hasNotLoaded,
                loading: isNotLoadingSecondary
            };
    }
    return state;
};
