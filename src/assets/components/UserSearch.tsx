import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaGithubAlt } from "react-icons/fa";

const UserSearch = () => {
  const [userName, setUserName] = useState("");
    const [submittedUserName, setSubmittedUserName] = useState("");
  
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["users", submittedUserName],
      queryFn: async () => {
        const res = await fetch(
          `${import.meta.env.VITE_GITHUB_API_URL}/users/${submittedUserName}`,
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        if (!res.ok) throw new Error("Unable to find the searched User!");
  
        const data = await res.json();
        console.log(data);
        return data;
      },
      enabled: !!submittedUserName,
    });
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmedUserName = userName.trim();
      setSubmittedUserName(trimmedUserName);
    };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter Github Username..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
    </>
  );
};

export default UserSearch;
