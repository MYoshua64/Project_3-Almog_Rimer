class AppConfig {
  public registerUrl = "http://localhost:4000/api/auth/register/";
  public loginUrl = "http://localhost:4000/api/auth/login";
  public vacationsUrl = "http://localhost:4000/api/vacations/";
  public followersUrl = "http://localhost:4000/api/followers/";
}

const appConfig = new AppConfig();

export default appConfig;
