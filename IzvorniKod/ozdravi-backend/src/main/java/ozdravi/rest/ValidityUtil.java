package ozdravi.rest;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class ValidityUtil {
    private static final String emailRegex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
//            "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
//            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

//    TODO provjeriti je li okej set znakova koje se prihvaca
//    TODO treba li provjeravati pocinje li ime velikim slovom ILI cemo ga na silu mijenjati u veliko slovo
    public static boolean isValidName(String name){
        return name.length() >= 2
                && name.matches("^[a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\\\s]+$");
    }

    //TODO provjeriti radi li ova metoda
    public static boolean isValidEmail(String emailAdress){
        if(emailAdress.isEmpty()) return false;
        return Pattern.compile(emailRegex)
                .matcher(emailAdress)
                .matches();
    }

//    provjera OIBa po algoritmu na "https://regos.hr/app/uploads/2018/07/KONTROLA-OIB-a.pdf"
    public static boolean isValidOib(Long oib){
        if(oib.toString().length()!=11) return false;

        int num=0;
        for(int i=0; i<11; i++){
            if(i==0){
                num = getDigit(oib, i);
                num += 10;
            }else{
                num += getDigit(oib, i);
            }
            num = num % 10;
            if(num==0){
                num = 10;
            }
            num *= 2;
            num = num % 11;
        }
        num = (11 - num)%10;
        return num==getDigit(oib, 11);
    }

    private static int getDigit(long number, int i) {
        return (int) ((number / Math.pow(10, i - 1)) % 10);
    }
}
