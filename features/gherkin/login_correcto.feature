Feature: El usuario puede hacer el login
  Scenario: Login Correcto
    Given estoy en la página de iniciar sesión
    When trato de iniciar sesión con mi usuario y contraseña
    Then ve la pantalla del dashboard

