import type { GithubUser } from "../types";

import { FaGithubAlt } from "react-icons/fa";

const UserCard = ({data}: {data:GithubUser}) => {
  return (
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
  );
};

export default UserCard;
