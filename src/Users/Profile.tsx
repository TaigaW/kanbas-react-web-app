import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams()
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();
  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/users/authenticate");
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const fetchedProfile = await client.getInfoByUsername(username); // getQuizById should be an API call to fetch quiz details
        setProfile(fetchedProfile);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
        // Handle the error appropriately, maybe show a message to the user
      }
    };

    fetchAccount();
  }, [username]);

  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div>
            <button onClick={save}>
                Save
            </button>
            <button onClick={signout}>
                Signout
            </button>

{/* 
            <div className="tabs">
        <button className="tab">Details</button>
        <button className="tab" onClick={viewQuestionsEditor}>Questions</button>
      </div>

      <input
        type="text"
        className="quiz-title-input"
        placeholder="Unnamed Quiz"
        value={quizName || ""}
        onChange={(e) => setQuizName(e.target.value)}
      />
             */}
          <input 
            value={profile.username} 
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })}
          />
          <input 
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })}
          />
          <input 
            value={profile.firstName} 
            placeholder="First Name"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })}
          />
          <input 
            value={profile.lastName} 
            placeholder="Last Name"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })}
          />
          <input 
            value={profile.dob} type="date" 
            onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })}
          />
          <input 
            value={profile.email} 
            placeholder="email"
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })}
          />
          <select onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      )}
    </div>
  );
}
