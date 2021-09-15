import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MovieTextButton from '.';

export default {
  title: 'NetflixRoulette/MovieTextButton',
  component: MovieTextButton,
  argTypes: {
    active: { control: 'boolean', defaultValue: false },
    text: { control: 'text', defaultValue: 'Search' },
  },
} as ComponentMeta<typeof MovieTextButton>;

const Template: ComponentStory<typeof MovieTextButton> = (args) => (
  <MovieTextButton {...args} />
);

export const Active = Template.bind({});
Active.args = {
  active: true,
  text: 'Search',
};
