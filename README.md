# rtx <br/>
[![npm package](https://img.shields.io/badge/npm-0.0.2-blue.svg)](https://www.npmjs.com/package/rtx)
> A reactive library for Javascript Apps.

### Why rtx?
**rtx** is a reactive library that provides for your application multiple stores, wich each store manage her state. You can organize your stores and turn your application more organized.

<pre align="center">
╔═════════╗       ╔════════════╗       ╔═══════════╗       ╔═════════════════╗
║  Store  ║──────>║  Dispatch  ║ ────> ║   State   ║ ────> ║ View Components ║
╚═════════╝       ╚════════════╝       ╚═══════════╝       ╚═════════════════╝

</pre>

### Install
* Npm: ``` npm install rtx ```
* Bower: ``` bower install rtx ```

### Reasons for use
* Tiny size: ~1kb
* Best Performance
* Reactive Stores
* Simple and minimalistic API
* Support nested states.
* Unidirectional data flow

### Data Flow
In **rtx** data flow is unidirectional, as it should be in Flux:

* The store dispatch her actions
* Actions change the state.
* When state changes you can trigger a handler

### Principles:
* Application state is held in the store, as a single object.
* The only way to mutate the state is by dispatching store actions.
* Actions must be synchronous, and the only side effects they produce should be mutating the state.

### Stores:
A **Store** is basically a container that holds your application state. There are two things that makes a **rtx** store different:

 * A Store is **reactive**. Every time the state changes, you can trigger a handler.

 * You cannot directly change the store's **state**. The only way to change a store's state is by explicitly dispatching store actions.

Creating a Store is pretty straightforward - just provide an name, state and actions:

```javascript
import rtx from "rtx";

let todoStore = rtx.createStore({
  name: 'Todo',
  state:  {
    todos: []
  },
  actions: {
    ADD_TASK ( state, task ) {
      state.todos.push(task);
    },
    REMOVE_TASK ( state, index ) {
      state.todos.splice(index, 1);
    }
  }
})

// every time the state changes, this function will be triggered 
todoStore.observe(function(listenables, state, value){
  listenables.forEach( ( component ) => {
    component.forceUpdate();
  })
})

module.exports = todoStore;
```

#### State
Application state is held in the store, as a single object. **rtx** uses a **single state tree** - that is, this single object contains all your Store level state and serves as the *"single source of truth"*.

#### Observe state changes in your Component
> When some state change in your store, your store handler function will called.

```js
// every time the state changes, this function will be triggered 
TodoStore.observe(function(listenables, state, value){
  listenables.forEach( ( component ) => {
    component.forceUpdate();
  })
})
```

#### Your Component
> When some state change in your store, your store handler will be called.

```js
// Inside your Task Component
import React from "react";
import ReactDOM from "react-dom";
import todoStore from "../store/todoStore";

export default class Tasks extends React.Component {
  constructor(props){
    super(props);
    this.removeTask = this.removeTask.bind(this);
  }
  
  removeTask ( event ) {
    todoStore.dispatch('todos', 'REMOVE_TASK', event.target.id);
  }
  
  componentWillMount() {
    todoStore.addListener(this)
  }
  
  componentWillMount() {
    todoStore.removeListener(this)
  }
  render ( ) {
    return (
      <div className="six columns full gray">
      <h1 className="title"> Tasks: { this.props.todos.length }</h1>
        <ul>
          {this.props.todos.map((todo, index) => {
            return <li key={index} id={index} onClick={ this.removeTask }> #{index} { todo } </li>
          })}
        </ul>
      </div>
    )
  }
}
```

```js
// Inside your main Component
import React from "react";
import ReactDOM from "react-dom";
import Todo from "./todo.jsx";
import Tasks from "./tasks.jsx";
import todoStore from "../stores/todoStore";

const app = document.getElementById('app');

class App extends React.Component {
  render() {
    return (
      <div>
        <Todo/>
        <Tasks todos = { todoStore.get('todos') }/>  
       </div>
    )
  }
}

ReactDOM.render(<App/>, app);
```
### Store Actions
Actions are just functions that call the store actions. **All actions receive a state as first argument**.

Creating an action inside your Store:

```javascript
actions: {
  increment ( state, n ){
    state.count += n
}
```
#### Calling an action on your component

```javascript
  todoStore.dispatch('todos', 'ADD_TASK', 10);
```

An ```action``` receives the **state** property that you want to change as first argument, the ***action event name** as the second argument, anything after these are passed as arguments to the action callback.

### Get
To get the store state value, use ```yourStore.get( stateName )``` in your Components or Stores.

### Application Structure
Just suggesting.

```project
├──index.html
├──components
|   ├──component.tag
|   ├──other.tag
├──stores
|   ├──todo-store.js
|   ├──api-store.js
```

### API Reference

* #### Create a Store:
  * ``` rtx.createStore({ name, state, actions }) ```: Create a single store with the name of Store, State and Actions.

* #### Store Actions:
  * ``` yourStore.dispatch(stateName, action [,...arguments]) ```: Call a store action.

* #### Add you store handler to be called when the state changes:
  * ``` yourStore.observe(listeners, stateName, stateValue) ```: Register a handler that will be triggered when any state change in you store.


* #### Observing the store state changes in your Component or other Store:
  * ``` yourStore.addListener( listener ) ```: Add the listener for watch the Store state changes.
  * ``` yourStore.removeListener( listener ) ```: Remove the listener for unwatch the Store state changes.
  * ``` yourStore.get(state) ```: Gets a value of the store state that you passed as argument.


### License
MIT License.
