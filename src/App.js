import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { handleInitialData } from './actions/shared';
import Signin from './components/signin';
import Home from './components/home';
import PollDetail from './components/pollDetail';
import Leaderboard from './components/leaderboard';
import Navbar from './components/navbar';
import CreatePoll from './components/createPoll';
import PrivateRoute from './components/privateRoute';

const App = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector(state => state.authedUser);

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={authedUser ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
        <Route element={<PrivateRoute authedUser={authedUser} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/questions/:id" element={<PollDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<CreatePoll />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
