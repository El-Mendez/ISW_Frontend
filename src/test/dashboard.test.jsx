import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DashContent from '../components/dashboard/dashcontent';
import Dashboard from '../components/dashboard/dashboard';
import '@testing-library/jest-dom';

it('Prueba de componente general de dashboard', () => {
  const component = render(<DashContent />);
  expect(Dashboard).toReturn(component);
});

