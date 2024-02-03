import React from "react";
import TopBar from "../components/TopBar";
import TravelPostForm from "../components/TravelPostForm";

const UploadPost = () => {
  return (
    <div>
      <TopBar />
      <div style={{ marginTop: "5rem" }}>
        <TravelPostForm />
        <div style={{ marginTop: "5rem" }}></div>
      </div>
      {/* The rest of your home page content will go here */}
    </div>
  );
};

export default UploadPost;
