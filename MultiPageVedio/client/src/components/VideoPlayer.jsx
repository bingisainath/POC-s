// //client/VideoPlayer.js
// import React, { useContext } from "react";
// import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

// import { SocketContext } from "../Context";

// const useStyles = makeStyles((theme) => ({
//   video: {
//     width: "550px",
//     [theme.breakpoints.down("xs")]: {
//       width: "300px",
//     },
//   },
//   gridContainer: {
//     justifyContent: "center",
//     [theme.breakpoints.down("xs")]: {
//       flexDirection: "column",
//     },
//   },
//   paper: {
//     padding: "10px",
//     border: "2px solid black",
//     margin: "10px",
//   },
// }));

// const VideoPlayer = () => {
//   const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
//     useContext(SocketContext);
//   const classes = useStyles();

//   return (
//     <Grid container className={classes.gridContainer}>
//       <Paper className={classes.paper}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" gutterBottom>
//             {name || "Name"}
//           </Typography>
//           <video
//             playsInline
//             muted
//             ref={myVideo}
//             autoPlay
//             className={classes.video}
//           />
//         </Grid>
//       </Paper>

//       {callAccepted && !callEnded && (
//         <Paper className={classes.paper}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>
//               {call.name || "Name"}
//             </Typography>
//             <video
//               playsInline
//               ref={userVideo}
//               autoPlay
//               className={classes.video}
//             />
//           </Grid>
//         </Paper>
//       )}
//     </Grid>
//   );
// };

// export default VideoPlayer;

// client/pages/VideoCall.js
import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoCall = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    leaveCall,
  } = useContext(SocketContext);
  const classes = useStyles();
  const navigate = useNavigate();

  // Ensure the video ref is available and set the srcObject once the component is mounted
  useEffect(() => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream, myVideo]);

  useEffect(() => {
    if (userVideo.current && callAccepted) {
      userVideo.current.srcObject = stream;
    }
  }, [callAccepted, userVideo]);

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ textAlign: "center", marginTop: 20 }}
          >
            <button
              onClick={() => {
                leaveCall();
                navigate("/");
              }}
            >
              End Call
            </button>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoCall;
