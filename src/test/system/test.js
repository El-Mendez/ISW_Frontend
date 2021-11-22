/* eslint-disable */

import Suggestions from './cases/suggestions';
import SendRequest from './cases/sendRequest';
import SearchUser from './cases/searchUsers';

const host = 'localhost:8080';

// Courses suggestions
const test_case_courses_suggestions = new Suggestions('firefox', host);
test_case_courses_suggestions.start();

// Hobbies suggestions
const test_case_hobbies_suggestions = new Suggestions('firefox', host, 2);
test_case_hobbies_suggestions.start();

// Mutual friends suggestions
const test_case_mutual_suggestions = new Suggestions('firefox', host, 3);
test_case_mutual_suggestions.start(3);

// Send a friendship request
const test_case_sendRequest = new SendRequest('firefox', host);
test_case_sendRequest.start();

// Search users by hobbies or courses
const test_case_searchUser = new SearchUser('firefox', host);
test_case_searchUser.start();
