// Rutas para hacer requests
// No necesita estar loggeado → no auth
const LOGIN = 'http://api.meetinguvg.me/free/login';
const SIGNUP = 'http://api.meetinguvg.me/free/signup';
const SEARCH_CAREER = 'http://api.meetinguvg.me/free/carrera';
const SEARCH_HOBBY = 'http://api.meetinguvg.me/free/hobby/';
const SEARCH_COURSE = 'http://api.meetinguvg.me/free/course/';

// Necesita estar loggeado
const AUTH = 'http://api.meetinguvg.me/auth/ping';
const ASSIGN_SECTION = 'http://api.meetinguvg.me/auth/seccion';
const ASSIGN_HOBBY = 'http://api.meetinguvg.me/auth/hobby';

exports = {LOGIN, SIGNUP, SEARCH_CAREER, SEARCH_COURSE, SEARCH_HOBBY, AUTH, ASSIGN_SECTION, ASSIGN_HOBBY}
