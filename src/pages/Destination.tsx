// DestinationPage.tsx
import React, { useState } from "react";
import TopBar from "../components/TopBar";
import LocationButtons from "../components/LocationButtons";
import LocationPostList from "../components/LocationPostList";

const DestinationPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  return (
    <div>
      <TopBar />
      <div style={{ marginTop: "5rem" }}>
        <LocationButtons onLocationSelect={setSelectedLocation} />
        <LocationPostList location={selectedLocation} />{" "}
        {/* Render posts for selected location */}
      </div>
      <div style={{ marginTop: "5rem" }}></div>
    </div>
  );
};

export default DestinationPage;
