import * as React from 'react';

import type { NextPage } from 'next';
import Template from '../src/components/Template';


function PlanePage(props) {
	
	return (
		<h1>Plane</h1>
	);
}

const About: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
	
  return (
		<Template page={PlanePage} />
  );
};

export default About;
