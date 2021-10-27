import React, { useState } from "react";

// import { useMutation } from "@apollo/client";
// import { ADD_MESSAGE } from "../../utils/mutation";
// import { QUERY_MESSAGES } from "../../utils/queries";

// const ThoughtForm = () => {
//   const [thoughtText, setText] = useState("");
//   const [characterCount, setCharacterCount] = useState(0);

//   const [addMessage, { error }] = useMutation(ADD_MESSAGE, {
//     update(cache, { data: { addMessage } }) {
//       try {
//         // update thought array's cache
//         // could potentially not exist yet, so wrap in a try/catch
//         const { messages } = cache.readQuery({ query: QUERY_MESSAGES });
//         cache.writeQuery({
//           query: QUERY_MESSAGES,
//           data: { messages: [addMessage, ...messages] },
//         });
//       } catch (e) {
//         console.error(e);
//       }

//       //   // update me object's cache
//       //   const { me } = cache.readQuery({ query: QUERY_ME });
//       //   cache.writeQuery({
//       //     query: QUERY_ME,
//       //     data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
//       //   });
//     },
//   });

//   // update state based on form input changes
//   const handleChange = (event) => {
//     if (event.target.value.length <= 280) {
//       setText(event.target.value);
//       setCharacterCount(event.target.value.length);
//     }
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await addMessage({
//         variables: { content },
//       });

//       // clear form value
//       setText("");
//       setCharacterCount(0);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       <p
//         className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
//       >
//         Character Count: {characterCount}/280
//         {error && <span className="ml-2">Something went wrong...</span>}
//       </p>
//       <form
//         className="flex-row justify-center justify-space-between-md align-stretch"
//         onSubmit={handleFormSubmit}
//       >
//         <textarea
//           placeholder="Here's a new thought..."
//           value={thoughtText}
//           className="form-input col-12 col-md-9"
//           onChange={handleChange}
//         ></textarea>
//         <button className="btn col-12 col-md-3" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

import Avatar from "./ProPic";

export default ({ direction, text, author }) => (
  <div
    style={{
      transform: direction === "incoming" && "scaleX(-1)"
    }}
  >
    <div className="flex justify-end my-4">
      <div className="flex items-end justify-end md:w-3/5 lg:2/5">
        <div className="mr-3">
          <div
            className="text-xs text-grey mb-1 mx-3"
            style={{
              transform: direction === "incoming" && "scaleX(-1)"
            }}
          >
            {author}
          </div>
          <div
            className={[
              "p-3 py-2 leading-normal text-sm",
              direction === "incoming"
                ? "bg-grey-lighter"
                : "gradient-primary text-white"
            ].join(" ")}
            style={{
              borderRadius: 10,
              transform: direction === "incoming" && "scaleX(-1)"
            }}
          >
            {text}
          </div>
        </div>
        <div className="mr-2">
          <Avatar
            initials={author}
            style={{
              transform: direction === "incoming" && "scaleX(-1)"
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
// CODE FROM https://github.com/jferrettiboke/react-chat-app/blob/master/client/components/TextMessage.js

export default Messages;
