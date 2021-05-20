export const getAuthLoginLoading = (state) => state.auth.loginLoading;
export const getAuthLoginErr = (state) => state.auth.loginErr;
export const getAuthLoggedIn = (state) => state.auth.loggedIn;
export const getAuthRole = (state) => state.auth.user.role;
export const getAuthUserEmail = (state) => state.auth.user.email;
export const getAuthRouteAfterLoggin = (state) => state.auth.routeAfterLogin;