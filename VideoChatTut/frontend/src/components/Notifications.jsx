// client/components/Notifications.js
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleAnswerCall = () => {
    answerCall();
    navigate('/video-call');
  };

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={handleAnswerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
