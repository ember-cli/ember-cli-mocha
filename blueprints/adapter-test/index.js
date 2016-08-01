module.exports = {
  description: 'Generates an ember-data adapter unit test',

  locals: function() {
    var packages = Object.keys(this.project.addonPackages);
    var jshintExists = packages.indexOf('ember-cli-jshint') !== -1;

    return {
      jshintExists: jshintExists
    };
  }
};
