package ozdravi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(DateTimeParseException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleDateTimeParseException(DateTimeParseException ex) {
        return new ResponseEntity<>("Invalid DateTime format", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        Map<String, String> props = new HashMap<>();
        props.put("message", e.getMessage());
        props.put("status", "400");
        props.put("error", "Bad Request");
        return new ResponseEntity<>(props, HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler(testException.class)
//    public ResponseEntity<?> handleTestException(testException e) {
//        Map<String, String> props = new HashMap<>();
//        props.put("message", e.getMessage());
//        props.put("status", "400");
//        props.put("error", "Bad Request");
//        return new ResponseEntity<>(props, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(RequestDeniedException.class)
    public ResponseEntity<?> handleUnauthorizedException(RequestDeniedException e) {
        Map<String, String> props = new HashMap<>();
        props.put("message", e.getMessage());
        props.put("status", "403");
        props.put("error", "Forbidden");
        return new ResponseEntity<>(props, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(EntityMissingException.class)
    public ResponseEntity<?> handleEntityMissingException(EntityMissingException e) {
        Map<String, String> props = new HashMap<>();
        props.put("message", e.getMessage());
        props.put("status", "404");
        props.put("error", "Not Found");
        return new ResponseEntity<>(props, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserDoesNotExistException.class)
    public ResponseEntity<?> handleUserDoesNotExistException(UserDoesNotExistException e) {
        Map<String, String> props = new HashMap<>();
        props.put("message", e.getMessage());
        props.put("status", "404");
        props.put("error", "Not Found");
        return new ResponseEntity<>(props, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUsernameNotFoundException(UsernameNotFoundException e) {
        Map<String, String> props = new HashMap<>();
        props.put("message", e.getMessage());
        props.put("status", "404");
        props.put("error", "Not Found");
        return new ResponseEntity<>(props, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(LoggedUserException.class)
    public ResponseEntity<?> handleLoggedUserException(LoggedUserException e) {
        Map<String, String> props = new HashMap<>();
        props.put("message", e.getMessage());
        props.put("status", "500");
        props.put("error", "Internal Server Error");
        return new ResponseEntity<>(props, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
