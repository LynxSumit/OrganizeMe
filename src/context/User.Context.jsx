
import  { createContext, useState } from "react";

export const UserContext = createContext({
    isAuthenticated: false,
     loading : false,
     ref : false,
     user : {}
});

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ref, setRef] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
   
    return (
        <UserContext.Provider value={{ref , setRef,   isAuthenticated, setIsAuthenticated,loading, setLoading ,user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
