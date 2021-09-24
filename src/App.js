import Navbar from './Component/Navbar';
import Contact from './Component/Contact';
import Login from './Component/Login';
import Home from './Component/Home';
import AddFood from './Settingcomponent/AddFood';
import Signup from './Component/SignUp';
import UpdateFood from './Settingcomponent/UpdateFood';
import Userpanel from './Settingcomponent/Userpanel';
import {Switch,Route,useParams} from 'react-router-dom';


function App() {
  return (
    <>
    <Navbar/>
    <Switch>
    <Route exact path="/" component={Login}/>
    <Route exact path="/Signup" component={Signup}/>  
      <Route exact path="/Home" component={Home}/>
      <Route exact path="/Contact" component={Contact}/>
      <Route exact path="/Userpanel" component={Userpanel}/>
      <Route exact path="/AddFood" component={AddFood}/>
      <Route exact path="/UpdateFood/:id" component={UpdateFood}/> 
    </Switch>
    </>

  );
}

export default App;
