import { createContext, useState } from "react";


const UserContext = createContext(null);
const LoggedUser = {};

const UserProvider = ( {children} ) => {

    const[user, setUser] = useState(null);

    LoggedUser.user = user;
    LoggedUser.setUser = setUser;

    return(
        <UserContext.Provider value={ [user, setUser] }>
            {children}
        </UserContext.Provider>
    );
}


export { UserContext, UserProvider, LoggedUser} ;