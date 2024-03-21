import { useState } from "react";
import "./styles.css"

export default function UserForm({userToView, updateUserInfo}) {
    const [userData, setUserData] = useState(userToView);

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        if (name !== undefined) {
          if (type === "checkbox") {
            setUserData({ ...userData, [name]: checked });
          } else {
            setUserData({ ...userData, [name]: value });
          }
        }
      };
    
      // Calls method in ProfileView
      const handleSubmit = (e) => {
        e.preventDefault();
        
        updateUserInfo(userData)
      };

    return (
        <form onSubmit={handleSubmit}>
        <div className="user-form">
        <div>
            <h2>User Info</h2>
            <label>
                First Name
                <input type="text" name="firstName" onChange={handleChange} value={userData.firstName} />
            </label>
            <label>
                Last Name
                <input type="text" name="lastName" onChange={handleChange} value={userData.lastName} />
            </label>
            <label>
                Consent to us sending you emails?
                <input type="checkbox" name="consentSpam" onChange={handleChange} checked={userData.consentSpam} />
            </label>
        </div>
        <div>
            <h2>Contact Info</h2>
            <label>
                Email
                <input type="email" name="email" onChange={handleChange} value={userData.email}/>
            </label>
            <label>
                Phone Number
                <input type="text" name="phone" onChange={handleChange} value={userData.phone} />
            </label>
            <label>
                Address
                <input type="text" name="address" onChange={handleChange} value={userData.address} />
            </label>
        </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <input className="user-form-submit" type="submit" value="Save"/>
        </div>
      </form>
    )
}