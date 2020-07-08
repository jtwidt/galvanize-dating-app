import React from "react";
import { useState, useEffect } from "react";

function Profile({ userId }) {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3010/api/v1/users/profile/${userId}`)
      .then((res) => res.json())
      .then((json) => {
        setUserProfile(json.data[0]);
        setLoading(false);
        console.log(json.data[0]);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const onFormSubmit = (event) => {
    event.preventDefault(); // Prevent submit button from reloading page/form
    // Make PUT fetch call to API server to update user
    fetch(`http://localhost:3010/api/v1/users/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userProfile),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  return (
    <div className="ui centered grid">
      {/* {console.log(userProfile)} */}
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
              <div className="field">Add Zodiac</div>
            </div>
            {/* <div class="field"> #FIXME Add dropdown based on udemy class
              <label>Zodiac</label>
              <div class="ui selection dropdown">
                <input type="hidden" name="gender" />
                <i class="dropdown icon"></i>
                <div class="default text">Gender</div>
                <div class="menu">
                  <div class="item" data-value="1">
                    Male
                  </div>
                  <div class="item" data-value="0">
                    Female
                  </div>
                </div>
              </div>
            </div> */}
            <button className="ui right floated primary button">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
