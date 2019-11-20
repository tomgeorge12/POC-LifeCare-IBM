import React, { Component } from 'react';
import {Link} from 'react-router-link';
import 'font-awesome/css/font-awesome.min.css';
// import './footer.css';

class Footer extends Component{

  render() {
    return (
    <footer>
      <div id="credits">
        <div className="text-center">
            <div className="col-md-5 col-lg-12 text-center">
                <Link to="contactus" id="l1">ContactUs |</Link>
                <Link to="about" id="l2">About</Link>

           <p class=""> <small class="name"> © Lifecare India pvt.ltd<br/>Banglore, NM 87131, (+91) 277-0111, <br class=""/>
           Manyata Tech Park. </small> </p>
          <div class="list-inline">
                 <a href="https://www.facebook.com/universityofnewmexico" title="UNM on Facebook" class="">
                   <span className="fa fa-facebook-square fa-2x">&nbsp;</span></a>
                 <a href="https://twitter.com/unm" title="UNM on Twitter" class="">
                   <span className="fa fa-twitter-square fa-2x">&nbsp;</span></a>
                 <a href="http://uofnm.tumblr.com" title="UNM on Tumblr" class="">
                   <span className="fa fa-tumblr-square fa-2x">&nbsp;</span></a>
                 <a href="http://www.youtube.com/user/unmlive" title="UNM on YouTube" class="">
                   <span className="fa fa-youtube-square fa-2x">&nbsp;</span></a>
                 <a href="/feed" title="The Pack RSS Feed" class=""><span className="fa fa-rss-square fa-2x">&nbsp;</span></a>
       <p class="">more at <a href="http://social.unm.edu" title="UNM Social Media Directory &amp; Information" class="">social.unm.edu</a> </p>
       </div>
       </div>
      </div>
    </div>
</footer>
      );
    }
  }

export default Footer;
