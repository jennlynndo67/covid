import React from 'react';
import Helmet from 'react-helmet';
import Header from "./Header";
import TenPercentCalc from "./TenPercentCalc";
import CEWSsimpleCalc from "./CEWSsimpleCalc";
import CEWSdetailedCalc from "./CEWSdetailedCalc";
import Footer from "./Footer";




function CalculatorPage(){


  return (
    <div>
      <Helmet>
        <title>COVID-19 Wage Subsidy Calculator</title>
          <meta name="title" content="Covid-19 Wage Subsidy Calculator" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="A calculator to determine Covid-19 Coronavirus wage subsidy for Canadian Businesses." />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Covid-19 Calculator" />
          <meta property="og:description" content="A calculator to determine Covid-19 Coronavirus wage subsidy for Canadian Businesses." />
          <meta property="og:url" content="https://byrondolan.com" />
          <meta property="og:site_name" content="Byron Dolan" />
       </Helmet>
      <Header />
      <div className="container">
      <div className="row">
      <div className="col-lg-2 col-sm-12">
      </div>
      <div className="col-lg-8 col-sm-12">
        <h2>Covid-19 Wage Subsidy Calculators</h2>
        <p>I assume there are many business owners who, like me, are looking for clarity on how much financial support they can expect from the various programs announced by the federal government in the last few weeks. I prepared this calculator for myself, but then decided to also share it with others who are being affected.</p>
<p>The tool is free to use, and I don’t store or track any of the information entered. All I ask is that if you find any errors or have feedback on the tool, please send me an email at <a href="mailto:bd@byrondolan.com">bd@byrondolan.com</a>. I am also interested in hearing if there are any other good calculators out there that I could take a look at.</p>
<p>I will try to add features and update this page as more details about each program are announced.</p>
<p>Good luck to everyone trying to keep their businesses afloat and their teams employed during this time. And remember to wash your hands.</p>
<p>The information is based on what is currently provided on <a href="https://www.canada.ca/en/department-finance/news/2020/04/the-canada-emergency-wage-subsidy.html">this page</a> from the Government of Canada.</p>
<p className="font-italic">I think I am supposed to put a disclaimer here to remind you that I am not your accountant and this is not tax advice. This is a tool for information purposes only. Please talk to your accountant to confirm how these programs apply to your business.
</p>
          <div className="text-center">
        {/*}  <a className = "btn btn-info btn-lg m-2" href="#tenPercent" role="button">Ten Percent Wage Subsidy</a>
          <a className = "btn btn-info btn-lg m-2" href="#CEWSsimplified" role="button">CEWS Simplified</a>
          <a className = "btn btn-info btn-lg m-2" href="#CEWSdetailed" role="button">CEWS Detailed</a>
        */}  </div>
          </div>
          <div className="col-lg-2 col-sm-12">
          </div>
      </div>
      </div>
      <div className="row">
      <div className="col-lg-2 col-sm-12"></div>
<div className="col-lg-8 col-sm-12">

      <div id="accordion">
        <div class="card border-0">
          <div class="card-header bg-white border-0" id="headingOne">
            <h5 class=" text-center">
              <button class="btn btn-info btn-lg collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Ten Percent Wage Subsidy
              </button>
            </h5>
          </div>

          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              <TenPercentCalc /></div>
          </div>
        </div>
        <div class="card border-0">
          <div class="card-header bg-white border-0" id="headingTwo">
            <h5 class="mb-0 text-center">
              <button class="btn btn-info btn-lg collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                CEWS Simplified
              </button>
            </h5>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div class="card-body">
              <CEWSsimpleCalc />
            </div>
          </div>
        </div>
        <div class="card border-0">
          <div class="card-header bg-white border-0" id="headingThree">
            <h5 class="mb-0 text-center">
              <button class="btn btn-info collapsed btn-lg" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                CEWS Detailed
              </button>
            </h5>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">
              <CEWSdetailedCalc />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="col-lg-1 col-sm-12"></div>
</div>
      <Footer />
    </div>

  )

}

export default CalculatorPage;
