const nextConfig = {
  allowedDevOrigins: ["ticketing.dev"],
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  async redirects() {
    //   will send request to /banana and also change the url to /banana
    return [
      {
        source: "/about",
        destination: "/banana",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    //   will send request to /banana without changing the url
    return [
      {
        source: "/ab",
        destination: "/banana",
      },
    ];
  },
};
// also can set env, headers (csf)

export default nextConfig;
