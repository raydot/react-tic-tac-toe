import React from 'react';
import Game from './game';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Game />);
});

// Make sure game status renders correctly.
// "Mount" renders the Board components as well as its
// children square components.
it('renders game status correctly', () => {
  // Maks sure the game starts with x...
  const wrapper = mount(<Game />);
  const firstPlayer = wrapper.find('div.game-info').children().first().text();
  expect(firstPlayer).toEqual('Next player: X');

  // ...then moves on to o after the first click.
  const button = wrapper.find('button.square').first();
  button.simulate('click');
  const secondPlayer = wrapper.find('div.game-info').children().first().text();
  expect(secondPlayer).toEqual('Next player: O');

  // Would you like to play a game?
  // Player one has moved above
  // player 2
  const turn2 = wrapper.find('button.square').at(1);
  turn2.simulate('click');
  // player 1
  const turn3 = wrapper.find('button.square').at(4);
  turn3.simulate('click');
  //player 2
  const turn4 = wrapper.find('button.square').at(5);
  turn4.simulate('click');
  //player 1, FTW
  const turn5 = wrapper.find('button.square').at(8);
  turn5.simulate('click');

  const winner = wrapper.find('div.game-info').children().first().text();
  expect(winner).toEqual('Winner: X');
});
