import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logOutUser, saveAuthData } from "../features/auth/authSlice";
import { ErrorNotify } from "../utils/getNotify";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("financeAuth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      const currentTimestamp = moment().unix();
      const checkExpire = auth?.expireAt > currentTimestamp;
      if (auth?.token) {
        if (checkExpire) {
          dispatch(saveAuthData(auth));
        } else {
          dispatch(logOutUser());
          ErrorNotify("Session Expired");
        }
      } else {
        dispatch(logOutUser());
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);
  return authChecked;
}
