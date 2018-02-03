var models = require('./models/auth/oauth_client');

models.create({
    clientId: 'wegpiraat',
    clientSecret: '123',
    redirectUri: '/oauth/redirect'
});
