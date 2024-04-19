import React from "react";

const NoChatSelected = () => {
  return (
    <section className="selected-chat">
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h3>Select chat to start!</h3>
      </div>
    </section>
  );
};

export default NoChatSelected;
