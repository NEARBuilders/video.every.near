import React, { useState } from "react";

const GetAssets = ({ url }) => {
  if (!url) url = "http://localhost:3000/";

  const [data, setData] = useState(null);

  const handleApiCall = async () => {
    const data = await fetch(url);

    if (!data) {
      return;
    }

    const parsedData = await data.json();
    setData(parsedData);
  };

  return (
    <div>
      <button onClick={handleApiCall}>Call API</button>
      <div>
        <strong>API Response:</strong> {JSON.stringify(data)}
      </div>
    </div>
  );
};

export default GetAssets;
