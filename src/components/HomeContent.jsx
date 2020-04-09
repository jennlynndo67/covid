import React from "react";

function HomeContent(){
  return (
    <div>
    <div className="text-center">

    <a className = "btn btn-info btn-lg m-2" href="/covid-19-wage-subsidy-calculator" role="button">Covid-19 Subsidy Calculator</a>
    </div>
      <div id="about" class="container-fluid">

        <div class="row">
          <div class="col-sm-8">
            <h2>Background</h2><br />



            <h4>Byron is a Chartered Professional Accountant (CPA, CA) and independent consultant providing financial, commercial, project planning and strategy support. Byron is also an entrepreneur and business owner who knows the challenges of building a business and the keys to achieving success.</h4><br />
            <p>Byron's background includes<br />
      - Extensive experience in financial, procurement and project management services.<br />
      - Experience working within large multinational resource companies, as well as small to medium sized businesses.<br />
      - Brought major construction projects from planning and approval, to completion ahead of schedule and under budget.<br />
      - Built businesses from early stage start-up to successful market leader.<br />
      - Provided full financial and commercial support to start-ups.</p>

          </div>
          <div class="col-sm-4" id="about_icon">

          </div>
        </div>
      </div>
      {/*<!-- Container (Services Section) -->*/}
      <div id="services" class="container-fluid text-center">

        <br />
          <div class="row">
          <div class="col-sm-4">

          </div>
          <div class="col-sm-8">
            <h2 id="service_title">SERVICES</h2>
            </div>
          </div>
          <div class="row">
          <div class="col-sm-4"></div>
          <div class="col-sm-4">
          <h4> Financial Modelling and Forecasting</h4>
          <h4>Strategic Planning</h4>
          <h4>Commercial Negotiation</h4>
            <h4>Risk Management and Mitigation</h4>
          </div>
          <div class="col-sm-4">
            <h4>Project Planning and Governance</h4>
            <h4>Business Reorganization and Combinations</h4>
            <h4>Project Management and Reporting</h4>
            <h4>Business Process Mapping and Improvement</h4>
          </div>
          </div>


          </div>




      {/*<!-- Container (Contact Section) --> */}
      <div id="contact" class="container-fluid bg-grey">
        <h2 class="text-center">CONTACT</h2>
        <div class="row">
          <div class="col-sm-3"></div>

          <div class="col-sm-6 text-center">
            <h4>bd@byrondolan.com</h4></div>
          <div class="col-sm-3"></div>





        </div>
      </div>
      </div>


  )

}

export default HomeContent;
