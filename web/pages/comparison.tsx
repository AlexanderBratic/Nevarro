import * as React from 'react';

import type { NextPage } from 'next';
import Template from '../src/components/Template';

function ComparisonPage(props) {
	
	
	return (
			<h1>Comparison</h1>
	);
}


const About: NextPage = () => {

  return (
		<Template page={ComparisonPage} />
  );
};

export default About;
