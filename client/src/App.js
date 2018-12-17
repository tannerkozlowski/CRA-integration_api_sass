import React, { Component } from 'react';
import HomePage from './containers/HomePage';
import Footer from './containers/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage />
        <Footer />
      </div>
    );
  }
}

export default App;
