import { useGetMyProfileQuery } from "@/src/lib/redux/features/auth/authApi";
import { selectCurrentUser } from "@/src/lib/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/lib/redux/hooks";

const useUserDetails = () => {
  const user = useAppSelector(selectCurrentUser);

  //   let loadedUser;

  const { data, isLoading } = useGetMyProfileQuery(undefined);

  //   loadedUser = data?.usersData;

  //   if (!user) {
  //     loadedUser = [];
  //     return { loadedUser };
  //   }

  //   return { loadedUser, isLoading };
  if (!user) {
    return { isLoading: false, userData: {} };
  }

  return { userData: data, isLoading };
};

export default useUserDetails;
