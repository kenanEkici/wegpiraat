exports.mailer = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'noreply.wegpiraat@gmail.com',
        pass: 'wegpiraat123'
    }
}

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

exports.swagger = {
    swaggerDefinition: {
      info: {
        title: 'Kenan\'s wonderful API of surprises',
        version: '1.0.0',
        description: 'Hi, you have found my REST API! You must feel so damn good about yourself huh.',
      },
      host: 'kenan-api.herokuapp.com',
      basePath: '/',
    },
    // path to the API docs
    apis: ['./api/routes/*.js'],
}