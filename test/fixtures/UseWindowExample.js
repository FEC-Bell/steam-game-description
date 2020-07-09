import React from 'react';
import { useWindowSize } from '../../client/utils';

const UseWindowExample = () => {
  const { width, height } = useWindowSize();

  return (
    <React.Fragment>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </React.Fragment>
  );
};

export default UseWindowExample;