import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
describe('test of the screen Feedback', () => {
  const initialState = {
    player: {
      name: '',
      assertions: 4,
      score: 0,
      gravatarEmail: ''
    },
    game: {
      api: {}
    }
  };
  it('Os elementos de score e usuario aparecem', () => {
    renderWithRouterAndRedux(<Feedback history={{push: ()=>{}}}/>, initialState, '/feedback');
    const imgGravatar = screen.getByRole('img', { name: /imagem de avatar/i });
    const PlayerName = screen.getByTestId('header-player-name');
    const assertionText = screen.getByTestId('feedback-text');
    const totalQuestion = screen.getByTestId('feedback-total-question');
    const totalScore = screen.getByTestId('header-score');
    expect(totalScore).toBeInTheDocument();
    expect(PlayerName).toBeInTheDocument();
    expect(imgGravatar).toBeInTheDocument();
    expect(assertionText).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(assertionText.innerHTML).toBe('Well Done!');
  });
  it('testa se clicar no botão play again, é redirecionado para "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const btnAgain = screen.getByRole('button', { name: /play again/i });
    expect(btnAgain).toBeInTheDocument();
    userEvent.click(btnAgain);
    expect(history.location.pathname).toBe('/');
  });
  it('testa se clicar no botão rankin, é redirecionado para "/rankin"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const btnRanking = screen.getByRole('button', { name: /ranking/i });
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  });
});
