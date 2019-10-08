import React, { PropTypes } from 'react'

import theme from '../toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Button from 'react-toolbox/lib/button/Button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Rating from 'react-rating';
import img_empty from '../images/empty_star.png';
import img_full from '../images/full_star.png';
class MyCard extends React.Component {
  render () {
      let {product} = this.props;
     var cardStyle = {
          marginBottom: "30px",
         backgroundColor: "#FFF"
     };


     return(
       <div  >
         <ThemeProvider theme={theme}>
                   <Card style={cardStyle}  >


               <CardTitle
                 title={product.name}
                />
              <CardActions >
                <Rating  readonly
                    initialRate={3}
                     empty={<img src={img_empty} height="25" width="25" className="icon" />}
                     full={<img src={img_full} height="25" width="25" className="icon" />} />
              </CardActions>

               <CardMedia
                 aspectRatio="wide"
                 image="https://www.multicare.org/files/library/multicare-good-samaritan-hospital-exterior-10.jpg"

               />
             <CardText>your text</CardText>
             <CardActions >

                <Button label="Action 1"  neutral="false" className="pull-right"  raised primary/>

             </CardActions>
             </Card>

                 </ThemeProvider>


       </div>
     );
  }
}

export default MyCard;
