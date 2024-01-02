package ozdravi.rest.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ChangeRoleRequest {
    @NotNull
    private Long roleId;
}

