/*jshint node:true*/

var EOL  = require('os').EOL;

module.exports = {
  description: 'Generates a component integration or unit test.',

  availableOptions: [
    {
      name: 'test-type',
      type: ['integration', 'unit'],
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
    var testImports, prefix, testOpts, testContent;
    if (options.testType === 'unit') {
      testImports = '';
      prefix = '';
      testOpts =  "// specify the other units that are required for this test" + EOL +
              "    // needs: ['component:foo', 'helper:bar']";
      testContent = "// creates the component instance" + EOL +
              "      var component = this.subject();" + EOL +
              "      // renders the component on the page" + EOL +
              "      this.render();" + EOL +
              "      expect(component).to.be.ok;" + EOL +
              "      expect(this.$()).to.have.length(1);";
    } else {
      testImports = EOL + "import hbs from 'htmlbars-inline-precompile';";
      prefix = 'Integration: ';
      testOpts = 'integration: true';
      testContent = "// Set any properties with this.set('myProperty', 'value');" + EOL +
              "      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL +
              "      // Template block usage:" + EOL +
              "      // this.render(hbs`" + EOL +
              "      //   {{#" + options.entity.name + "}}" + EOL +
              "      //     template content" + EOL +
              "      //   {{/" + options.entity.name + "}}" + EOL +
              "      // `);" + EOL + EOL +
              "      this.render(hbs`{{" + options.entity.name + "}}`);" + EOL +
              "      expect(this.$()).to.have.length(1);";
    }

    return {
      testImports: testImports,
      testPrefix: prefix,
      testOpts: testOpts,
      testContent: testContent,
      integration: options.integration,
      testType: options.testType
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
