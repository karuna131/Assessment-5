import { createContext, useContext, useRef, useState } from "react";

export const AuthContext = createContext();

function CartProvider({ children }) {
    const [isAuthenticated , setAuthentication ] = useState(false)
    const [currentUser, setCurrentUser] = useState('')

    return (
        <AuthContext value={{isAuthenticated, setAuthentication}}>
            {children}
        </AuthContext>
    );
}

export function useCart() {
    return useContext(AuthContext);
}


export default CartProvider;