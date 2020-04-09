import React, { useState }from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CEWSsimpleCalc(){

  const [date, setDates] = useState({
    paydayDate : new Date(),
    eligiblePeriod : ''
  });




  const handleDateChange = date => {


    var month = date.getMonth();
    var day = date.getDate();
    var eligiblePeriod = '';
    if((month === 2 && day > 14) ||( month === 3 && day < 12)){
      eligiblePeriod = ('Compare March 2020 over March 2019')
    }else if((month === 3 && day > 11) || (month === 4 && day < 10)){
      eligiblePeriod = ('Compare April 2020 over April 2019')
    }else if((month === 4 && day > 9) || (month === 5 && day < 7)){
      eligiblePeriod = ('Compare May 2020 over May 2019')
    }else{
      eligiblePeriod = ("Not within period of eligibility")
    }
    setDates({
      paydayDate: date,
      eligiblePeriod: eligiblePeriod
    })
  }




  const [info, setInfo] = useState({
    payFreq: 'monthly',
    wageCapSub: '58700',
    rate: 75,
    prevRev: '',
    currentRev: '',
    employeesOver:'',
    sumEmpUnder: ''
  })

  const [results, setResults] = useState({
    subsidy: '',



  })


  function handleChange(event){
  const value=event.target.value;
  setInfo({
    ...info,
    [event.target.name]:value
  });
  }



  function submitInfo(event){
  let totalPerPay = 0;
  if(info.payFreq === "monthly"){
    totalPerPay = (((info.employeesOver*info.wageCapSub/12*(info.rate/100))+ (info.sumEmpUnder*(info.rate/100))));
  }else if(info.payFreq === "semi-monthly"){
    totalPerPay = (((info.employeesOver*info.wageCapSub/24*(info.rate/100))+ (info.sumEmpUnder*(info.rate/100))));
  }else if(info.payFreq === "bi-weekly"){
    totalPerPay = (((info.employeesOver*info.wageCapSub/26*(info.rate/100))+ (info.sumEmpUnder*(info.rate/100))));
  };

  totalPerPay = (Math.floor(totalPerPay*100)/100)


  setResults({
    subsidy: totalPerPay,


  });
    event.preventDefault();
  }

  function clearInfo(event){

    setInfo({
      payFreq: 'monthly',
      wageCapSub: '58700',
      rate: 75,
      prevRev: '',
      currentRev: '',
      employeesOver:'',
      sumEmpUnder: ''
    })
    setDates({
      paydayDate: new Date(),
      eligibleDate: ''
    });
    event.preventDefault();
  }


  return (
    <div>

      <div className="container">
        <div className=" row">
          <div className="col-lg-2 col-sm-12">
          </div>
          <div className="col-lg-8 col-sm-12">
          <div className="mt-5" id="CEWSsimplified"></div>
          <h2>Canadian Emergency Wage Subsidy</h2>
          <p>This is only available if you meet the revenue reduction test. Based on current descriptions of the design, there is a “bright line:” if you experience a 29.99% decrease in revenue, zero subsidy; if you experience a 30.01% decrease, 75% subsidy.</p>
          <p>One interesting quirk that I don’t know if many are talking about is that the subsidy applies to what you paid each employee prior to the COVID-19 crisis. If you have cut back wages or hours since the crisis, you may be eligible for a subsidy of up to 100% of what you are currently paying your employees. The hope is that you will increase their wage back to pre-COVID-19 levels and cover the remaining 25%. You will need to apply for this subsidy and wait up to six weeks for payment from the Canada Revenue Agency. </p>

          <p>I have two calculators for this program. The simplified calculator does not require as much info, and will give you a general idea of what your subsidy will be. The detailed calculator factors in more of the complexities of pre- and post-COVID-19 wage levels by employee to give a clearer picture.
</p>

<div className="text-center">

</div>
  <h2 className="mt-5">Simplified Calculation</h2>
  <div className="container">
          <form>

          <div className="form-group">
          <label className="mr-5">Pay date (date on paycheck)  </label>
          <DatePicker
            selected={date.paydayDate}
            onChange={handleDateChange}
          />
          <small className="form-text text-muted">
            *Note* Needed to determine which periods to compare for revenue test.
          </small>
          </div>



          <div className="form-group">
            <label>Pay Frequency</label>
            <select

            onChange={handleChange}
              className="form-control"
              id="payFreq"
              name="payFreq"
              value={info.payFreq}
              >
              <option value="monthly">Monthly</option>
              <option value="semi-monthly">Semi-monthly</option>
              <option value="bi-weekly">Bi-weekly</option>
              </select>
          </div>





            <div className="form-group">
              <label >Wage Cap For Subsidy</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  onChange={handleChange}
                  className="form-control"
                  id="wageCapSub"
                  name="wageCapSub"
                  value={info.wageCapSub}
                />

              </div>
              <small  className="form-text text-muted">
                Determined by goverment
              </small>
            </div>

            <div className="form-group">
              <label>Reimbursment Rate</label>

              <div className="input-group">
                <input
                onChange={handleChange}
                className="form-control"
                id="reimbursmentRate"
                name="rate"
                value={info.rate}
                />
                <div className="input-group-append">
                  <span className="input-group-text">%</span>
                </div>
              </div>
            </div>


            <div className="form-group">
            <label>Reference Period for Eligibility</label>
              <input
                readOnly
                className="form-control"
                id="eligiblePeriod"
                name="eligiblePeriod"
                value={date.eligiblePeriod}
              />

            </div>

            <div className="form-group">
              <label>Previous Year Comparison Month Revenue</label>
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  onChange={handleChange}
                  className="form-control"
                  name="prevRev"
                  value={info.prevRev}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Current Year Comparison Month Revenue</label>
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  onChange= {handleChange}
                  className="form-control"
                  name="currentRev"
                  value={info.currentRev}
                />
              </div>
            </div>

            <div className="form-group">
              <label >Change in Revenue</label>
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">%</span>
                </div>
                <input
                  readOnly
                  className="form-control"
                  value={(() =>{
                    var r = Math.round( ((info.currentRev/info.prevRev)-1)*100)
                      if(isNaN(r)){
                        return '';
                      }else{
                        return r;
                      }
                    })()}
                  />

                </div>
                <small className="form-text text-muted">
                  *Note* If the revenue reduction is not 30% or more you are ineligible for this subsidy
                </small>
              </div>



            <div className="form-group ">
              <label>Number of Employees Over Wage Cap</label>
              <input
                onChange={handleChange}
                className="form-control"
                id="employeesOver"
                name="employeesOver"
                value={info.employeesOver}
              />
            </div>


            <div className="form-group">
              <label>Combined Gross Pay of Employees Under Wage Cap in Pay Period</label>
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  onChange={handleChange}
                  className="form-control"
                  id="sumEmployeesUnder"
                  name="sumEmpUnder"
                  value={info.sumEmpUnder}
                />
              </div>
            </div>


            <button
              onClick={submitInfo}
              type="submit"
              id="submitButton"
              className="btn btn-secondary"
            >
              Calculate
            </button>

          </form>


          </div>
          <div className="container results-container">
            <h3>Results</h3>


          <form>
            <div className="form-group">
              <label >Total Subsidy For This Pay Period</label>
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  readOnly
                  className="form-control"
                  value={results.subsidy}
                  />
                </div>
              </div>
              <p>
              <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#journalEntries1" aria-expanded="false" aria-controls="journalEntries1">
                  Show Journal Entries
                </button>
              </p>
              <div class="collapse" id="journalEntries1">

              <h5>Journal Entries to Recognize Subsidy</h5>

              <div className="form-group">
                <label >Debit - Grants Receivable (Balance Sheet - Asset)</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    readOnly
                    className="form-control"
                    value={results.subsidy}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label >Credit - Grant revenue (Income Statement - taxable revenue)</label>
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text">$</span>
                    </div>
                    <input
                      readOnly
                      className="form-control"
                      value={-results.subsidy}
                      />
                    </div>
                  </div>

                  <h5>Journal Entries to record receipt of subsidy payment from CRA</h5>

                  <div className="form-group">
                    <label >Debit - Bank Account (Balance Sheet - Asset)</label>
                    <div className="input-group">
                      <div className="input-group-append">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        readOnly
                        className="form-control"
                        value={results.subsidy}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label >Credit -  Grants Receivalbe (Balance Sheet - Asset)</label>
                      <div className="input-group">
                        <div className="input-group-append">
                          <span className="input-group-text">$</span>
                        </div>
                        <input
                          readOnly
                          className="form-control"
                          value={-results.subsidy}
                          />
                        </div>
                      </div>
                      </div>

              <button
                className="btn btn-secondary mb-3"
                id="clearButton"
                type="submit"
                onClick={clearInfo}
              >
                Clear Form
              </button>
            </form>
            </div>
          </div>



          <div className="col-lg-2 col-sm-12"></div>
        </div>
      </div>
      </div>


  )
}

export default CEWSsimpleCalc;
