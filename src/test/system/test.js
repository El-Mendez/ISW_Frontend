/* eslint-disable */

import sendRequest from './cases/sendRequest';
import searchUser from './cases/searchUsers';

const host = 'localhost:8080';

const test_case_sendRequest = new sendRequest('firefox', host);
test_case_sendRequest.start();

// Caso de uso 2
const test_case_searchUser = new searchUser('firefox', host);
test_case_searchUser.start();
