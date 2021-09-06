import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Router} from 'react-router-dom';
import Menu from "../../components/navbar/menu";
import '@testing-library/jest-dom';


test('Probando dirigirse al perfil de usuario', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <Menu />
    </Router>
  );
  const perfilItem = screen.getByText('Perfil');
  userEvent.click(perfilItem);
  expect(history.location.pathname).toBe('//profile');

})