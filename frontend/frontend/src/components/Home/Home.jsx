import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from "@mui/material/Avatar";
import { fetchUser } from '../../action/userAction';

function Home({details}) {
  const navigate = useNavigate()
  const user = useSelector(state=>state.login.user)
  const users = useSelector((state)=>state.users)
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user)
    dispatch(fetchUser(user.id));
  }, []);
  useEffect(() => {
    console.log(users);
    setName(users.name);
    setImage(users.image);
  }, [users]);

  return (
    <div className='home-page'>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
       <Avatar src={image}></Avatar>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Welcome <span className='user'>{name}</span>
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
        </Typography>
        
        <Typography variant="body2">
          Click the below link to go 
          <br />
          {'to profile page'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>navigate('/profile')}>PROFILE</Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default Home