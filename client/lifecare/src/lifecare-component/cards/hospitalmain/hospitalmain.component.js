import React, { Component } from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import MyModal from '../modalcomp/MyModal';
import './hospitalmain.css';
import $ from 'jquery';

import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Button from 'react-toolbox/lib/button/Button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Rating from 'react-rating';
import img_empty from '../../../images/empty_star.png';
import img_full from '../../../images/full_star.png';

import Drawer from 'react-toolbox/lib/drawer/Drawer';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Input from 'react-toolbox/lib/input/Input';
class HospitalMain extends Component {
//new by kk
constructor(props) {
  super(props);
  this.state = {
      active:false
  };
}

handleToggle = () => {
   this.setState({active: !this.state.active});
 };
handleRate = (rate) =>{
  console.log("clicked "+rate);
};
//
  handleClick(effect){
    //  var content = this.refs.input.value;
    // console.log(this.props.lookupid);
     ModalManager.open(<MyModal effect={effect} hosName={this.props.name} id={this.props.lookupid}/>);
  }

  render () {
    let {name,address,aboutUs,url}=this.props;

    var cardStyle = {
                color : 'black',
                height :'600px',
                marginBottom: "30px",
                backgroundColor: "#FFF",
              };
    var TextStyle = {
          color : 'black',
          height :'50px',
          oveflow : 'hidden',
          textOverflow : 'ellipsis'
    } ;

    var drawerStyle = {
       marginLeft : "20px"
    };
    const effect= Effect.FlipHorizontal3D;
    return(
      <div>

        <ThemeProvider theme={theme}>
           <Drawer active={this.state.active} onOverlayClick={this.handleToggle} type="right"  >
           <AppBar title='Feedback'>

           </AppBar>
           <div  style={drawerStyle} >
             <h4>Your Feedback helps us improve Lifecare</h4>
             <ThemeProvider  theme={theme}>

            <Input type='text' label='Enter Reference ID' />

            </ThemeProvider>

             <Rating
              fractions={2}  onClick={(rate)=>{this.handleRate(rate)}}
                      empty={<img src={img_empty} alt="hi" height="25" width="25" className="icon" />}
                      full={<img src={img_full} alt="hi" height="25" width="25" className="icon" />} />
                      <br/><br/><br/>
                      <ThemeProvider  theme={theme}>
                      <Button label='Submit' raised accent primary  />
                      </ThemeProvider>
                 </div>
           </Drawer>
         </ThemeProvider>

        <ThemeProvider theme={theme}>
              <Card style={cardStyle}>
              <CardTitle
                title={name}
                className="card-title"
               />
             <CardActions className="card-rating">
               <Rating  readonly
                   initialRate={3.5}
                   fractions={2}
                    empty={<img src={img_empty} height="25" width="25" className="icon" />}
                    full={<img src={img_full} height="25" width="25" className="icon" />} />
             </CardActions>
              <CardMedia
                aspectRatio="wide"
                image={url}
              />
              <Button   floating primary mini onClick={this.handleToggle}>
                   <  span className="glyphicon glyphicon-star-empty"></span>
               </Button>
            <div className="card-text">
              <CardText >{address}</CardText>
            </div>
            <CardActions className="card-action">
               <Button label="View More"  neutral="false" className="pull-right"  raised primary onClick={()=>this.handleClick(effect)}/>
            </CardActions>
            </Card>
          </ThemeProvider>
      </div>
    )

  }
}

export default HospitalMain;

// <CardText style={TextStyle} >{aboutUs}</CardText>

// <div className="panel panel-default">
//   <div className="panel-heading">
//       <h4>{name}</h4></div>
//
//       <div className="panel-body">
//         {address}
//       // <br/>
//       <button className="btn btn-primary pull-right" role="button" type="button"
//         onClick={()=>this.handleClick(effect)}>view details</button>
//       </div>
//   </div>

// <Card level={2} >
//   {name}
//   {address}
//   <button>
//       clickme
//   </button>
// </Card>
// <div>
//   {name}
// </div>

// <div className="card">
//    <img className="card-img-top" src="..." alt="Card image cap"/>
//      <div className="card-header">
//         Featured
//     </div>
//   <div className="card-block">
//       <h4>{name}</h4></div>
//
//       <div className="card-text">
//         {address}
//
//       <button className="btn btn-primary pull-right" role="button" type="button"
//         onClick={()=>this.handleClick(effect)}>view details</button>
//       </div>
//   </div>

      // <div className="panel panel-default">
      //   <div className="panel-heading">
      //       <h4>{name}</h4></div>
      //       <div className="panel-body">
      //         {address}<br/>
      //         {aboutUs}
      //       <br/>
      //       <button className="btn btn-primary pull-right" role="button" type="button"
      //         onClick={()=>this.handleClick(effect)}>view details</button>
      //       </div>
      //   </div>
