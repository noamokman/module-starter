import {expect} from 'chai';

describe('module', () => {
  const module = require('../src');

  describe('exports', () => {
    it('should expose a default function', () => {
      expect(module.default).to.be.a('function');
    });
  });

  describe('add', () => {
    it('should add two numbers', () => {
      expect(module.default(1, 2)).to.equal(3);
    });
  });
});