import passport from "passport";
const SamlStrategy = require('passport-saml').Strategy;

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function (user: any, done){
  //aqui tem q retornar o objeto do usuário na dig
  done(null, user)
})

//SAML strategy
const strategy = new SamlStrategy(
  {
    entryPoint: process.env.SSO_ENTRYPOINT,
    issuer: process.env.SSO_ISSUER,
    path: process.env.SSO_CALLBACK_URL,
    cert: process.env.SSO_CERT
  },
  function(profile: any, done: any) {
    //console.log('profile', profile)
    //faz chamada no banco da digi e retorna o usuario
    return done(null, profile)
  }
)

passport.use(strategy)

export default passport