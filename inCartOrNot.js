export const inCart = (cart, clickedid)=>{
    return cart && cart.length > 0 && cart.some(({_id}) => _id.toString() === clickedid);
}