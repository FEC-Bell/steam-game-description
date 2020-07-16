import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../styles/UIUXUtils';
import { RelativeParentContainer, TooltipDiv, Reviews, ReviewRating, OverflowHidden } from '../styles/ReviewsInfo.styles';
import { useWindowSize } from '../utils';

const ReviewsInfo = ({ reviewType, reviews }) => {
  const windowSize = useWindowSize();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [reviewDisplay, setReviewDisplay] = useState('');

  let message = `${reviews.percent}% of the ${reviews.total} user reviews ${reviewType === 'all' ? 'for this game' : 'in the last 30 days'} are ${reviews.summary ? reviews.summary.split(' ').slice(-1)[0].toLowerCase() : 'Mixed'}.`;

  useEffect(() => {
    if (windowSize.width > 940) {
      setReviewDisplay(`(${reviews.total})`);
    } else {
      setReviewDisplay(message);
    }
  }, [windowSize, reviews]);

  return (
    <RelativeParentContainer
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseOut={() => setTooltipOpen(false)}
    >
      {
        windowSize.width > 940 ?
          <TooltipDiv
            x={0}
            y={27}
            open={tooltipOpen}
          >
            {message}
          </TooltipDiv> :
          ''
      }
      <Reviews>
        <Label>{reviewType[0].toUpperCase() + reviewType.slice(1)} Reviews:</Label>
        <ReviewRating rating={reviews.summary ? reviews.summary.split(' ').slice(-1)[0] : 'Mixed'}>{reviews.summary}&nbsp;</ReviewRating>
        <OverflowHidden>{reviewDisplay}</OverflowHidden>
      </Reviews>
    </RelativeParentContainer>
  );
};

ReviewsInfo.propTypes = {
  reviewType: PropTypes.string.isRequired,
  reviews: PropTypes.object.isRequired
};

ReviewsInfo.defaultProps = {
  reviewType: 'recent',
  reviews: {
    summary: 'Mixed',
    total: 100,
    percent: 50,
    positive: 50,
    negative: 50
  }
};

export default ReviewsInfo;
