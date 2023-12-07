package ozdravi.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ozdravi.domain.User;
import java.util.regex.Pattern;

@Service
public class ValidityUtil {

    public static ResponseEntity<String> checkUserValidity(User user){
        if(!isValidEmail(user.getUsername()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is not valid");

        if(!isValidOib(user.getOib()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OIB is not valid");

        if(!isValidName(user.getFirst_name()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("First name is not valid");

        if(!isValidName(user.getLast_name()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Last name is not valid");

        return ResponseEntity.ok().build();
    }

    private static final String emailRegex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
//            "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
//            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

//    TODO provjeriti je li okej set znakova koje se prihvaca
//    TODO treba li provjeravati pocinje li ime velikim slovom ILI cemo ga na silu mijenjati u veliko slovo
    public static boolean isValidName(String name){
        return name.length() >= 2
                && name.matches("^[a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\\\s]+$");
    }

    public static boolean isValidEmail(String emailAdress){
        if(emailAdress.isEmpty()) return false;
        return Pattern.compile(emailRegex)
                .matcher(emailAdress)
                .matches();
    }

//    provjera OIBa po algoritmu na "https://regos.hr/app/uploads/2018/07/KONTROLA-OIB-a.pdf"
    public static boolean isValidOib(String oib) {
        if (oib.length() != 11) return false;

        int num = 0;
        for (int i = 0; i < 10; i++) {

            if (i == 0) {
                num = Integer.parseInt(oib.substring(i, i + 1));
                num += 10;
            } else {
                num += Integer.parseInt(oib.substring(i, i + 1));
            }
            num = num % 10;
            if (num == 0) {
                num = 10;
            }
            num *= 2;
            num = num % 11;
        }
        num = (11 - num) % 10;
        return num == Integer.parseInt(oib.substring(10, 11));
    }
}
