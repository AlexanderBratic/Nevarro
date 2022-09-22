import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import type { NextPage } from 'next';
import {setItem, getItem, Template } from '../src/components/Template';

function ComparisonPage(props) {
	const [count, actuallySetCount] = React.useState(getItem('comparison-count', 0));
	
	function setCount(value: number) {
		setItem('comparison-count', value);
		actuallySetCount(value);
	}
	
	
	return (
			<Box>
				<h1>Comparison {count}</h1>
				<Button onClick={() => setCount(count + 1)}>Increment</Button>
			</Box>
	);
}


const About: NextPage = () => {

  return (
		<Template page={ComparisonPage} />
  );
};

export default About;
