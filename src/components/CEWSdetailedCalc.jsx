import React, { useState, Fragment }from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CEWSdetailedCalc(){

  const [date, setDates] = useState({
    paydayDate : new Date(),
    eligiblePeriod : ''
  });


  const [employeePays, setEmployeePay] = useState([
    {
      lastPay:0,
      currentPay: 0
    }
  ]);

  const [info, setInfo] = useState({
    payFreq: 'monthly',
    wageCapSub: '58700',
    rate: 75,
    prevRev: '',
    currentRev: '',
  });

  const [results, setResults] = useState({
    subsidy: ''
  });


  const handleAddFields = () => {
  const values = [...employeePays];
  values.push({ lastPay: 0, currentPay: 0 });
  setEmployeePay(values);
};


const handleRemoveFields = index => {
  const values = [...employeePays];
  if(index !== 0){
    values.splice(index, 1);
    setEmployeePay(values);
  }

};


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

  const handleEmployeeChange =(index, event) => {
    const values = [...employeePays];
    if (event.target.name=== "lastPay"){
      values[index].lastPay = parseFloat(event.target.value);
    }else {
      values[index].currentPay = parseFloat(event.target.value);
    }
    setEmployeePay(values);
  };






  function handleChange(event){
  const value=event.target.value;
  setInfo({
    ...info,
    [event.target.name]:value
  });
  }



  function submitInfo(event){
    let totalSubsidyPerPay = 0;
    let maxBenefit = 0;
    if(info.payFreq === "monthly"){
      maxBenefit = (info.wageCapSub/12)*(info.rate/100);
    }else if(info.payFreq === "semi-monthly"){
      maxBenefit = (info.wageCapSub/24)*(info.rate/100);
    }else if(info.payFreq === "bi-weekly"){
      maxBenefit = (info.wageCapSub/26)*(info.rate/100);
    };





    employeePays.forEach((element, index) => {
      console.log("maxBenefit: " + maxBenefit);
      var employeeSub = Math.max(Math.min((element.currentPay*(info.rate/100)), maxBenefit), Math.min(element.currentPay, maxBenefit, (element.lastPay*(info.rate/100))) );
      totalSubsidyPerPay = totalSubsidyPerPay + employeeSub
      console.log(employeeSub);

    });
    totalSubsidyPerPay = (Math.floor(totalSubsidyPerPay*100)/100)

    setResults({
      subsidy: totalSubsidyPerPay


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

    })
    setDates({
      paydayDate: new Date(),
      eligibleDate: ''
    });
    setEmployeePay([
      {
        lastPay:0,
        currentPay: 0
      }
    ]);
    setResults({
      subsidy: ''
    })
    event.preventDefault();
  }


  return (
    <div>

      <div className="container">
        <div className=" row">
          <div className="col-lg-2 col-sm-12">
          </div>
          <div className="col-lg-8 col-sm-12">
          <div id="CEWSdetailed"><h2 className="mt-2">Canadian Emergency Wage Subsidy (Detailed)</h2></div>

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
                  *Note* If this is under 30% you are likely ineligible for a subsidy
                </small>
              </div>


              <h5>Employee Gross Salary</h5>
              <small className="form-text text-muted">
                <p>Use +/- buttons to add more Employee fields.</p>
                <p>"Pay Last Period" is what the employee's pay cheque typically was prior to the COVID-19 slow-down.</p>
                <p>"Pay for Current Period" is the pay cheque the employee is being paid in this period.</p>
              </small>
              {employeePays.map((employeePay, index) => (
                <Fragment key={`${employeePay}~${index}`}>
                <div className="form-row">
                  <div className="form-group mr-2">
                    <label htmlFor="lastPay">Pay Last Period</label>
                    <input
                      className="form-control"
                      type="number"
                      id="lastPay"
                      name="lastPay"
                      value={employeePay.lastPay}
                      onChange={event => handleEmployeeChange(index, event)}
                    />
                  </div>
                  <div className="form-group mr-2">
                    <label htmlFor="currentPay">Pay for Current Period </label>
                    <input
                      className="form-control"
                      type="number"
                      id="currentPay"
                      name="currentPay"
                      value={employeePay.currentPay}
                      onChange={event => handleEmployeeChange(index, event)}
                    />
                  </div>
                  <button
                    className="btn btn-secondary mr-2 h-50 my-auto"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-secondary h-50 my-auto"
                    type="button"
                    onClick={() => handleAddFields(index)}
                  >
                   +
                  </button>
                  </div>


                </Fragment>
              ))}





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

export default CEWSdetailedCalc;
