import { onRequest as handleUsersRequest } from '../functions/api/users.js';

const statusPayload = JSON.stringify({
  platform: 'AgriNode',
  status: 'online',
  version: '1.0.0',
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/status') {
      if (request.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
          status: 405,
          headers: {
            allow: 'GET',
            'content-type': 'application/json; charset=UTF-8',
          },
        });
      }

      return new Response(statusPayload, {
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      });
    }

    if (url.pathname === '/api/users') {
      return handleUsersRequest({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
