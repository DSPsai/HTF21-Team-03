import { BrowserRouter as Router, Switch, Route ,Link } from 'react-router-dom';
import './App.css';
import { useEffect,useState } from "react";
import './Pages/Home.css'
import Home from './Pages/Home';
//import Signup from './Pages/Signup';
// import Item from './Pages/Item';
import Nav from './Pages/Nav'
function App() {
  const [username,setUserame] = useState('');
  useEffect(() =>{
    setUserame(prompt("Enter your name : "));
  },[])
  useEffect(() => {
    localStorage.setItem('user',username)
},[username]);
  function NotLog(){
    return <div>Not Logged in</div>
  }
  return (<Router>
    <Nav/>
    <Switch>      {/*switching from one page to another*/}
      <Route path='/' exact component={Home} />
      {/* <Route path='/Item/:item' exact component={Item} /> */}
     {/* <Route path='/signup' exact component={Signup} />*/}
    </Switch>
  </Router>)
}

export default App;
