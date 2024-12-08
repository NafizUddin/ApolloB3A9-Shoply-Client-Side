import { useGetMyProfileQuery } from "@/src/lib/redux/features/category/authApi";
import { selectCurrentUser } from "@/src/lib/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/lib/redux/hooks";

const useUserDetails = () => {
  const user = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetMyProfileQuery(undefined);

  if (!user) {
    return { isLoading: false, userData: undefined };
  }

  return { userData: data, isLoading };
};

export default useUserDetails;
