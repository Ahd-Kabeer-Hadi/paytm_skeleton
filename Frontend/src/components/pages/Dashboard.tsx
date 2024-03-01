import { useEffect, useState } from "react";
import AppBar from "../ui/AppBar";
import Balance from "../ui/Balance";
import Users from "../ui/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const findBalance = async () => {
    try {
      await axios
        .get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setBalance(response.data.balance);
        });
    } catch (error) {
      console.error("Error fetching login state data:", error);
    }
  };

  useEffect(() => {
    findBalance();
  }, [balance]);

  return (
    <div>
      <AppBar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
