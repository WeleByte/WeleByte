package ozdravi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String frontendUrl = System.getenv("FRONTEND_URL");
        if(frontendUrl == null) {
            frontendUrl = "http://localhost:3000";
        }

        registry.addMapping("/**")
                .allowedOrigins(frontendUrl)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
                .allowedHeaders("*");
    }
}