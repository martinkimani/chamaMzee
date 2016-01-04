/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = {
  db: process.env.MONGODB || 'mongodb://localhost:27017/chamadb',

  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'Your crypto key goes here'
  },

  sessionSecret: process.env.SESSION_SECRET || 'Your session secret goes here',

  twitter: {
    consumerKey: process.env.TWITTER_KEY || 'Your Twitter consumer key',
    consumerSecret: process.env.TWITTER_SECRET  || 'Your Twitter consumer secret',
    callbackURL: process.env.TWITTER_CALLBACK || 'http://localhost:3000/auth/twitter/callback',
    passReqToCallback: true
  }
};