import React from 'react';
import ReactDOM from 'react-dom';
import { getPathId } from './utils';
import DescriptionModule from './components/DescriptionModule';

ReactDOM.render(<DescriptionModule gameid={getPathId()} />, document.getElementById('game-description'));