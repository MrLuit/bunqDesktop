export const defaultState = {
    types: {},
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

        case "LOADING_SCREEN_SET_TYPE":
            const types = {
                ...state.types,
                [action.payload.type]: action.payload.text
            };
            return {
                ...state,
                types: types
            };
        case "LOADING_SCREEN_CLEAR_TYPES":
            return {
                ...state,
                ...defaultState
            };

        case "LOADING_SCREEN_HAS_LOADED":
            const hasLoaded = {
                ...state.has_loaded,
                [action.payload.type]: true
            };
            const isNotLoadingSecondary = {
                ...state.loading,
                [action.payload.type]: false
            };
            return {
                ...state,
                has_loaded: hasLoaded,
                loading: isNotLoadingSecondary
            };
        case "LOADING_SCREEN_HAS_NOT_LOADED":
            const hasNotLoaded = {
                ...state.has_loaded,
                [action.payload.type]: false
            };
            return {
                ...state,
                has_loaded: hasNotLoaded
            };
    }
    return state;
};
