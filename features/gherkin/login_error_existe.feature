Feature: Usuarios que no existen no pueden iniciar sesión
  Scenario: Login incorrecto
    Given estoy en la página de iniciar sesión
    And tengo una cuenta
    When trato de iniciar sesión con mi usuario y contraseña
    Then me muestra una alerta diciendo que la contraseña o el usuario no son correctos.
