import * as React from 'react';

import type { NextPage } from 'next';
import Template from '../src/components/Template';


function CarPage() {

	return (
		<h1>Car</h1>
	);

}

const About: NextPage = () => {

  return (
		<Template page={CarPage} />
  );
};

export default About;
