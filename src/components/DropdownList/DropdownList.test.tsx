/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownList from '.';

describe('DropdownList', () => {
  it('open-close DropdownList', () => {
    render(<DropdownList options={['one', 'two', 'three']} value="one" />);
    const valueElement = screen.getAllByText(/one/i)[0];
    expect(valueElement).toBeInTheDocument();
    const optionTwo = screen.queryByText(/two/i)?.parentElement;
    expect(optionTwo).toHaveClass('genre_closed');

    userEvent.click(valueElement);
    expect(optionTwo).not.toHaveClass('genre_closed');

    userEvent.click(screen.getByText(/two/i));
    expect(optionTwo).toHaveClass('genre_closed');
  });

  it('empty value DropdownList', () => {
    render(<DropdownList options={['one', 'two', 'three']} />);
    expect(screen.getByText(/one/i)).toBeInTheDocument();
  });
});
