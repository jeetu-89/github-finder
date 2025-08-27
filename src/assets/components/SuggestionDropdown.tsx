import type { GithubUser } from "../types";

const SuggestionDropdown = ({
  users,
  onSelect,
}: {
  users: GithubUser[];
  onSelect: (user: GithubUser) => void;
}) => {
  return (
    <ul className="suggestions">
      {users.slice(0, 5).map((user: GithubUser) => (
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
