export const fetchGithubUser = async (submittedUserName: string) => {
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
};
