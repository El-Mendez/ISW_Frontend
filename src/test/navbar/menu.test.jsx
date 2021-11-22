import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import Menu from '../../components/navbar/menu';
import '@testing-library/jest-dom';

it('Probando dirigirse a la lista de amigos', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const item = screen.getByText('Ver amigos');
  userEvent.click(item);
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

it('Probando dirigirse a la bandeja de entrada', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const item = screen.getByText('Solicitudes enviadas');
  userEvent.click(item);
  expect(history.location.pathname).toBe('//sent_request');
});

it('Probando dirigirse a las recomendaciones por hobbies', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const item = screen.getByText('Por hobbies en común');
  userEvent.click(item);
  expect(history.location.pathname).toBe('//search/hobbies');
});

it('Probando dirigirse a las recomendaciones por amigos de mis amigos', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Menu />
    </Router>,
  );
  const item = screen.getByText('Por amigos en común');
  userEvent.click(item);
  expect(history.location.pathname).toBe('//search/friends');
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
