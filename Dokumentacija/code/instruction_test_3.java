@Test
@WithMockUser
void shouldHandleEntityMissingException() throws Exception{
    Long id = 45L;
    when(instructionService.findById(id)).thenThrow(new EntityMissingException("No instruction with such id"));
    mock.perform(get("/instruction/{id}", id)).andExpect(status().isNotFound());
}