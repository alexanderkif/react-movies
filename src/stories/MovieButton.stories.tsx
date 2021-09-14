import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MovieButton from './../components/MovieButton';

export default {
  title: 'NetflixRoulette/MovieButton',
  component: MovieButton
} as ComponentMeta<typeof MovieButton>;

const Template: ComponentStory<typeof MovieButton> = (args) => <MovieButton {...args} />;

export const Active = Template.bind({});
Active.args = {
  active: true,
  small: false,
  text: 'Search',
};

export const Small = Template.bind({});
Small.args = {
  small: true,
  text: 'Search',
};
