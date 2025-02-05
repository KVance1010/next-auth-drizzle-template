import { Suspense } from "react";
import { currentUser } from "@/utils/auth-session";
import { Profile } from "./_components/profile";

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile user={{ ...user }} />;
    </Suspense>
  );
};

export default ProfilePage;
