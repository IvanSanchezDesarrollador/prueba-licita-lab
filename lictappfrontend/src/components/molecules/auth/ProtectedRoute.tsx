import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../../../redux/store";
import { UserTokenInterface } from "../../../interface";
import { GetdataToken } from "../../../lib/helpers/GetdataToken";
import { setUser } from "../../../redux/userSlice";

const ProtectedRoute = () => {
  const tokenValidate = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  if (!tokenValidate) {
    return <Navigate to="/" replace />;
  }

  const TokenDecode: UserTokenInterface | null = GetdataToken();

  if (TokenDecode) {
    dispatch(setUser(TokenDecode));
  }

  return <Outlet />;
};

export default ProtectedRoute;
