import { createContext, useContext, useState } from "react";

interface CurrentUserContextType {
    isAuthenticated: boolean;
    user: IUser | null;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser) => void;
}

const CurrentAppContext = createContext<CurrentUserContextType | null>(null);

type TProps = {
    children: React.ReactNode
}

export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)

    return (
        <CurrentAppContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
            {props.children}
        </CurrentAppContext.Provider>
    )
}

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext)
    if (!currentAppContext) {
        throw new Error(
            "Error"
        )
    }
    return currentAppContext;
}