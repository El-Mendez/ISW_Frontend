Feature: La contraseña debe de tener números, letras y ser al menos 8 caracteres.
  Scenario: Contraseña segura
    Given estoy en la página de crear cuenta
    When ingreso mi correo electrónico y contraseña corta
    Then me muestra un mensaje diciendo que mi contraseña debe de ser más larga
