import type { NextPage } from 'next';
import Template from '../src/components/Template';


function BicyclePage() {
	
	return (
		<h1>Bicycle Settings</h1>
	);
	
}

const About: NextPage = () => {

  return (
		<Template page={BicyclePage} />
  );
};

export default About;