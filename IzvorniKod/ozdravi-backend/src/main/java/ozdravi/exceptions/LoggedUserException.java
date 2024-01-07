package ozdravi.exceptions;

public class LoggedUserException extends RuntimeException{
    public LoggedUserException(String message) {
        super(message);
    }
}
