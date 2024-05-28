import { render, screen } from '@testing-library/react';
import App from './MainPageApp/mainPage_App.jsx';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
