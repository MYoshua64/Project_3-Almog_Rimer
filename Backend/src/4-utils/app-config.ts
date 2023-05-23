class AppConfig {

    // Server Port:
    public port = 4000;

    //Server Url:
    public serverUrl = "http://localhost:" + this.port;

    //Images Url
    public imagesUrl = this.serverUrl + "/api/vacations/images/";
}

class DevelopmentConfig extends AppConfig{

    public isDevelopment = true;
    public isProduction = false;

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "vacation_db";
}

class ProductionConfig extends AppConfig{
    
    public isDevelopment = false;
    public isProduction = true;

    // Database Host (on which computer the database exists):
    public mySqlHost = "";

    // Database User
    public mySqlUser = "";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "";
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
