/*jshint node:true*/

module.exports = {
  description: 'Generates a component integration or unit test.',

  availableOptions: [
    {
      name: 'test-type',
      type: String,
      default: 'integration',
      aliases: [
        { 'i': 'integration'},
        { 'u': 'unit'},
        { 'integration': 'integration' },
        { 'unit': 'unit' }
      ]
    }
  ],

  locals: function(options) {
    var testType = options.testType || "integration";

    return {
      testType: testType
    };
  },

  fileMapTokens: function() {
    return {
      __testType__: function(options) {
        return options.locals.testType || 'integration';
      }
    };
  }
};
