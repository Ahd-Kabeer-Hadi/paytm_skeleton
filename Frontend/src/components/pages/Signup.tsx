import { useState } from "react";
import BottomWarning from "../ui/BottomWarning";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import InputBox from "../ui/InputBox";
import SubHeading from "../ui/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onchange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeHolder="John"
            type={"text"}
          />
          <InputBox
            onchange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
            placeHolder="Doe"
            type={"text"}
          />
          <InputBox
            onchange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
            placeHolder="johndoe@mail.com"
            type={"email"}
          />
          <InputBox
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeHolder="mySecretPword"
            type={"password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstName,
                    lastName,
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
