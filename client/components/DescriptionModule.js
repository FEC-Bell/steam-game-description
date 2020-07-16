import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DescCol, ImgContainer, TextContainer, DescImg, Desc, DescStats, ReleaseDate } from '../styles/DescriptionModule.styles';
import { Label } from '../styles/UIUXUtils';
import { getHumanReadableFromISO, fetchGameInfo, fetchGamePhoto, fetchAllGameReviews, fetchRecentGameReviews } from '../utils';
import DevOrPubInfo from './DevOrPubInfo';
import ReviewsInfo from './ReviewsInfo';

const DescriptionModule = ({ gameid }) => {
  /**
   * INITIAL STATE
   */
  const [gameThumbnail, setGameThumbnail] = useState('');
  const [gameInfo, setGameInfo] = useState({
    release_date: '2000-01-01T00:00:00Z',
    description: 'No game description available',
    developers: [],
    publishers: []
  });
  const [recentReviews, setRecentReviews] = useState({
    summary: 'Mixed',
    percent: 0,
    total: 0
  });
  const [allReviews, setAllReviews] = useState({
    summary: 'Mixed',
    percent: 0,
    positive: 0,
    negative: 0,
    total: 0
  });

  // On component mount, fetch relevant game information for component for a particular gameid (which is passed as props on mount)
  useEffect(() => {
    fetchGamePhoto(gameid)
      .then(res => {
        setGameThumbnail(res.url);
      })
      .catch(e => {
        console.error(e);
        // On fetchGamePhoto promise rejection, set default game thumbnail
        setGameThumbnail('https://steamcdn-a.akamaihd.net/steam/apps/289070/header.jpg');
      });

    fetchGameInfo(gameid)
      .then(res => setGameInfo(res))
      .catch(e => {
        // On fetchGameInfo promise rejection, keep initial game info state
        console.error(e);
      });

    fetchAllGameReviews(gameid)
      .then(res => setAllReviews(res))
      .catch(e => {
        // On fetchAllGameReviews promise rejection, keep initial reviews state
        console.error(e);
      });

    fetchRecentGameReviews(gameid)
      .then(res => setRecentReviews(res))
      .catch(e => {
        // On fetchRecentGameReviews promise rejection, keep initial reviews state
        console.error(e);
      });
  }, []);

  return (
    <React.Fragment>
      <DescCol>
        <ImgContainer>
          <DescImg src={gameThumbnail} alt="Game Thumbnail" />
        </ImgContainer>
        <TextContainer>
          <Desc>{gameInfo.description}</Desc>
          <DescStats>
            <ReviewsInfo
              reviewType='recent'
              reviews={recentReviews}
            />
            <ReviewsInfo
              reviewType='all'
              reviews={allReviews}
            />
            <ReleaseDate>
              <Label>Release Date:</Label>
              <span>{getHumanReadableFromISO(gameInfo.release_date)}</span>
            </ReleaseDate>
            <DevOrPubInfo
              label='Developer'
              companyArr={gameInfo.developers}
            />
            <DevOrPubInfo
              label='Publisher'
              companyArr={gameInfo.publishers}
            />
          </DescStats>
        </TextContainer>
      </DescCol>
    </React.Fragment>
  );
};

DescriptionModule.propTypes = {
  gameid: PropTypes.number.isRequired
};

export default DescriptionModule;
