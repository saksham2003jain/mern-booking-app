import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { loadStripe,Stripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

// Define the type for a toast message
type ToastMessage = {
    message: String; // The message to display
    type: "SUCCESS" | "ERROR"; // The type of the message
};

// Define the type for the context, which includes the showToast function
type AppContext = {
    showToast: (toastMessage: ToastMessage) => void; // Function to show a toast message
    isLoggedIn:boolean;
    stripePromise: Promise<Stripe | null>;
};

// Create the context with an initial value of undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

// Create the context provider component
export const AppContextProvider = ({
    children
}: {
    children: React.ReactNode; // The children that will be wrapped by the provider
}) => {
    const [toast,setToast] = useState<ToastMessage|undefined>(undefined); 

    const {isError} = useQuery("validateToken",apiClient.validateToken,{
        retry:false,
    }); 

    return (
        <AppContext.Provider value={
            { showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError,
            stripePromise
        } // Provide a default showToast function that does nothing
        }>
            {toast &&<Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={()=>setToast(undefined)}
            />}
            {children} {/* Render the children inside the provider */}
        </AppContext.Provider>
    );
};

export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context as AppContext;
};