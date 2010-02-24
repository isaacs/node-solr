var asyncTesting = require("./async_testing");
var solr = require("../solr");
var sys = require("sys");

var suite = new asyncTesting.TestSuite();
suite.setup(function () {
  this.client = solr.createClient();
});
suite.addTests({
  add: function (assert, finished) {
    var doc = {
      id: "1",
      fizzbuzz_t: "foo",
      wakak_i: "5"
    };
    var options = {};
    var callback = function (err, response) {
      assert.equal(solr.getResponseStatus(response), 0);
      finished();
    };
    this.client.add(doc, options, callback);
  },
  commit: function (assert, finished) {
    var options = {};
    var callback = function (err, response) {
      assert.equal(solr.getResponseStatus(response), 0);
      finished();
    };
    this.client.commit(options, callback);
  }
});

exports.updateSuite = suite;

if (module === require.main) {
  asyncTesting.runSuites(exports);
}
