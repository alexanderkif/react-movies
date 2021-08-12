/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import MovieButton from ".";

describe('MovieButton test', () => {
  const BTN_TEXT = 'button text';
  const props = {
    text: BTN_TEXT,
    active: false,
    small: false,
    clickHandler: jest.fn()
  }

  it('click MovieButton', () => {
    render(<MovieButton {...props} />);
    // screen.debug();
    const btn = screen.getByText(BTN_TEXT);
    userEvent.click(btn);
    expect(props.clickHandler).toHaveBeenCalledTimes(1);
  });

  it('small MovieButton', () => {
    props.small = true;
    props.active = false;
    render(<MovieButton {...props} />);
    // screen.debug();
    const btn = screen.getByText(BTN_TEXT);
    expect(btn.classList.contains('small')).toBe(true);
    expect(btn.classList.contains('active')).not.toBe(true);
  });

  it('active MovieButton', () => {
    props.small = false;
    props.active = true;
    render(<MovieButton {...props} />);
    // screen.debug();
    const btn = screen.getByText(BTN_TEXT);
    expect(btn.classList.contains('small')).not.toBe(true);
    expect(btn.classList.contains('active')).toBe(true);
  });
});
