import "./styles.css";

import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../App";
import { useContext } from "react";


// Functional component for displaying a user icon
export default function UserIcon({userToIcon}) {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    if(!userToIcon) {
        userToIcon = user;
    }
    // Rendering a clickable colored circle representing the user icon
    if (!userToIcon) return null
    return (
        <div 
            onClick={() => navigate(`/users/${userToIcon.id}`)} 
            className="circle" 
        >
            {/* Adding initials to circle div */}
            {userToIcon.firstName.charAt(0)}
            {userToIcon.lastName.charAt(0)}
        </div>
    );
}