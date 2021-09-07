import '@testing-library/jest-dom/extend-expect';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import enableHooks from 'jest-react-hooks-shallow';

Enzyme.configure({ adapter: new Adapter() });

// enableHooks(jest, { dontMockByDefault: true });
enableHooks(jest);
