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