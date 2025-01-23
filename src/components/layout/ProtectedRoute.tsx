import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { useCurrentToken, useCurrentUser } from "../../redux/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  //NOTE General way to take the token
  // const token = useAppSelector((state) => state.auth.token);

  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  console.log({ token }, { user });
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
