package ozdravi;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import ozdravi.rest.ValidityUtil;

import static org.junit.jupiter.api.Assertions.*;

public class OibTest {
    @Test
    @DisplayName("Good oib test")
    void shouldReturnTrue() {
        assertTrue(ValidityUtil.isValidOib("39751670659"));
    }

    @Test
    @DisplayName("Bad oib test")
    void shouldReturnFalse() {
        assertFalse(ValidityUtil.isValidOib("397516706.9"));
    }
}
