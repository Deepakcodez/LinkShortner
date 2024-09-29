// /** @type {import('next').NextConfig} */
// import withVideos from 'next-videos';

// const nextConfig = {};

// export default {
//   ...nextConfig,
//   ...withVideos()
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
 
  reactStrictMode: true, // Enables React strict mode
  // Any other config options you have
};

const config = async () => {
  const withVideos = (await import('next-videos')).default;

  return {
    ...nextConfig,
    ...withVideos(),
  };
};

export default await config();

