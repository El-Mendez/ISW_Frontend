/* eslint-disable camelcase */
import VisitProfile from './cases/searchUsers';

const host = 'localhost:8080';

const test_case = new VisitProfile('firefox', host);

test_case.start();
