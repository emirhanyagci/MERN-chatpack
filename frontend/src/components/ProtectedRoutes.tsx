import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {
  selectIsAuthed,
  setSession,
  setUserCredentials,
  User,
} from "@/features/user/userSlice";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useLazyGetCurrentUserQuery } from "@/services/userApi";
export default function ProtectedRoutes() {
  const [getUser, result] = useLazyGetCurrentUserQuery();
  const dispatch = useDispatch();
  const isAuthed = useSelector(selectIsAuthed);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        const token = JSON.parse(jwt);
        dispatch(setSession({ accessToken: token, isAuthed: true }));
        getUser().then(({ data: user }) => {
          dispatch(setUserCredentials(user as User));
        });
        //TOAST
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      //TOAST
      setIsLoading(false);
    }
  }, []);

  if (isLoading || result.isLoading)
    return (
      <div className="grid h-svh w-svw place-content-center">
        <Loader size={36} />
      </div>
    );
  if (!isAuthed) return <Navigate to="/" />;
  return <Outlet />;
}
