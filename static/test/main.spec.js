import {expect} from 'chai';

describe('module', () => {
  let module = require('../src');

  describe('exports', () => {
    it('should expose a default function', () => {
      expect(module.default).to.be.a('function');
    });
  });
});