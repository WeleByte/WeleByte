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