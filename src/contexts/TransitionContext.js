"use client";
import { createContext, useContext } from "react";

const TransitionContext = createContext({ transitionDone: true });

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ Value, children }) => (
    <TransitionContext.Provider value={Value}>
        {children}
    </TransitionContext.Provider>
);
