import './App.css';
import { handleInitialData } from './actions/shared'
import { useEffect } from "react";
import { connect } from "react-redux";



const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);


  return (
    <div className="App">
      Hello World!
    </div>
  );
}

export default connect()(App);

