@Test
@WithMockUser
void shouldReturnAllInstructions() throws Exception {
    when(instructionService.list()).thenReturn(allInstructions);
    mock.perform(get("/instructions"))
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)));
}