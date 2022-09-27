import * as React from 'react';

import type { NextPage } from 'next';
import Template from '../src/components/Template';

const PlanePage: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
		<Template>
            <h1>Plane</h1>
        </Template>
  );
};

export default PlanePage;
