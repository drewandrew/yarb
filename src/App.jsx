import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {

  render() {
    return (
      <main className="main">
        <p>YARBP - Yet Another React Boilerplate</p>
      </main>
    );
  }
}
export default connect()(App);
