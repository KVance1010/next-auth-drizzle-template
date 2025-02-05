"use Client";

import { logout } from "@/actions/auth/logout";
// import { UpdateUserType } from "@/validation-schemas";
import { ExtendedUser } from "@/types/next-auth";

export const AdminForm = ({ user }: { user: ExtendedUser }) => {
  return (
    <form
      action={logout}
      className="flex h-screen flex-col items-center justify-center"
    >
      <h1>Admin Page</h1>
      <div>{`id: ${user.id}`}</div>
      <div>{`name: ${user.name}`}</div>
      <div>{`username: ${user.username}`}</div>
      <div>{`email: ${user.email}`}</div>
      <div>{`isTwoFactorEnabled: ${user.isTwoFactorEnabled}`}</div>
      <div>{`image: ${user.image}`}</div>
      <div>{`role: ${user.role}`}</div>
      <div>{`isOAuth: ${user.isOAuth}`}</div>

      <button
        className="border-2 mt-2 border-white py-[5px] px-[10px]"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
};
