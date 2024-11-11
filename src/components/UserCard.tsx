import React from "react";
import type { User } from "../lib/types";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="max-w-sm min-w-[250px] rounded-lg border border-gray-300 shadow-lg bg-white overflow-hidden">
      <div className="p-4 flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full border-2 border-gray-200"
          src={user.profilePhoto}
          alt={`${user.name}'s profile`}
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {user.name}
        </h2>
        <p className="text-gray-500 text-sm">{user.email}</p>

        <p className="mt-2 text-gray-700">{user.role}</p>

        <p
          className={`mt-2 px-4 py-1 text-sm rounded-full ${
            user.status
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
