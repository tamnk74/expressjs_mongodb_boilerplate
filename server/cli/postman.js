/* eslint-disable no-undef */

// Login
tests['Status code is 200'] = responseCode.code === 200;

if (responseCode.code === 200) {
  const body = JSON.parse(responseBody);
  pm.environment.set('token', body.data.attributes.access_token);
  pm.environment.set('refresh_token', body.data.attributes.refresh_token);
}

// Refresh token
`{
  "refresh_token": "{{refresh_token}}"
}`;

tests['Status code is 200'] = responseCode.code === 200;

if (responseCode.code === 200) {
  const body = JSON.parse(responseBody);
  pm.environment.set('token', body.data.attributes.access_token);
  pm.environment.set('refresh_token', body.data.attributes.refresh_token);
}
//
