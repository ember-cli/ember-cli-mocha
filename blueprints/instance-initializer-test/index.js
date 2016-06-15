module.exports = {
  description: 'Generates an instance initializer unit test.',

  locals: function() {
    var destroyAppExists =
      existsSync(path.join(this.project.root, '/tests/helpers/destroy-app.js'));

    return {
      destroyAppExists: destroyAppExists
    };
  }
};
