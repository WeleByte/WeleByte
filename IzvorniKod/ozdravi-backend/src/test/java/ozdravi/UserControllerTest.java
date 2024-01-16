package ozdravi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import ozdravi.domain.Instruction;
import ozdravi.domain.User;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.rest.dto.CreateUserRequest;
import ozdravi.rest.dto.InstructionDTO;
import ozdravi.rest.dto.UserDTO;
import ozdravi.service.InstructionService;
import org.springframework.security.test.context.support.WithMockUser;
import ozdravi.service.UserService;
import ozdravi.service.impl.DTOManager;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static ozdravi.InstructionControllerTest.asJsonString;


@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    @Autowired
    private MockMvc mock;

    @Autowired
    private DTOManager dtoManager;

    @MockBean
    private UserService userService;

    private List<User> allUsers;

    @BeforeEach
    void setUp() {
        allUsers = new ArrayList<>();
        User user1 = new User();
        user1.setId(1L);
        user1.setOib("39751670659");
        user1.setEmail("blabla@mail.com");
        user1.setFirst_name("Janko");
        user1.setLast_name("Bananko");
        user1.setPassword("pass");
        User user2 = new User();
        user2.setId(2L);
        user2.setOib("25768672773");
        user2.setEmail("bla@mail.com");
        user2.setFirst_name("Janko");
        user2.setLast_name("Bananko");
        user2.setPassword("pass");
        allUsers.add(user1);
        allUsers.add(user2);
    }

    @Test
    @WithMockUser(roles = {"PARENT"})
   //ovoj ruti smiju pristupiti samo admin, doctor i pediatrician
    void shouldReturnForbidden() throws Exception {
        mock.perform(get("/users/doctors")).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    //provjera u kontroleru da {role} moze biti samo doctor ili pediatrician
    void shouldReturnBadRequest() throws Exception{
        mock.perform(get("/users/parents"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(equalTo("Only doctors or pediatricians can be fetched")));
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    void shouldCreateNewUser() throws Exception{
        UserDTO userDTO = new UserDTO();
        userDTO.setId(3L);
        userDTO.setEmail("user@gmail.com");
        userDTO.setPassword("pass");
        userDTO.setFirst_name("Karla");
        userDTO.setLast_name("Tinic");
        userDTO.setOib("25768672773");
        User user = dtoManager.userDTOToUser(userDTO);

        List<String> roles = List.of("doctor");
        CreateUserRequest createUserRequest = new CreateUserRequest();
        createUserRequest.setUserDTO(userDTO);
        createUserRequest.setRoles(roles);

        when(userService.createUser(userDTO, roles)).thenReturn(user);
        MvcResult result = mock.perform(post("/users").contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(createUserRequest)))
                .andExpect(status().isCreated())
                .andReturn();
        assertThat(result.getResponse().getContentAsString()).isEqualTo(asJsonString(user));
    }

    @Test
    void shouldSuccesfullyRegister() throws Exception{
        User user = new User();
        user.setOib("25768672773");
        user.setEmail("bla@mail.com");
        user.setFirst_name("Janko");
        user.setLast_name("Bananko");
        user.setPassword("pass");
        UserDTO userDTO = dtoManager.userToUserDTO(user);
        when(userService.createUser(userDTO, List.of("parent"))).thenReturn(user);
        mock.perform(post("/register").contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(user)))
                .andExpect(status().isCreated())
                .andExpect(content().string(equalTo("Successfully registered")));
    }
}
