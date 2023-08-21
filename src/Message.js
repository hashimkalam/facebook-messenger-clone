import React, { forwardRef } from "react";
import "./Message.css";
import { Card, CardContent, Typography } from "@mui/material";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  return (
    <Card ref={ref} className={`message ${isUser && "message__user"}`}>
      <CardContent>
        <Typography color="black" variant="h5" component="h2">
          {!isUser && `${message.username || "Unknown User"}:`}{" "}
          {message.message}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default Message;
