import React, { CSSProperties } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DropdownList from './../components/DropdownList';
import { ALL_GENRES, SORTS_BY } from '../utils/constants';

export default {
  title: 'NetflixRoulette/DropdownList',
  component: DropdownList
} as ComponentMeta<typeof DropdownList>;

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
  fontFamily: 'Montserrat,sans-serif'
}

const Template: ComponentStory<typeof DropdownList> = (args) => <div style={dropdown}><DropdownList {...args} /></div>;

export const Genres = Template.bind({});
Genres.args = {
  value: 'Fantasy',
  options: ALL_GENRES.slice(0, 5)
};

export const SortsBy = Template.bind({});
SortsBy.args = {
  value: SORTS_BY[0].name,
  options: SORTS_BY.map((s) => s.name),
  position: { top: '2rem' }
};
