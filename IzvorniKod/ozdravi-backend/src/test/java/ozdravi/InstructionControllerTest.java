package ozdravi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import ozdravi.domain.Instruction;
import ozdravi.domain.User;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.rest.dto.InstructionDTO;
import ozdravi.service.InstructionService;
import org.springframework.security.test.context.support.WithMockUser;
import ozdravi.service.impl.DTOManager;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
public class InstructionControllerTest {
    @Autowired
    private MockMvc mock;

    @MockBean
    private InstructionService instructionService;

    private List<Instruction> allInstructions;
    private List<User> allUsers;

    @BeforeEach
    void setUp() {
        allInstructions = new ArrayList<>();
        allUsers = new ArrayList<>();
        User doctor = new User();
        doctor.setId(1L);
        doctor.setOib("39751670659");
        doctor.setEmail("blabla@mail.com");
        doctor.setFirst_name("Janko");
        doctor.setLast_name("Bananko");
        doctor.setPassword("pass");
        User patient = new User();
        patient.setId(2L);
        patient.setOib("25768672773");
        patient.setEmail("bla@mail.com");
        patient.setFirst_name("Janko");
        patient.setLast_name("Bananko");
        patient.setPassword("pass");
        allUsers.add(doctor);
        allUsers.add(patient);
        Instruction instruction = Instruction.builder()
                .id(1L)
                .doctor(doctor)
                .patient(patient)
                .content("blabla")
                .build();
        allInstructions.add(instruction);
    }

    @Test
    @WithMockUser
    void shouldReturnAllInstructions() throws Exception {
        when(instructionService.list()).thenReturn(allInstructions);
        mock.perform(get("/instructions"))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    void shouldAddInstruction() throws Exception {
        Instruction instruction = new Instruction(2L, allUsers.get(0), allUsers.get(1), LocalDateTime.now(), "bla");
        InstructionDTO instructionDTO = new InstructionDTO(instruction);
        when(instructionService.createInstruction(any(InstructionDTO.class))).thenReturn(instruction);
        MvcResult result = mock.perform(post("/instructions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(instructionDTO)))
                .andExpect(status().isCreated())
                .andReturn();
        assertThat(result).isNotNull();
        assertThat(result.getResponse().getContentAsString()).isNotEmpty();
        assertThat(result.getResponse().getContentAsString()).isEqualTo(asJsonString(instruction));
    }

    @Test
    @WithMockUser
    void shouldHandleEntityMissingException() throws Exception{
        Long id = 45L;
        when(instructionService.findById(id)).thenThrow(new EntityMissingException("No instruction with such id"));
        mock.perform(get("/instruction/{id}", id)).andExpect(status().isNotFound());
    }
    public static String asJsonString(final Object obj) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
