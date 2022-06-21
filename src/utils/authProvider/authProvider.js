import * as React from "react";

const authContext = React.createContext(null);

export default function AuthProvider ({ children }) {
    const [authed, setAuthed] = React.useState(false);

    const login = () => {
        const token = localStorage.getItem('token');
        token ? setAuthed(true) : setAuthed(false);
    }
    const loguot = () => setAuthed(false);

    const value = {
        authed,
        login,
        loguot
    }

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () =>{
    return React.useContext(authContext)
}
