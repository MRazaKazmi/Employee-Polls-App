import './App.css';
import { handleInitialData } from './actions/shared'
import { connect } from "react-redux";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Signin from './components/signin';
import Home from './components/home';
import PrivateRoute from './components/privateRoute';
import { Routes, Route, Navigate } from 'react-router-dom';
import PollDetail from './components/pollDetail';
import Leaderboard from './components/leaderboard';
import Navbar from './components/navbar';
import CreatePoll from './components/createPoll';

const App = (props) => {
  const authedUser = useSelector(state => state.authedUser);

  useEffect((props) => {
    props.dispatch(handleInitialData());
  }, []);

  return (

    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/home"
            element={
              <PrivateRoute authedUser={authedUser}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <PrivateRoute authedUser={authedUser}>
                <PollDetail />
              </PrivateRoute>
            }
          />
           <Route
            path="/leaderboard"
            element={
              <PrivateRoute authedUser={authedUser}>
                <Leaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute authedUser={authedUser}>
                <CreatePoll />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              authedUser ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />
            }
          />
        </Routes>
    </div>
  );
}


export default connect()(App);

