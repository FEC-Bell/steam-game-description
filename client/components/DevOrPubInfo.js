import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../styles/UIUXUtils';
import { DevOrPub, CompanyWrapper, Company, MoreButton } from '../styles/DevOrPubInfo.styles';
import { useWindowSize } from '../utils';

const DevOrPubInfo = ({ label, companyArr }) => {
  const windowSize = useWindowSize();
  const [expanded, setExpanded] = useState(false);

  const companyWrapperCharWidth = companyArr.reduce((count, comObj) => {
    // Add 2 to count statically for spacing between companies
    return count + comObj.company.length + comObj.platform.length + 2;
  }, 0);
  const isExpandable = companyWrapperCharWidth >= 40;

  return (
    <DevOrPub>
      <Label>{label}:</Label>
      <CompanyWrapper
        expanded={expanded}
        width={windowSize.width}
      >
        {
          companyArr.map((com, idx, arr) => (
            <Company key={idx}>
              {com.company} ({com.platform})
            </Company>
          ))
        }
      </CompanyWrapper>
      {
        /* MoreButton is expected to permanently disappear after being clicked on, in accordance with actual site behavior */
        isExpandable ?
          <MoreButton
            size={windowSize.width}
            expanded={expanded}
            onClick={() => setExpanded(true)}
            data-testid={`${label.toLowerCase()}-more-button`}
          >
            +
          </MoreButton> :
          ''
      }
    </DevOrPub>
  );
};

DevOrPubInfo.propTypes = {
  label: PropTypes.string.isRequired,
  companyArr: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DevOrPubInfo;