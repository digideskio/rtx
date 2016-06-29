!function (e, n) { "function" == typeof define && define.amd ? define([], n) : "undefined" != typeof module ? module.exports = n : e.rtx = n() } (this,
  function () {
    /*!
      --------------------------------
      rtx 
      --------------------------------
      + https://luisvinicius167.github.io/rtx/
      + Copyright 2016 Luis Vinícius
      + Licensed under the MIT license
      + Documentation: https://github.com/luisvinicius167/rtx
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
     * @name rtx
     * @desc the object that creates the store
     */
    var rtx = {};
    /**
     * @name createStore
     * @desc create an Store
     * @param {object} obj the all data of the store
     * @return {object} the store instance
     */
    rtx.createStore = function (obj) {
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
    /**
     * @name addListener
     * @desc Add an listener to watch the state changes
     */
    _store.addListener = function (component) {
      this.listenables.push(component);
    }

    /**
     * @name removeListener
     * @desc Remove an listener to unwatch the state changes
     */
    _store.removeListener = function (component) {
      var self = this;
      this.listenables.forEach(function (listener, index) {
        if (listener === component) {
          self.listenables.splice(index, 1)
        }
      })
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
    return rtx;
  }
);