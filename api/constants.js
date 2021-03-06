exports.mailer = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAILSECRET
    }
}

exports.verExpirationTime = 86400; //24H

exports.tempuserCollection = 'tempusers';

exports.verUrl = process.env.DOMAIN+'/api/verify/${URL}';

exports.oauth = {
    model: require('./models/auth/oauth'),
      grants: ['password', 'refresh_token'],
      debug: false
}

exports.verifyMail = {
    from: 'Do Not Reply <wegpiraat@wegpiraat.com>',
    subject: 'Bevestig je account voor Wegpiraat',
    html: "<p><a href=${URL}>Klik hier</a> om je account te bevestigen:</p>",
    text: 'Klik hier om je account te bevestigen: ${URL}'
}

exports.confirmMail =  {
    from: 'Do Not Reply <user@gmail.com>',
    to: '',
    subject: 'Uw Wegpiraat account is geverifieerd!',
    html: '<p>U kunt inloggen op Wegpiraat.</p>',
    text: 'U kunt inloggen op Wegpiraat'
}

exports.resetPasswordMail = function(recipient, token) {
    return {
        from: 'Do Not Reply <user@gmail.com>',
        subject: 'Reset uw wachtwoord', 
        to: recipient,    
        html: "Hier is de code om uw wachtwoord te herstellen: "+token,
        text: "Hier is de code om uw wachtwoord te herstellen: "+token
    }
}

exports.clientSeed = {
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    redirectUri: '/oauth/redirect'
}