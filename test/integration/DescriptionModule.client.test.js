import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DescriptionModule from '../../client/components/DescriptionModule';

jest.mock('../../client/utils.js', () => {
  const { gameInfo, allReviews, recentReviews } = require('../fixtures/sampleData');
  return {
    getHumanReadableFromISO: () => '1 Jul, 1990',
    getPathId: () => 1,
    useWindowSize: () => ({ width: 1000, height: 500 }),
    fetchGamePhoto: (gameid) => {
      if (gameid > 100 || gameid < 0) {
        return Promise.reject('Oops');
      } else {
        return Promise.resolve({ mediaType: 'carouselPhoto', url: 'http://google.com' });
      }
    },
    fetchGameInfo: () => Promise.resolve(gameInfo),
    fetchAllGameReviews: () => Promise.resolve(allReviews),
    fetchRecentGameReviews: () => Promise.resolve(recentReviews)
  };
});

describe('<DescriptionModule /> integration tests', () => {
  test('renders correctly on mount', async () => {
    render(<DescriptionModule gameid={1} />);

    // Image thumbnail
    let img = await screen.findByAltText('Game Thumbnail');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'http://google.com');

    // Game description
    expect(await screen.findByText('Test game description')).toBeInTheDocument();

    // All reviews
    expect(await screen.findByText('All Reviews:', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Mostly Positive')).toBeInTheDocument();
    expect(await screen.findByText('(999)')).toBeInTheDocument();
    expect(await screen.findByText('66% of the 999 user reviews for this game are positive.')).toBeInTheDocument();

    // Recent reviews
    expect(await screen.findByText('Recent Reviews:', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Mixed')).toBeInTheDocument();
    expect(await screen.findByText('(100)')).toBeInTheDocument();
    expect(await screen.findByText('55% of the 100 user reviews in the last 30 days are mixed.')).toBeInTheDocument();

    // Release date
    expect(await screen.findByText('Release Date', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('1 Jul, 1990')).toBeInTheDocument();

    // Developer
    expect(await screen.findByText('Developer', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Company 1 (Windows)')).toBeInTheDocument();
    expect(await screen.findByText('Company 2 (Mac)')).toBeInTheDocument();
    expect(await screen.findByText('Company 3 (Linux)')).toBeInTheDocument();
    expect(await screen.findByTestId('developer-more-button')).toBeInTheDocument();

    // Publisher
    expect(await screen.findByText('Publisher', { exact: false })).toBeInTheDocument();
    expect(await screen.findByText('Company 4 (Windows)')).toBeInTheDocument();
    expect(await screen.findByText('Company 5 (Mac)')).toBeInTheDocument();
    expect(await screen.findByText('Company 6 (Linux)')).toBeInTheDocument();
    expect(await screen.findByTestId('publisher-more-button')).toBeInTheDocument();
  });

  test('renders default image thumbnail on photo fetch error', async () => {
    // Suppress console.error on promise rejection
    console.error = jest.fn();
    render(<DescriptionModule gameid={101} />);
    let img = await screen.findByAltText('Game Thumbnail');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://steamcdn-a.akamaihd.net/steam/apps/289070/header.jpg');
  });

  test('more button disappears on click', async () => {
    render(<DescriptionModule gameid={1} />);
    let devBtn = await screen.findByTestId('developer-more-button');
    expect(devBtn).toBeVisible();
    await waitFor(() => fireEvent.click(devBtn));
    expect(devBtn).not.toBeVisible();

    let pubBtn = await screen.findByTestId('publisher-more-button');
    await waitFor(() => fireEvent.click(pubBtn));
    expect(pubBtn).not.toBeVisible();
  });
});
