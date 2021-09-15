import React, { CSSProperties } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import DropdownList from '.';
import { ALL_GENRES, SORTS_BY } from '../../utils/constants';

const dropdown: CSSProperties = {
  position: 'relative',
  top: '10rem',
  width: '13rem',
  margin: 'auto',
  border: 0,
  backgroundColor: '#424242',
  color: '#ccc',
  outline: 'none',
  fontSize: '.9rem',
  textTransform: 'uppercase',
  fontFamily: 'Montserrat,sans-serif',
};

export default {
  title: 'NetflixRoulette/DropdownList',
  component: DropdownList,
  argTypes: {
    value: { control: 'text', defaultValue: 'Fantasy' },
    options: { control: 'object', defaultValue: ['Fantasy'] },
    position: { control: { top: 'text' }, defaultValue: {} },
  },
  decorators: [(story) => <div style={dropdown}>{story()}</div>],
} as ComponentMeta<typeof DropdownList>;

const Template: ComponentStory<typeof DropdownList> = (args) => (
  <DropdownList {...args} />
);

export const Genres = Template.bind({});
Genres.args = {
  value: 'Fantasy',
  options: ALL_GENRES.slice(0, 5),
  dropdownHandler: (event) => action('click')(event.target),
};

export const SortsBy = Template.bind({});
SortsBy.args = {
  value: SORTS_BY[0].name,
  options: SORTS_BY.map((s) => s.name),
  position: { top: '2rem' },
  dropdownHandler: (event) => action('click')(event.target),
};
