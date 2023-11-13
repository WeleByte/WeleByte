package ozdravi.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class MainConfig {

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        String dbEnv = System.getenv("DATABASE_URL");
        String username;
        String password;
        String dbUrl;

        if(dbEnv != null) {
            URI dbUri = new URI(dbEnv);

            username = dbUri.getUserInfo().split(":")[0];
            password = dbUri.getUserInfo().split(":")[1];
            dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";


        } else {
            username = "welebyte";
            password = "welebyte";
            dbUrl = "jdbc:postgresql://localhost:5432/ozdravi";
        }

        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.postgresql.Driver");
        dataSourceBuilder.url(dbUrl);
        dataSourceBuilder.username(username);
        dataSourceBuilder.password(password);

        return dataSourceBuilder.build();
    }
}
