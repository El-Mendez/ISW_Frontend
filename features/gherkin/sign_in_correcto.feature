Feature: Crear una nueva cuenta
  Scenario: Sign In
    Given estoy en la página de crear cuenta
    When ingreso mi correo electrónico y contraseña
    Then una nueva cuenta fue creada
