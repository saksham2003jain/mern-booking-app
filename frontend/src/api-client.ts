import { RegisterFormData } from "./pages/Register"; // Importing the type definition for the registration form data
import { SignInFormData } from "./pages/Signin"; // Importing the type definition for the sign-in form data
import { HotelSearchResponse, HotelType } from './type';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""; // In Vite, this is how we read environment variables from .env file

// Function to handle user registration
export const register = async (formData: RegisterFormData) => {
    // Sending a POST request to the register endpoint with the form data
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST", // HTTP method
        credentials: "include", // Include credentials (cookies, etc.) in the request
        headers: {
            "Content-Type": "application/json", // Setting the content type to JSON
        },
        body: JSON.stringify(formData), // Converting form data to JSON string
    });

    // Parsing the JSON response from the server
    const responseBody = await response.json();

    // If the response is not OK (status code is not in the range 200-299), throw an error
    if (!response.ok) {
        throw new Error(responseBody.message); // Throwing an error with the message from the server response
    }
};

// Function to handle user sign-in
export const signIn = async (formData: SignInFormData) => {
    // Sending a POST request to the sign-in endpoint with the form data
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST", // HTTP method
        credentials: "include", // Include credentials (cookies, etc.) in the request
        headers: {
            "Content-Type": "application/json" // Setting the content type to JSON
        },
        body: JSON.stringify(formData) // Converting form data to JSON string
    });

    // Parsing the JSON response from the server
    const body = await response.json();

    // If the response is not OK (status code is not in the range 200-299), throw an error
    if (!response.ok) {
        throw new Error(body.message); // Throwing an error with the message from the server response
    }

    return body; // Returning the parsed JSON response
}

// Function to validate the user's token
export const validateToken = async () => {
    // Sending a GET request to the validate-token endpoint
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include" // Include credentials (cookies, etc.) in the request
    });

    // If the response is not OK (status code is not in the range 200-299), throw an error
    if (!response.ok) {
        throw new Error("token invalid"); // Throwing an error indicating the token is invalid
    }

    return response.json(); // Returning the parsed JSON response
};


export const signOut = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",
    });
    if(!response.ok){
        throw new Error("error while signing out");
    }
};

export const addMyHotel = async (hotelFormData:FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials:"include",
        body: hotelFormData
    });
    if(!response.ok){
        throw new Error("Failed to add Hotel");
    }

    return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Error Fetching hotels: ${response.statusText}`);
    }

    const data: HotelType[] = await response.json();

    return data;
};

export const fetchMyHotelById = async(hotelId: string):Promise<HotelType>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials:"include"
    });
    if(!response.ok){
        throw new Error("Error fecthing Hotels");
    }
    return response.json();
};

export const updataMyHotelById = async(hotelFormData:FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        method:"PUT",
        body:hotelFormData,
        credentials:"include",
    });
    if(!response.ok){
        throw new Error("Failed to update Hotel");
    }
    return response.json();
};

export type SearchParams = {
    destination?:string;
    checkIn?:string;
    checkOut?:string;
    adultCount?:string;
    childCount?:string;
    page?:string;
    facilities?:string[];
    types?:string[];
    stars?:string[];
    maxPrice?:string;
    sortOption?:string;
};
export const searchHotels = async(searchParams:SearchParams):Promise<HotelSearchResponse>=>{
    const queryParams = new URLSearchParams();
    queryParams.append("destination",searchParams.destination||"");
    queryParams.append("checkIn",searchParams.checkIn||"");
    queryParams.append("checkOut",searchParams.checkOut||"");
    queryParams.append("adultCount",searchParams.adultCount||"");
    queryParams.append("childCount",searchParams.childCount||"");
    queryParams.append("page",searchParams.page||"");

    queryParams.append("maxPrice",searchParams.maxPrice||"");
    queryParams.append("sortOption",searchParams.sortOption||"");
    
    searchParams.facilities?.forEach((facility)=> 
    queryParams.append("facilities",facility)
    );

    searchParams.types?.forEach((type)=>
    queryParams.append("types",type)
    );

    searchParams.stars?.forEach((star)=>
    queryParams.append("stars",star)
    );


    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if(!response.ok){
        throw new Error("Error Fetching Hotels");
    }
    return response.json();
};

export const fetchHotelById = async(hotelId:string):Promise<HotelType>=>{
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

    if(!response.ok){
        throw new Error("error fetching Hotels");
    }
    return response.json();
};