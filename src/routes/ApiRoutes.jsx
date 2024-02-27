const ApiRoutes = {
  GETALLUSERS: {
    path: "/user",
    authenticate: false,
  },
  SIGNUP: {
    path: "/user/signup",
    authenticate: false,
  },
  LOGIN: {
    path: "/user/login",
    authenticate: false,
  },
  FORGOTPASSWORD: {
    path: "/user/forgot-password",
    authenticate: false,
  },
  RESETPASSWORD: {
    path: "/user/reset-password",
    authenticate: false,
  },
};

export default ApiRoutes;
