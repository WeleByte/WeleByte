package ozdravi.exceptions;

public class EntityMissingException extends RuntimeException{
    public EntityMissingException(String message) {
        super(message);
    }
}
