import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MovieTextButton from '../components/MovieTextButton';

export default {
  title: 'NetflixRoulette/MovieTextButton',
  component: MovieTextButton
} as ComponentMeta<typeof MovieTextButton>;

const Template: ComponentStory<typeof MovieTextButton> = (args) => <MovieTextButton {...args} />;

export const Active = Template.bind({});
Active.args = {
  active: true,
  text: 'Search'
};
