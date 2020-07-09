import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const TooltipDiv = styled.div`
  position: absolute;
  bottom: ${props => props.y || props.y === 0 ? `${props.y}px` : '20px'};
  left: ${props => props.x || props.x === 0 ? `${props.x}px` : '5px'};
  padding: 5px;
  box-sizing: border-box;
  width: 300px;
  background: #c2c2c2;
  color: #3d3d3f;
  box-shadow: 0 0 4px 0 #000;
  border-radius: 4px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  font-size: 11.5px;
  line-height: 12px;
  display: inline-block;
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  animation: ${props => props.open ? fadeIn : fadeOut} 0.1s linear;
  transition: visibility 0.1s linear;
  pointer-events: none;
`;

export const RelativeParentContainer = styled.div`
  position: relative;
  cursor: default;
`;

export const Reviews = styled.div`
  display: flex;
  line-height: 16px;
  pointer-events: none;
  width: inherit;
`;

// Positive color: #66c0f4 (Overwhelmingly Positive, Mostly Positive, Very Positive)
// Mixed color: #b9a06a (Mixed)
// Negative color: #a34c25 (Overwhelmingly Negative, Mostly Negative, Very Negative)
export const ReviewRating = styled.div`
  color: ${props => props.theme[props.rating]};
  display: inline;
  white-space: nowrap;
`;

ReviewRating.propTypes = {
  rating: PropTypes.oneOf(['Positive', 'Negative', 'Mixed'])
};

ReviewRating.defaultProps = {
  rating: 'Positive',
  theme: {
    Positive: '#66c0f4',
    Negative: '#a34c25',
    Mixed: '#b9a06a'
  }
};

export const OverflowHidden = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
`;