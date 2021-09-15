import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MovieButton from '.';

export default {
  title: 'NetflixRoulette/MovieButton',
  component: MovieButton,
  argTypes: {
    active: { control: 'boolean', defaultValue: false },
    small: { control: 'boolean', defaultValue: false },
    text: { control: 'text', defaultValue: 'Search' }
  }
} as ComponentMeta<typeof MovieButton>;

const Template: ComponentStory<typeof MovieButton> = (args) => <MovieButton {...args} />;

export const Active = Template.bind({});
Active.args = {
  active: true,
  small: false,
  text: 'Search',
  clickHandler: action('click'),
};

export const Small = Template.bind({});
Small.args = {
  small: true,
  text: 'Search',
  clickHandler: action('click'),
};
