import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  balance: number;
}
const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("no token found");
        }
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentUser(response.data.currentUser);
      } catch (error) {
        setError("Error fetching user data: " + JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return { currentUser, error, loading };
};

export default useFetchCurrentUser;
