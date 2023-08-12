
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea,  Checkbox, IconButton } from '@mui/material';
import {  Delete,  Done } from '@mui/icons-material';


export default function Task({title,description, isCompleted , updateHandler , DeleteHandler}) {
  
  
  return (
    <Card  sx={{ width: 300, transition : 'all .6s easeInOut' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title} 
            <Checkbox checked={isCompleted}
 onChange={updateHandler}
  icon={<Done backgroundColor='black' />}

/>
<IconButton  onClick={DeleteHandler}> <Delete backgroundColor='black'/></IconButton>
    
    

          </Typography>
          <Typography variant="body2" color="text.secondary">
           {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    
   
    </Card>
  );
}

