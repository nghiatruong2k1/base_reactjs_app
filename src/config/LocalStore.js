export const LocalStore = (function(){
    return {
        get(key,initData){
            return JSON.parse(localStorage.getItem(key)) ?? initData ?? undefined;
        },
        set(key,value){
            localStorage.setItem(key,JSON.stringify(value));
        },
        delete(key){
            localStorage.delete(key)
        }
    };
}());