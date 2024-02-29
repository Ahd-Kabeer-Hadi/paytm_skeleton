import BottomWarning from "../ui/BottomWarning";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import InputBox from "../ui/InputBox";
import SubHeading from "../ui/SubHeading";
const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"Email"}
            placeHolder="johndoe@mail.com"
            type={"email"}
          />
          <InputBox
            label={"Password"}
            placeHolder="mySecretPword"
            type={"password"}
          />
          <div className="pt-4">
            <Button label={"Sign in"} />
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
