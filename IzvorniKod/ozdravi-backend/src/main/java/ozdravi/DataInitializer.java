package ozdravi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import ozdravi.domain.User;
import ozdravi.service.UserService;

@Component
public class DataInitializer {
    @Autowired
    UserService userService;

    @Value("${progi.admin.password}")
    private String adminPasswordHash;

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        userService.createUser(new User("admin", adminPasswordHash));
    }
}
