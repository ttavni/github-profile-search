import { UserResponse, RepoResponse } from "../types/GithubTypes";

export const messageFormatter = (
  info: UserResponse,
  repos: Array<RepoResponse>
) => {
  const userInfo = `username: ${info.login}
  bio: ${info.bio}
  followers: ${info.followers}
  \n public repos: ${info.public_repos} 
  public gists: ${info.public_gists} \n`;

  const repoInfo = repos
    .slice(0, 4)
    .map(
      (repo: RepoResponse) =>
        `${repo.name} (${repo.stargazers_count + repo.forks_count})`
    )
    .join("\n");

  const message =
    `${userInfo}` + (repoInfo ? `\n top repos: \n ${repoInfo}` : `\n no repos`);

  return message;
};
