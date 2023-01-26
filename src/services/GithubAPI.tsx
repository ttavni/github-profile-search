import axios from "axios";

const getUserInfo = async (username: string) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

const getUserRepos = async (username: string) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  // Sort descending by total number of stars + forks
  return response.data.sort(
    (
      a: {
        stargazers_count: number;
        forks_count: number;
      },
      b: {
        stargazers_count: number;
        forks_count: number;
      }
    ) =>
      b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count)
  );
};

const getUser = async (username: string) => {
  const user = await getUserInfo(username);
  const repos = await getUserRepos(username);
  return [user, repos];
};

export default getUser;
