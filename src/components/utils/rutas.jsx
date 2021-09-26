// Rutas para hacer requests
// No necesita estar loggeado → no auth
const LOGIN = 'http://api.meetinguvg.me/free/login';
const SIGNUP = 'http://api.meetinguvg.me/free/signup';
const SEARCH_CAREER = 'http://api.meetinguvg.me/free/carrera';
const SEARCH_HOBBY = 'http://api.meetinguvg.me/free/hobby';
const SEARCH_COURSE = 'http://api.meetinguvg.me/free/curso';
const USER_INFO = 'http://api.meetinguvg.me/free/profile/';

// Necesita estar loggeado
const AUTH = 'http://api.meetinguvg.me/auth/ping';
const ASSIGN_SECTION = 'http://api.meetinguvg.me/auth/seccion';
const ASSIGN_HOBBY = 'http://api.meetinguvg.me/auth/hobby';
const SUGGESTIONS_COURSES = 'http://api.meetinguvg.me/auth/suggestions/courses';
const SUGGESTIONS_HOBBIES = 'http://api.meetinguvg.me/auth/suggestions/hobbies';
const USER_INFO_AUT = 'http://api.meetinguvg.me/auth/profile';

// REQUESTS
const PASSWORD_RESET = 'http://api.meetinguvg.me/request/passwordReset';
const ACCEPT_PASSWORD_RESET = 'http://api.meetinguvg.me/request/acceptPasswordReset';
const ACCOUNT_REQUEST = 'http://api.meetinguvg.me/request/signup';
const ACCEPT_ACCOUNT_REQUEST = 'http://api.meetinguvg.me/request/acceptSignUp';

module.exports = {
  LOGIN,
  SIGNUP,
  SEARCH_CAREER,
  SEARCH_COURSE,
  SEARCH_HOBBY,
  AUTH,
  ASSIGN_SECTION,
  ASSIGN_HOBBY,
  PASSWORD_RESET,
  ACCEPT_PASSWORD_RESET,
  SUGGESTIONS_COURSES,
  SUGGESTIONS_HOBBIES,
  ACCOUNT_REQUEST,
  ACCEPT_ACCOUNT_REQUEST,
  USER_INFO,
  USER_INFO_AUT,
};
