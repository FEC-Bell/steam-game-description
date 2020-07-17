import styled from 'styled-components';

export const DevOrPub = styled.div`
  display: flex;
  line-height: 16px;

  @media screen and (max-width: 940px) and (min-width: 470px) {
    width: 100%;
  }
`;

export const Company = styled.span`
  cursor: pointer;
  color: #67c1f5;
  :hover {
    color: #fff;
  }
  ::after {
    content: ', ';
    color: #556772;
  }
  :last-child::after {
    content: '';
  }
`;

export const CompanyWrapper = styled.div.attrs(props => ({
  style: {
    whiteSpace: props.width <= 940 || props.expanded ? 'normal' : 'nowrap',
    overflow: props.width <= 940 || props.expanded ? 'visible' : 'hidden'
  }
}))`
  text-overflow: ellipsis;
  padding-right: 5px;
`;

export const MoreButton = styled.div`
  display: ${props => props.size > 940 ? 'inline-block' : 'none'};
  padding: 0 4px;
  color: #67c1f5;
  border-radius: 2px;
  background-color: rgba(103, 193, 245, 0.2);
  cursor: pointer;
  margin: 0 8px 0 3px;
  height: 15px;
  :hover {
    background: -webkit-linear-gradient(150deg, #67c1f5 5%, #417a9b 95%);
    background: linear-gradient(150deg, #67c1f5 5%, #417a9b 95%);
  }
  ${props => props.expanded ? 'display: none;' : ''}
`;
