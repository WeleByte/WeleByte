@Test
@DisplayName("Bad oib test")
void shouldReturnFalse() {
    assertFalse(ValidityUtil.isValidOib("397516706.9"));
}