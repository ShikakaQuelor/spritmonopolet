import ProductMapper from "./ProductMapper";

export const initialState = {
    loading: false,
    products: [],
    errorMessage: null,
    variables: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload.map((product, index) => ProductMapper(product, index, state.variables))
            };
        case "SEARCH_FAIL":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            }
        case "SET_VAR":
            return {
                ...state,
                variables: action.payload
            }
        default:
            return state;
    }
}