import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from '@/common';

const loadableMethods = ele => (ele ? Loadable({
	loader: ele,
	loading: () => <Spin visible text=" " />,
}) : '');

export default loadableMethods;
