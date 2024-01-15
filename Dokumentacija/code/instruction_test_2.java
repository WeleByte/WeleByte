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