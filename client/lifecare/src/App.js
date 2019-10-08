
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import LifeCycle from './lifecare-container/lifecare.component'
import './lifecare-component/cards/hospitalmain/toolbox/theme.css'
class App extends Component{

   render(){
      return (
        <LifeCycle/>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
