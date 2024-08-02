// src/components/Home/Home.js

import React, { useEffect, useState } from "react";
import { fetchUserInfo } from "../../service/homeServices";

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUsername(data.username);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <div>
      <h1>Welcome {username}</h1>
    </div>
  );
};

export default Home;
