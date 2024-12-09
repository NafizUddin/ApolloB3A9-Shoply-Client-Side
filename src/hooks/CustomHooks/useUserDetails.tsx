import { useGetMyProfileQuery } from "@/src/lib/redux/features/category/authApi";
import {
  // selectCurrentToken,
  selectCurrentUser,
} from "@/src/lib/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/lib/redux/hooks";

const useUserDetails = () => {
  const user = useAppSelector(selectCurrentUser);
  // const token = useAppSelector(selectCurrentToken);

  // console.log("from hook", token);

  const { data, isLoading } = useGetMyProfileQuery(undefined, {
    skip: !user,
  });

  // console.log("from hook", data?.userData);

  if (!user) {
    return { isLoading: false, userData: undefined };
  }

  return { userData: data, isLoading };
};

export default useUserDetails;
