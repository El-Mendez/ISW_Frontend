import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Menu from '../../components/navbar/menu';
import '@testing-library/jest-dom';

it('Probando dirigirse al perfil de usuario', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const perfilItem = screen.getByText('Perfil');
  userEvent.click(perfilItem);
  expect(history.location.pathname).toBe('//profile');
});
it('Probando dirigirse a la lista de amigos', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const perfilItem = screen.getByText('Ver amigos');
  userEvent.click(perfilItem);
  expect(history.location.pathname).toBe('//friends');
});
it('Probando dirigirse a las recomendaciones por cursos', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const courseItem = screen.getByText('Por cursos en común');
  userEvent.click(courseItem);
  expect(history.location.pathname).toBe('//search/courses');
});
it('Probando dirigirse a las solicitudes enviadas', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const courseItem = screen.getByText('Solicitudes enviadas');
  userEvent.click(courseItem);
  expect(history.location.pathname).toBe('//sent_request');
});
it('Probando dirigirse a las recomendaciones por hobbies', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const courseItem = screen.getByText('Por hobbies en común');
  userEvent.click(courseItem);
  expect(history.location.pathname).toBe('//search/hobbies');
  expect(1).toBe(2);
});
it('Probando dirigirse a las recomendaciones por hobbies', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const courseItem = screen.getByText('Por hobbies en común');
  userEvent.click(courseItem);
  expect(history.location.pathname).toBe('//search/hobbies');
});
it('Probando que los botones de las recomendaciones lleven a distintas páginas', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const coursesItem = screen.getByText('Por cursos en común');
  userEvent.click(coursesItem);
  const courses = history.location.pathname;
  const hobbiesItem = screen.getByText('Por hobbies en común');
  userEvent.click(hobbiesItem);
  const hobbies = history.location.pathname;
  expect(courses).not.toEqual(hobbies);
});
