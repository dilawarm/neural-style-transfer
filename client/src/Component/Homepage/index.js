import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from '../Navbar/index.js';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,

  },
  media: {
    height: 140,
  },
});

function MediaCard() {
  const classes = useStyles();

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <Card className={classes.root}>
      <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://miro.medium.com/max/767/1*B5zSHvNBUP6gaoOtaIy4wg.jpeg"
            title="Neural Style Transfer"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Neural Style Transfer
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Neural style transfer is an optimization technique used to take two images—a 
            content image and a style reference image (such as an artwork by a famous painter)—and 
            blend them together so the output image looks like the content image, but “painted” 
            in the style of the style reference image.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href="#/style" size="small" color="primary">
          Create your own image
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default class Homepage extends Component {
    render() {
        return (
          <div>
            <Navbar where={1}/>
            <MediaCard />
          </div>
        );
    }
}