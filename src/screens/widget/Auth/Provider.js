import {memo,createContext,useContext} from 'react';
export const Context = createContext();
export const useGetContext = ()=>{
    return useContext(Context);
}
function Provider({children,value}){
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
};export default memo(Provider)