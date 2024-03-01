import { useState } from "react";
import BottomWarning from "../ui/BottomWarning";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import InputBox from "../ui/InputBox";
import SubHeading from "../ui/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
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
              onClick={async (_e) => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  { username, password }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
