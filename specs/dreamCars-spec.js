describe('DreamCars Select Box', function () {
  beforeEach(function() {
  	browser.get('http://localhost:3000/cars.html');
  });

  it('After being added to the wish list, a car should no longer be available for selection.', function () {
  	var removedCar;

  	// Store the car that will be selected and added, therfor should be remvoed.
  	element(by.css('select [value="2"]')).getText().then(function (opt) { removedCar = opt; });

  	// Add the second car on the list.
  	element(by.css('select [value="2"]')).click();
  	element(by.id('Add')).click();

  	// Verify the element has been removed from the options.
  	element.all(by.tagName('option'))
      .then(function (options) {
  	    for(var i  = 0; i <= options.length; i++) {
		  if(options[i]) {
		    options[i].getText().then(function (text) {
			  expect(text).not.toBe(removedCar);
		    });
		  }
  		}
      });
  });

  it ('Should let me choose a car model from a select box and it to a wish', function () {
  	var addedCar;

  	// Store the car that will be selected and added, therfor should be remvoed.
  	element(by.css('select [value="3"]')).getText().then(function (opt) { addedCar = opt; });

  	expect(element.all(by.repeater('car in selectedCars')).first().isPresent()).toBeFalsy();

  	// Add the second car on the list.
  	element(by.css('select [value="3"]')).click();
  	element(by.id('Add')).click();

  	// Verify that the removed car exists within the list items.
  	expect(element.all(by.repeater('car in selectedCars')).first().isPresent()).toBeTruthy();
  	element.all(by.repeater('car in selectedCars')).first().getText().then(function (text) {
  		expect(text).toContain(addedCar);
  	});
  });

  it('After added to the wish list, should default to the first alphabetically available car from the same make', function () {
	var nextAvailable;

	// Store the next alphabetically available.
  	element(by.css('select [value="2"]')).getText().then(function (opt) { nextAvailable = opt; });

  	// Add the first car on the list.
  	element(by.css('select [value="1"]')).click();
  	element(by.id('Add')).click();

	element(by.css('select [value="1"]')).getText()
		.then(function (opt) {
			expect(opt).toBe(nextAvailable);
		});
  });

  it ('Should be some mechanism to remove a car from the wish list (thus making it selectable once more)', function () {
  	var added;

	// Store the next alphabetically available.
  	element(by.css('select [value="1"]')).getText().then(function (opt) { added = opt; });

  	// Add the first car on the list.
  	element(by.css('select [value="1"]')).click();
  	element(by.id('Add')).click();

  	element.all(by.css('[ng-click="remove(car)"]')).first().click();

  	// Add the first car on the list.
  	element(by.css('select [value="1"]')).getText().then(function (text) {
  		expect(text).toBe(added);
  	});
  });

  it ('When all cars from a make have been selected - The first available car in the list should be suggested', function () {
  	var suggestion;

	// Store the next alphabetically available.
  	element(by.css('select [value="4"]')).getText().then(function (opt) { suggestion = opt; });

  	for (var i = 2; i >= 0; i--) {
	  	element(by.css('select [value="1"]')).click();
	  	element(by.id('Add')).click();
  	}

  	// Add the first car on the list.
  	element(by.css('select [value="1"]')).getText().then(function (text) {
  		expect(text).toBe(suggestion);
  	});
  });
});