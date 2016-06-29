!function (e, n) { "function" == typeof define && define.amd ? define([], n) : "undefined" != typeof module ? module.exports = n : e._r = n() } (this,
  function () {
  /*!
    --------------------------------
    _r 
    --------------------------------
    + https://luisvinicius167.github.io/_r/
    + Copyright 2016 Luis Vinícius
    + Licensed under the MIT license
    + Documentation: https://github.com/luisvinicius167/_r
  */
    'use strict';
    /**
     * Helpers
     */
    var _slice = Array.prototype.slice
      , _push = Array.prototype.push
      ;
    /**
     * @name _storeContainer
     * @desc the private container that has each store state
     */
    var _storeContainer = {};
    /**
     * @name store
     * @desc the public container store
     */
    var _store = {};
    /**
     * @name _r
     * @desc the object that creates the store
     */
    var _r = {};
    /**
     * @name createStore
     * @desc create an Store
     * @param {object} obj the all data of the store
     * @return {object} the store instance
     */
    _r.createStore = function (obj) {
      var store = Object.assign({}, _store);
      store.name = obj.name;
      store.listenables = []
      _storeContainer[store.name] = { state: obj.state, actions: obj.actions };
      return store;
    };

    /**
     * @name dispatch
     * @desc call the action event
     */
    _store.dispatch = function (stateName, action) {
      var args = _slice.call(arguments, 2)
        , state = [_storeContainer[this.name].state]
        ;
      _push.apply(state, args);

      // call action funciton to change the state
      _storeContainer[this.name].actions[action].apply(null, state);

      if (this.hasOwnProperty('handler')) {
        this.handler(
          this.listenables, 
          stateName, 
          _storeContainer[this.name].state[stateName]
        );
      }
    }
    _store.addListener = function( component ){
      this.listenables.push(component);
    }
    /**
     * @name observe
     * @desc handler changes in the store state
     */
    _store.observe = function (handler) {
      this.handler = handler;
    }
    /**
     * @name get
     * @desc get the store state value
     */
    _store.get = function (stateName) {
      return _storeContainer[this.name].state[stateName]
    }
    return _r;
  }
);  