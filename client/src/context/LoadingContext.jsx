import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { setLoadingHandlers } from "../services/api";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
    };

    const stopLoading = () => {
        setLoading(false);
    };

    useEffect(() => {
        setLoadingHandlers(startLoading, stopLoading);
    }, []);

    return (
        <LoadingContext.Provider
            value={{
                loading,
                startLoading,
                stopLoading,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    return useContext(LoadingContext);
};