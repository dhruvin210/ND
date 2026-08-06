import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 1337,
    origin: 'https://cms.nextdynamix.avinyaglobal.com',
    hmr: {
      host: 'cms.nextdynamix.avinyaglobal.com',
    },
    // allow that hostname for dev server requests
    allowedHosts: ['cms.nextdynamix.avinyaglobal.com', 'localhost', '127.0.0.1'],
  },
});
