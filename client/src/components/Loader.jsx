import React from "react";
import { useLoading } from "../context/LoadingContext";
import "../styles/Loader.css";

function Loader() {
    const { loading } = useLoading();

    if (!loading) {
        return null;
    }

    return (
        <div className="global-loader">
            <div className="loader-spinner"></div>
            <p>Please wait...</p>
        </div>
    );
}

export default Loader;