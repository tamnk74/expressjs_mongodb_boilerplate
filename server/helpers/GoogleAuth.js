import { OAuth2Client } from 'google-auth-library';

import { googleClientId, googleConfig } from '../config/auth';

const client = new OAuth2Client(googleClientId, '', '');

export const getGoogleUser = async (socialToken) => {
  try {
    const token = await client.verifyIdToken({ idToken: socialToken, audience: googleClientId });
    const payload = token.getPayload();
    const audience = payload.aud;
    if (audience !== googleConfig.clientId) {
      throw new Error('Invalid token');
    }

    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
