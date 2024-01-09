export const inFavorite = (favorite, clickedid)=>{
    return favorite && favorite.length > 0 && favorite.some(({_id}) => _id.toString() === clickedid);
}