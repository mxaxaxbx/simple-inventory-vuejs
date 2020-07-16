export default{
    SET_PRODUCTS(state, prods){
        state.products = prods;
    },

    SET_PRODUCT(state, prod){
        state.product = prod;
    },

    SET_UPLOAD_VALUE(state, val){
        state.uloadValue = val;
    },

    SET_PICTURE(state, url){
        state.picture = url;
    },

    SET_QUANTITY_PRODUCTS(state, quantity){
        state.quantity_products = quantity;
    },
}