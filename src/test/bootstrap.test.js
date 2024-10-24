var Sails = require('sails');

before(function (done) {
  this.timeout(120000); // Definindo um timeout maior

  try {
    Sails.lift(err => {
      if (err) {
        return done(err)
      } else {
        return done()
      }
    });
  } catch (err) {
    console.error('Error during setup:', err);
  }
});

after((done) => {
  Sails.lower(done)
})
