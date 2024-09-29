/** @type {import('next').NextConfig} */
import withVideos from 'next-videos';

const nextConfig = {};

export default {
  ...nextConfig,
  ...withVideos()
};

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// const config = async () => {
//   const withVideos = (await import('next-videos')).default;

//   return {
//     ...nextConfig,
//     ...withVideos(),
//   };
// };

// export default await config();

