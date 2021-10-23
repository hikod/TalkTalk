import React from "react";
// import Messages from "../components/Messages";

import Auth from "../utils/auth";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && <div className="col-12 mb-3">{/* <Messages /> */}</div>}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          <div>Testing</div>
        </div>
        {loggedIn ? <div className="col-12 col-lg-3 mb-3"></div> : null}
      </div>
    </main>
  );
};

export default Home;
