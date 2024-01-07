package ozdravi.rest.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateUserRequest {
    private UserDTO userDTO;
    private List<String> roles;
}
