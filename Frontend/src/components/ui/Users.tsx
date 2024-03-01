import { FC, useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserProps {
  firstName: string;
  lastName: string;
  _id: number;
}

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchData = async ()=>{
    try {
      await axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {headers:{
        Authorization:"Bearer "+ localStorage.getItem('token')
      }})
      .then((response) => {
        setUsers(response.data.users);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData()
  }, [filter]);


  
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users && users.length > 0 ? (
          users.map((user:UserProps) => <User key={user._id} {...user} />)
        ) : (
          <p>No user found</p>
        )}
      </div>
    </>
  );
};



const User: FC<UserProps> = ({ firstName, lastName, _id }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {firstName.charAt(0)}
            </div>
          </div>
          <div className="flex flex-col justify-center h-ful">
            <div>
              {firstName} {lastName}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
          <Button
            label="Send Money"
            onClick={(_e) => {
              navigate("/send?id=" + _id.toString() + "&name=" + firstName);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
