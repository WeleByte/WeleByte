package ozdravi.rest;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class ValidityUtil {
    private static final String emailRegex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
//            "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
//            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

    public static boolean isValidEmail(String emailAdress){
        return Pattern.compile(emailRegex)
                .matcher(emailAdress)
                .matches();
    }

}
