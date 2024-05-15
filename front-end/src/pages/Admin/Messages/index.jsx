import React, { useContext } from 'react'
import { MessageContext } from '../../../context/messageContext'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { delOne, getOne, patch } from '../../../services/API/requests';
import { enpoints } from '../../../services/constants';
import { isRouteErrorResponse } from 'react-router-dom';


const AdminMessages = () => {

  const { messages, setMessages } = useContext(MessageContext)

  const handleIsRead = (id) => {
    getOne(enpoints.messages,id).then((res)=>{
     const markedmes=res.data
     console.log();
     patch(enpoints.messages, id,{...markedmes,isRead:!markedmes.isRead})
     setMessages(prevMessages => {
      return prevMessages.map(message => {
        if (message.id === id) {
          return { ...message, isRead: !message.isRead };
        }
        return message;
      });
    });
    })
    
  }
  const handledel=(id)=>{
    delOne(enpoints.messages,id)
   const filterefdmess=messages.filter((x)=>(x.id!=id))
    setMessages(filterefdmess)
  }
  return (
    <>

      <CardContent style={{ width: "1200px", margin: "20px auto",gap:"30px", display:"flex" }}>
        {messages.map((message) => {
          return (
            <Card key={message.id} sx={{ maxWidth: 345 }} style={{backgroundColor :message.isRead?"rgba(178,222,39,0.8)":"rgba(255, 0, 82,0.6)",color:"white"}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {message.fullName}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {message.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {message.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {message.message}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" style={{width:"120px"}} onClick={() => { handleIsRead(message.id) }}>{message.isRead ? "isRead" : "markAsRead"}</Button>
                <Button size="small" style={{width:"120px"}} onClick={()=>{handledel(message.id)}}>del</Button>
              </CardActions>
            </Card>
          )
        })}
      </CardContent>
    </>
  )
}

export default AdminMessages
