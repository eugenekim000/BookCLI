const expect = require('chai').expect;
const axios = require('axios');
const fs = require('fs');
const assert = require('assert');
const sinon = require('sinon');
const { getData, openReadingList, updateReadingList } = require('../index.js');

const { fileLength, deleteLastLine } = require('./helperFunctions');

describe('Query book', () => {
	it('it should Query 5 books', async () => {
		validQuery = await getData('harry potter');
		assert.equal(validQuery.length, 5);
	});

	it('should return errors with bad queries', async () => {
		let spy = sinon.spy(console, 'log');
		let emptyQuery = await getData('');

		assert.equal(emptyQuery, undefined);
		assert(spy.calledWith('Error in query.'));
		spy.restore();
	});
});

describe('Saving queries', async () => {
	it('it should read the current saved list', async () => {
		let spy = sinon.spy(console, 'log');

		await fileLength();
		assert(spy.calledWith(5));

		spy.restore();
	});

	it('it should add to the saved list', async () => {
		let spy = sinon.spy(console, 'log');

		await updateReadingList('harry potter', './test/');
		await fileLength();
		assert(spy.calledWith(6));

		spy.restore();

		await deleteLastLine();
	});
});
