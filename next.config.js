module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "http://localhost:3000/api", // production api
  },
  images: {
    domains: [
      "imgbb.com",
      "i.ibb.co",
      "https://www.google.com.ph/imghp?hl=en&authuser=0&ogbl",
    ],
  },
};
