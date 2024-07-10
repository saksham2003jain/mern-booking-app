import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAppContext } from "../contexts/AppContext"; // Ensure this is the correct path
import SignOutButton from "./SignOutButton";

const Header = () => {
    // Use the custom hook to get the isLoggedIn value from the context
    const { isLoggedIn } = useAppContext();

    return (
        <div className="bg-stone-500 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">NobleNights</Link> {/* Link to the home page */}
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? 
                        <>
                            <Link 
                            className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                             to="/my-bookings">My Bookings</Link> {/* Link to the bookings page */}
                            <Link 
                            className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                            to="/my-hotels">My Hotels</Link> {/* Link to the hotels page */}
                            <SignOutButton /> {/* Sign out button */}
                        </>
                     : (
                        <Link
                            to="/sign-in"
                            className="flex bg-white items-center text-stone-600 px-3 font-bold hover:bg-grey-100" // Fixed the typo here
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
