import React from "react";
import UserCard from "../components/UserCard";
import { useSelector } from "react-redux";
import type { RootState } from "../lib/redux/store";

const HomePage: React.FC = () => {
  const users = useSelector((state: RootState) => state.users);
  const loading = users.length === 0; // Basic loading check

  return (
    <main className="container mx-auto">
      <h2 className="text-xl font-semibold p-6">User profiles</h2>

      <div className="flex flex-wrap justify-center gap-6 p-6">
        {loading ? (
          <p className="text-xl font-semibold text-gray-500 animate-pulse">
            Loading users...
          </p>
        ) : (
          users.map((user, index) => <UserCard key={index} user={user} />)
        )}
      </div>
    </main>
  );
};

export default HomePage;
