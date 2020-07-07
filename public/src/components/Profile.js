import React from "react";
import { useState } from "react";

function Profile({ userProfile }) {
  const [user, setProfile] = useState(userProfile);

  return (
    <div className="ui centered grid">
      <div className="ten wide column">
        <div className="ui container">
          <h1 className="ui center aligned icon header">Profile</h1>

          <form className="ui form">
            <div className="two fields">
              <div className="six wide field">
                <img
                  class="ui small circular image"
                  src="https://s3.amazonaws.com/uifaces/faces/twitter/snowshade/128.jpg"
                />
              </div>
              <div className="eight wide field">
                <label>Display Name</label>
                <input type="text" name="display_name" value=""></input>
                <label>Email</label>
                <input type="text"></input>{" "}
              </div>
            </div>
            <div className="sixteen wide field">
              <label>Bio</label>
              <textarea rows="2"></textarea>
            </div>
            <div className="three fields">
              <div className="field">
                <label>Number Of Cats</label>
                <input type="text"></input>{" "}
              </div>{" "}
              <div className="field">
                <label>Zipcode</label>
                <input type="text"></input>{" "}
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
            <button class="ui right floated primary button">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
