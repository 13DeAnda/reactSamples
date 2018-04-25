var until = protractor.ExpectedConditions;


describe('The Aplication', function() {
  browser.get('http://localhost:3000/');
  describe('The Aplication', function() {
    it('load the landing page', function() {
      expect(element(by.css('.landing')).isPresent()).toBe(true);
    });
  });
  describe('The To Do List', function() {
    it('selects to do list from links on landing', function() {
      expect(element(by.css('.toDoList')).click());
    });
    it('lands on to do list page', function() {
      expect(element(by.css('.toDoListContainer')).isPresent()).toBe(true);
      browser.pause();
    });
  });
});