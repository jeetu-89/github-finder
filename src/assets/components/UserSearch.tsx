import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaGithubAlt } from "react-icons/fa";
import { fetchGithubUser, searchGithubUsers } from "../api/github";
import RecentSearches from "./RecentSearches";
import { useDebounce } from "use-debounce";
import type { GithubUser } from "../types";
import SuggestionDropdown from "./SuggestionDropdown";

const UserSearch = () => {
  //states
  const [userName, setUserName] = useState("");
  const [submittedUserName, setSubmittedUserName] = useState("");
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const val = localStorage.getItem("recentUsers");
    return val ? JSON.parse(val) : [];
  });
  const [debouncedUser] = useDebounce(userName, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //Queries
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUserName],
    queryFn: () => fetchGithubUser(submittedUserName),
    enabled: !!submittedUserName,
  });

  const { data: suggestions, refetch } = useQuery({
    queryKey: ["github-user-suggestions", debouncedUser],
    queryFn: () => searchGithubUsers(debouncedUser),
    enabled: debouncedUser.length > 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUserName = userName.trim();
    if (!trimmedUserName) return;
    setRecentUsers((prev) => {
      const updatedUsers = [
        trimmedUserName,
        ...prev.filter((user) => user != trimmedUserName),
      ];
      return updatedUsers.slice(0, 5);
    });
    setSubmittedUserName(trimmedUserName);
  };

  //SideEffects
  useEffect(() => {
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="dropdown-wrapper">
          <input
            type="text"
            placeholder="Enter Github Username..."
            value={userName}
            onChange={(e) => {
              const val = e.target.value;
              setUserName(val);
              setShowSuggestions(val.trim().length > 1);
            }}
          />
          {showSuggestions && suggestions?.length > 0 && (
            <SuggestionDropdown
              users={suggestions}
              onSelect={(user) => {
                setUserName(user.login);
                setShowSuggestions(false);
                if (submittedUserName !== user.login) {
                  setSubmittedUserName(user.login);
                } else {
                  refetch();
                }
                setRecentUsers((prev) => {
                  const updatedUsers = [
                    user.login,
                    ...prev.filter((username) => username !== user.login),
                  ];
                  return updatedUsers.slice(0, 5);
                });
              }}
            />
          )}
        </div>
        <button type="submit">Search </button>
      </form>

      {isLoading && <p className="status">Loading...</p>}
      {isError && <p className="status error">{error.message}</p>}

      {data && (
        <div className="user-card">
          <img src={data.avatar_url} alt={data.name} className="avatar" />
          <h2>{data.name || data.profile}</h2>
          <p className="bio">{data?.bio}</p>
          <a
            href={data.html_url}
            className="profile-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubAlt />
            View Github profile
          </a>
        </div>
      )}

      {recentUsers.length > 0 && (
        <RecentSearches
          users={recentUsers}
          onSelect={(user: string) => {
            setUserName(user);
            setSubmittedUserName(user);
          }}
        />
      )}
    </>
  );
};

export default UserSearch;
