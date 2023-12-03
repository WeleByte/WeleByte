package ozdravi.rest;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class    ValidityUtil {
    private static final String emailRegex = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
//            "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
//            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

    //TODO check if these methods work as intended
    public static boolean isValidEmail(String emailAdress){
        if(emailAdress.isEmpty()) return false;
        return Pattern.compile(emailRegex)
                .matcher(emailAdress)
                .matches();
    }

    public static boolean isValidOib(String oib){
        if(oib.length()!=11) return false;

        int num=0;
        for(int i=0; i<11; i++){
            if(i==0){
                num= Integer.parseInt(oib.substring(i,i+1));
                num +=10;
            }else{
                num += Integer.parseInt(oib.substring(i,i+1));
            }
            num = num % 10;
            if(num==0){
                num = 10;
            }
            num *= 2;
            num = num % 11;
        }
        num = (11 - num)%10;
        return Integer.valueOf(num).toString().equals(oib.substring(10,11));
    }

    public static boolean isNotUsedOib(String oib){
        return true;
    }
}
