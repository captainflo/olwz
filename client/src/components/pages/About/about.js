import './style.css'
import React from "react";
class Home extends React.Component {

  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
              <h1 className="display-4">who we are</h1>
                  <p className="lead">As people with a passion for travel, experiencing new cultures, and partying, we are fortunate to have a network of awesome liaisons that show us a good time every time. </p>
                  <p className="lead">We know visitors to major cities are looking for this same experience, yet there is no service that connects them to the insiders running the scene.</p>
                  <p className="lead">Now with Owlz this experience is possible. Owlz takes a friendly and personalized approach to hospitality connecting you with the best liaisons the city has to offer. </p>
                  <p className="lead">Our clients experience the city like they never have before.</p>
                  <p className="lead">-Sincerely, the team at Owlz</p>
                </div>
              </div>
        </div>
        {/* <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="aboutus">
                        <h2 class="display-4">who we are</h2>
                        <br/>
                        {/* <p>As people with a passion for travel, experiencing new cultures, and partying, we are fortunate to have a network of awesome liaisons that show us a good time every time. </p>
                        <p>We know visitors to major cities are looking for this same experience, yet there is no service that connects them to the insiders running the scene.</p>
                        <p>Now with Owlz this experience is possible. Owlz takes a friendly and personalized approach to hospitality connecting you with the best liaisons the city has to offer. </p>
                        <p>Our clients experience the city like they never have before.</p>
                        <p>-Sincerely, the team at Owlz</p>                          
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                        <img class="miami mx-auto d-block" src="/assets/images/miami.jpg" alt="image">
                    </div>
                </div>
            </div>
      </div> */}
      </div>

    );
  }

}

export default Home;
