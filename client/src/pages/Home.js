import React from "react";
// import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";

import Auth from "../utils/auth";
// import { useQuery } from "@apollo/client";
// import { QUERY_MESSAGES } from "../utils/queries";

const Home = () => {
  // const { loading, data } = useQuery(QUERY_MESSAGES);
  // const messages = data?.messages || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {/* <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}> */}
        {/* {loading ? (
            <div>Loading...</div>
          ) : (
            <MessageList messages={messages} title="Some Message(s)..." />
          )} */}
        {/* </div> */}

        {loggedIn && (
          <div className="col-12 mb-3">
            <MessageForm />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
