@Test
@DisplayName("Good oib test")
void shouldReturnTrue() {
    assertTrue(ValidityUtil.isValidOib("39751670659"));
}