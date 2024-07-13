import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthed, setSession } from "@/features/user/userSlice";
import { useEffect, useState } from "react";
import Loader from "./Loader";
export default function ProtectedRoutes() {
  const dispatch = useDispatch();
  const isAuthed = useSelector(selectIsAuthed);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isAuthed);
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("jwt");
      console.log(jwt);
      if (jwt) {
        const token = JSON.parse(jwt);
        dispatch(setSession({ accessToken: token, isAuthed: true }));
        console.log(token);
        //TOAST
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      //TOAST
      setIsLoading(false);
    }
  }, []);

  if (isLoading)
    return (
      <div className="grid h-svh w-svw place-content-center">
        <Loader size={36} />
      </div>
    );
  if (!isAuthed) return <Navigate to="/" />;
  return <Outlet />;
}
