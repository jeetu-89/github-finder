export const fetchGithubUser = async (submittedUserName: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${submittedUserName}`
  );
  if (!res.ok) throw new Error("Unable to find the searched User!");

  const data = await res.json();
  console.log(data);
  return data;
};

export const searchGithubUsers = async (query: string)=>{
  const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);
  if(!res.ok) throw new Error('Unable to search the provided query!');

  const {items: suggestions} = await res.json();
  return suggestions;
}