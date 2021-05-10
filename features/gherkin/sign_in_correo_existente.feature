Feature: No se puede crear un usuario ya existente
  Scenario: Un usuario por correo
    Given estoy en la página de crear cuenta
    And ya tenía una cuenta
    When ingreso mi correo electrónico y contraseña
    Then me muestra un mensaje diciendo que mi usuario ya fue utilizado
