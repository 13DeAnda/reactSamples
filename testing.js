exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./test/mainTest.js'],
  onPrepare: function () {
    browser.ignoreSynchronization = true;
  },
};
