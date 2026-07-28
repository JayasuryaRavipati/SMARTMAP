import { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");

      setUser(res.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        <img
          src="https://ui-avatars.com/api/?name=RouteIQ"
          alt="profile"
        />

        <h2>{user.name}</h2>

        <p>{user.role}</p>

        <hr />

        <h4>Email</h4>
        <p>{user.email}</p>

        <h4>Mobile</h4>
        <p>{user.mobile}</p>

        <h4>Driver ID</h4>
        <p>{user.driverId || "Not Assigned"}</p>

      </div>

    </div>
  );
}

export default Profile;