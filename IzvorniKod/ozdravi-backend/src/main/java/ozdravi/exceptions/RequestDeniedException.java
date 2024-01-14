package ozdravi.exceptions;

public class RequestDeniedException extends RuntimeException{
    public RequestDeniedException(String message) {
        super(message);
    }
}
