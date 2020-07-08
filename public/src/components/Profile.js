import React from "react";
import { useState, useEffect } from "react";

import Dropdown from "./Dropdown";
const options = [
  { label: "Gemini", value: "gemini" },
  { label: "Pisces", value: "pisces" },
  { label: "Leo", value: "leo" },
  { label: "Capricorn", value: "capricorn" },
];

function Profile({ userId }) {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [zodiac, setZodiac] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3010/api/v1/users/profile/${userId}`)
      .then((res) => res.json())
      .then((json) => {
        setUserProfile(json.data[0]);
        setLoading(false);
        setZodiac(
          options.filter(
            (option) => option.value === json.data[0].zodiac.toLowerCase()
          )[0]
        );
      })
      .catch((err) => console.log(err));
  }, [userId, options]);

  // #TODO Add success/error messages
  const onFormSubmit = (event) => {
    event.preventDefault(); // Prevent submit button from reloading page/form
    let body = { ...userProfile, zodiac: zodiac.value };
    // Make PUT fetch call to API server to update user
    fetch(`http://localhost:3010/api/v1/users/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  return (
    <div className="ui centered grid">
      <div className="ten wide column">
        <div className="ui container">
          <h1 className="ui center aligned icon header">Profile</h1>
          <form
            className={`ui ${loading ? "loading" : ""} form`}
            onSubmit={(event) => onFormSubmit(event)}
          >
            <div className="two fields">
              <div className="six wide field">
                <img
                  className="ui small circular image"
                  src={userProfile.avatar}
                  alt={`Avatar for ${userProfile.display_name}`}
                />
              </div>
              <div className="eight wide field">
                <label>Display Name</label>
                <input
                  type="text"
                  name="display_name"
                  value={userProfile.display_name || ""}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      display_name: e.target.value,
                    })
                  }
                ></input>
                <label>Email</label>
                <input
                  type="text"
                  value={userProfile.email || ""}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      email: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <div className="sixteen wide field">
              <label>Bio</label>
              <textarea
                rows="3"
                value={userProfile.bio || ""}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    bio: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="three fields">
              <div className="field">
                <label>Number Of Cats</label>
                <input
                  type="text"
                  value={
                    userProfile.number_of_cats === 0
                      ? String(0)
                      : userProfile.number_of_cats || ""
                  }
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      number_of_cats: e.target.value,
                    })
                  }
                ></input>{" "}
              </div>{" "}
              <div className="field">
                <label>Zipcode</label>
                <input
                  type="text"
                  value={userProfile.zipcode || ""}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      zipcode: e.target.value,
                    })
                  }
                ></input>{" "}
              </div>
              <Dropdown
                options={options}
                zodiac={zodiac}
                onZodiacChange={setZodiac}
                inputLabel="Zodiac"
              />
            </div>
            <button className="ui right floated primary button">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
