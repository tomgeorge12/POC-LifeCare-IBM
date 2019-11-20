
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container'
import './App.css';
class App extends Component{
   render(){
      return (
        <Container/>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
