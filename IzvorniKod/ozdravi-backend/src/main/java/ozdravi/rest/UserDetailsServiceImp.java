package ozdravi.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ozdravi.domain.User;
import ozdravi.service.UserService;

import java.util.List;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

public class UserDetailsServiceImp implements UserDetailsService {
    @Value("${progi.admin.password}")
    private String adminPasswordHash;

    @Autowired  //bug -> baca warning da je krivo anotiran iako nije
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if("admin".equals(email)){
            return new org.springframework.security.core.userdetails.User(
                    email,
                    adminPasswordHash,
                    authorities(email)
            );
        } else {
            User user = userService.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException(email + " not registered"));

            return new org.springframework.security.core.userdetails.User(
                    email,
                    user.getPassword(),
                    authorities(email)
            );
        }
    }

    private List<GrantedAuthority> authorities(String email) {
        if("admin".equals(email))
            return commaSeparatedStringToAuthorityList("ROLE_ADMIN");

        User user = userService.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException(email + " not registered"));

        String authorityString = "ROLE_USER";

        //TODO roles predlozak
//        if(false /*doktor?*/){
//            authorityString += ", ROLE_DOCTOR";
//        }else if(false /*pedijatar?*/){
//            authorityString += ", ROLE_PEDIATRICIAN";
//        }

        return commaSeparatedStringToAuthorityList(authorityString);
    }
}
