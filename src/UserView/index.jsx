import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./styles.css"
import UserIcon from "../UserIcon";
import UserForm from "./UserForm";
import { AuthContext } from "../App";
import { environment } from "../environments/environment";

export default function UserView() {
    const [userToView, setUserToView] = useState(null)
    const { id } = useParams();

    const { user, setUser } = useContext(AuthContext);

    // Find user based on id
    useEffect(() => {
        if (id) {
            if (user && Number(user.id) === Number(id)) {
                setUserToView(user);
            } else {
                fetch(`${environment.apiUrl}users/${id}`, {
                    Method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                  })
                .then(res => res.json())
                .then(data => setUserToView(data.data))
            }
        }
    }, [user, id]);

    // Update user in API and local state with new userInfo
    const updateUserInfo = (userInfo) => {
        fetch(`${environment.apiUrl}users/${userInfo.id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            'Accept': 'application/json',
            "Content-Type": "application/json",
            },
        body: JSON.stringify(userInfo),
        }).then(res => {
        if (res.ok) {
            if (Number(user.id) === Number(id)) {
                setUser(userInfo)
                localStorage.setItem("authUser", JSON.stringify(userInfo));
            }
        }
        }).catch(error => console.error("Problem with updating user: ", error))
    }

    if (!userToView) return <h1>User not found</h1>

    return (
        <div className="profile-view-container main">
            <div className="profile-view-info-container">
                <div className="profile-view-info-header">
                    <UserIcon userToIcon={userToView}/>
                    <h1>{userToView.firstName} {userToView.lastName}</h1>
                </div>
                <UserForm userToView={userToView} updateUserInfo={updateUserInfo}/>
            </div>
        </div>
    )
}