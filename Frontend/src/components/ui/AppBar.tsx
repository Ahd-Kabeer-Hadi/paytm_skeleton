import { FC, useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import useFetchCurrentUser from "../hooks/useFetchCurrentUser";

export const AppBar: FC = () => {
  const { currentUser, loading } = useFetchCurrentUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    isLoading || !currentUser ? setIsLoading(true) : setIsLoading(false);
  }, [loading, currentUser]);

  const navigate = useNavigate();

  return (
    <>
      <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
          PayTM App{currentUser?.firstName}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center h-full mr-4">
            Hello {currentUser?.firstName ? currentUser?.firstName : "Guest"}
          </div>

          <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center mt-1 mr-2">
            <div className="flex flex-col justify-center items-center h-full text-xl">
              {currentUser?.firstName ? currentUser?.firstName.charAt(0).toUpperCase() : "G"}
            </div>
          </div>
          <div className="flex flex-col justify-center h-full ml-4  mt-1 mr-2">
            <Button
              label="Log out"
              onClick={(_e) => {
                localStorage.clear();
                navigate("/signin");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
