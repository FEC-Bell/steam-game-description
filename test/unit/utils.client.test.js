import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  getHumanReadableFromISO,
  getPathId,
  fetchGamePhoto,
  fetchGameInfo,
  fetchAllGameReviews,
  fetchRecentGameReviews
} from '../../client/utils';
import UseWindowExample from '../fixtures/UseWindowExample';

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  ok: true,
  json: () => {}
}));

describe('React client util functions', () => {
  // Mock window object
  global.window = Object.create(window);

  test('getHumanReadableFromISO should return a human readable date string', () => {
    let years = new Array(10).fill(0).map((_, idx) => (idx + 2010).toString());
    let months = new Array(12).fill(0).map((_, idx) => (idx + 1).toString().padStart(2, '0'));
    let monthStrs = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dev'
    };
    for (let i = 1; i <= 28; i++) {
      for (let j = 0; j < years.length; j++) {
        for (let k = 0; k < months.length; k++) {
          let ISOStr = `${years[j]}-${months[k]}-${String(i).padStart(2, '0')}T00:00:00Z`;
          expect(getHumanReadableFromISO(ISOStr)).toBe(`${parseInt(i)} ${monthStrs[months[k]]}, ${years[j]}`);
        }
      }
    }
  });

  test('getPathId gets the path of the current window', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/app/test/3'
      }
    });
    expect(getPathId()).toBe(3);

    global.window.location.pathname = '/app/test/a';
    expect(getPathId()).toBe(1);

    global.window.location.pathname = '';
    expect(getPathId()).toBe(1);
  });

  test('useWindowSize returns the current window size', async () => {
    global.window.innerHeight = 1000;
    global.window.innerWidth = 2000;
    render(<UseWindowExample />);
    let widthText = await screen.findByText('width: 2000');
    let heightText = await screen.findByText('height: 1000');
    expect(widthText).toBeInTheDocument();
    expect(heightText).toBeInTheDocument();

    global.window.innerHeight = 500;
    global.window.innerWidth = 1000;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    widthText = await screen.findByText('width: 1000');
    heightText = await screen.findByText('height: 500');
    expect(widthText).toBeInTheDocument();
    expect(heightText).toBeInTheDocument();
  });

  test('fetchGameInfo calls the correct endpoint with passed in game id', async () => {
    await fetchGameInfo(3);
    expect(global.fetch).toHaveBeenCalledWith('/api/description/3');

    expect(() => fetchGameInfo(0)).toThrow();
    expect(() => fetchGameInfo(101)).toThrow();
  });

  test('fetchAllGameReviews calls the correct endpoint with passed in game id', async () => {
    await fetchAllGameReviews(3);
    expect(global.fetch).toHaveBeenCalledWith('/api/reviewcount/3');

    expect(() => fetchAllGameReviews(0)).toThrow();
    expect(() => fetchAllGameReviews(101)).toThrow();
  });

  test('fetchRecentGameReviews calls the correct endpoint with passed in game id', async () => {
    await fetchRecentGameReviews(3);
    expect(global.fetch).toHaveBeenCalledWith('/api/reviewcount/recent/3');

    expect(() => fetchRecentGameReviews(0)).toThrow();
    expect(() => fetchRecentGameReviews(101)).toThrow();
  });

  test('fetchGamePhoto calls the correct endpoint with passed in game id', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => JSON.stringify([{ mediaType: 'carouselPhoto' }])
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => ([{ mediaType: 'video' }])
      });

    JSON.parse = jest.fn().mockImplementation(() => ([{ mediaType: 'carouselPhoto' }]));

    let result1 = await fetchGamePhoto(3);
    expect(result1).toStrictEqual({ mediaType: 'carouselPhoto' });
    expect(global.fetch).toHaveBeenCalledWith('/api/media');
    expect(JSON.parse).toHaveBeenCalledWith(JSON.stringify([{ mediaType: 'carouselPhoto' }]));

    let result2 = await fetchGamePhoto(3);
    expect(result2).toStrictEqual({});
    expect(global.fetch).toHaveBeenCalledWith('/api/media');

    expect(() => fetchGamePhoto(0)).toThrow();
    expect(() => fetchGamePhoto(101)).toThrow();
  });
});