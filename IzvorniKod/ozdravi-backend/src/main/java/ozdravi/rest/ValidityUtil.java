package ozdravi.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ozdravi.domain.User;
import ozdravi.rest.dto.UserDTO;
import ozdravi.service.UserService;
import ozdravi.service.impl.DTOManager;

import java.util.regex.Pattern;

//klasa za provjeru ispravnosti podataka
//public metode su za koristenje van klase, a privatne su pomocne metode
@Service
public class ValidityUtil {

    @Autowired
    private UserService userService;

    public static void checkUserDTOForLoops(UserDTO userDTO){
        if(userDTO.getParent_id()!=null && userDTO.getParent_id().equals(userDTO.getId()))
            throw new IllegalArgumentException("User cannot be their own parent");

        if(userDTO.getDoctor_id()!=null && userDTO.getDoctor_id().equals(userDTO.getId()))
            throw new IllegalArgumentException("User cannot be their own doctor");
    }

    public static void checkUserValidity(User user){
        if(!isValidEmail(user.getEmail()))
            throw new IllegalArgumentException("Email is not valid");

        if(!isValidOib(user.getOib()))
            throw new IllegalArgumentException("OIB is not valid");

        if(!isValidName(user.getFirst_name()))
            throw new IllegalArgumentException("First name is not valid");

        if(!isValidName(user.getLast_name()))
            throw new IllegalArgumentException("Last name is not valid");
    }

    public static final String emailRegex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
//            "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
//            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

//    TODO treba li provjeravati pocinje li ime velikim slovom ILI cemo ga na silu mijenjati u veliko slovo
    private static boolean isValidName(String name){
        return name.length() >= 2
                && name.matches("^[a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\\\s]+$");
    }

    private static boolean isValidEmail(String emailAdress){
        if(emailAdress.isEmpty()) return false;
        return Pattern.compile(emailRegex)
                .matcher(emailAdress)
                .matches();
    }

//    provjera OIBa po algoritmu na "https://regos.hr/app/uploads/2018/07/KONTROLA-OIB-a.pdf"
    public static boolean isValidOib(String oib) {
        if (oib.length() != 11) return false;
        try{
            Long.parseLong(oib);
        } catch (NumberFormatException e){
            return false;
        }

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
