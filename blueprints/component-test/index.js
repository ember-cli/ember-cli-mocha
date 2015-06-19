module.exports = {
  description: 'Generates a component test.',

  availableOptions: [
    {
      name: 'integration',
      type: Boolean,
      default: false,
      aliases: ['i']
    }
  ],

  locals: function(options) {
    var additionalImports, prefix, testOpts, defaultTest;
    if (options.integration) {
      additionalImports = "import hbs from 'htmlbars-inline-precompile';";
      prefix = 'Integration: ';
      testOpts = 'integration: true';
      defaultTest = "// renders the component on the page\n" +
             "       this.render(hbs`{{" + options.entity.name + "}}`);\n" +
             "       expect(this.$()).to.be.ok;";
    } else {
      additionalImports = '';
      prefix = '';
      testOpts =  "// specify the other units that are required for this test\n" +
              "    // needs: ['component:foo', 'helper:bar']";
      defaultTest = "// creates the component instance\n" +
              "      var component = this.subject();\n" +
              "      expect(component._state).to.equal('preRender');\n\n" +
              "      // renders the component on the page\n" +
              "      this.render();\n" +
              "      expect(component._state).to.equal('inDOM');";
    }

    return {
      additionalImports: additionalImports,
      testPrefix: prefix,
      testOpts: testOpts,
      defaultTest: defaultTest,
      integration: options.integration
    };
  },

  fileMapTokens: function(options) {
    return {
      __testfolder__: function(options) {
        if (options.locals.integration) {
          return 'integration';
        } else {
          return 'unit';
        }
      }
    };
  },

  afterInstall: function(options) {
    if (!options.integration) { return; }

    return this.addPackageToProject('ember-cli-htmlbars-inline-precompile', '^0.1.1');
  }
};
