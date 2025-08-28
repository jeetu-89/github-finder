import type { GithubUser } from "../types";

const SuggestionDropdown = ({
  users,
  show,
  onSelect,
}: {
  users: GithubUser[];
  show: boolean;
  onSelect: (user: GithubUser) => void;
}) => {
  if(!show || users?.length === 0 ) return null;
  return (
    <ul className="suggestions">
      {users?.slice(0, 5).map((user: GithubUser) => (
        <li
          key={user.login}
          onClick={() => {
            onSelect(user);
          }}
        >
          <img src={user.avatar_url} alt={user.login} className="avatar-xs" />
          {user.login}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionDropdown;
