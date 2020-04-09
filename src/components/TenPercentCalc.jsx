import React, { useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TenPercentCalc(){

  const [date, setDate] = useState(new Date());


    const handleDateChange = inputDate => {
      setDate(inputDate);
    }

  const [info, setInfo] = useState({
    payFreq: 'monthly',
    sourceDeduct: 'regular',
    nextRemit:'',
    wageCapSub: '58700',
    rate: 10,
    employeesOver:'',
    sumEmpUnder: ''
  })

  const [results, setResults] = useState({
    subsidy: '',
    remittance: '',
    remittanceDate:'',
    excess:''
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
  let totalRemittance = info.nextRemit - totalPerPay;
  let excess = 0;
  if(totalRemittance < 0){
    excess = totalRemittance;
    totalRemittance = 0;
  }

  var month = date.getMonth();
  var day = date.getDate();
  var remitDate = '';
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  if(info.sourceDeduct === 'regular'){
    var m = month+1;
    remitDate = months[m]+ ' 15, 2020';
    console.log(remitDate);
  }else if(day > 15){
    remitDate = months[m] + ' 10, 2020';

  }else{
    remitDate = months[month] + ' 25, 2020';
  }


  setResults({
    subsidy: totalPerPay,
    remittance: totalRemittance,
    remittanceDate: remitDate,
    excess: excess
  });
    event.preventDefault();
  }

  function clearInfo(event){

    setInfo({
      date:'',
      payFreq: 'monthly',
      sourceDeduct: 'regular',
      nextRemit:'',
      wageCapSub: '58700',
      rate: 10,
      employeesOver:'',
      sumEmpUnder: ''
    })
    setDate(new Date());
    event.preventDefault();
  }


  return (
    <div>

      <div className="container">
        <div className=" row">
          <div className="col-lg-2 col-sm-12">
          </div>
          <div className="col-lg-8 col-sm-12">
          <div id="tenPercent"><h2 className="mt-5">Ten Percent Wage Subsidy</h2></div>
          <p>This is available to all Canadian Controlled Private Corporations. If you are a CCPC, you should be applying for this. There is no sharing of the grant between related companies (like, for example, the Small Business Deduction), so make sure that if you have multiple related companies, you are claiming it with all corps. If you later are approved for the Canadian Emergency Wage Subsidy (for 75%), the 10% will be taken off your subsidy amount, so there is no reason not to apply. It is also the fastest way to get support, since you are simply remitting less in source deductions.</p>
          <p>The calculator for this program will also give you the journal entries for how to record the subsidy and how to record the reduced source deductions payment correctly.</p>
          <div className="container">
          <form>

          <div className="form-group">
          <label className="mr-5">Pay date (date on paycheck)</label>
          <DatePicker
            selected={date}
            onChange={handleDateChange}
          />
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
            <label >Source Deduction Remittance Frequency</label>
            <select
              onChange={handleChange}
              className="form-control"
              id="sourceDeductionRemittance"
              name="sourceDeduct"
              value={info.sourceDeduct}
              >
              <option value="regular">Regular (monthly)</option>
              <option value="Threshold">Threshold 1 (twice monthly)</option>
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
              <label>Wage Subsidy Rate</label>

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



            <div className="form-group ">
              <label>Number of Employees with Annual Pay Over the Wage Cap</label>
              <input
                onChange={handleChange}
                className="form-control"
                id="employeesOver"
                name="employeesOver"
                value={info.employeesOver}
              />
            </div>


            <div className="form-group">
              <label>Combined Gross Pay in this period of Employees with Annual Pay Below Wage Cap</label>
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

            <div className="form-group">
              <label >Source Deductions Due on Next Remittance Before Subsidy is Applied (i.e. your Source Deductions as you normally calculate them).</label>
              <input
                onChange={handleChange}
                className="form-control"
                id="nextRemit"
                name="nextRemit"
                value={info.nextRemit}
              />
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
              <label >Total Wage Subsidy For This Pay Period</label>
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
                <label>Source Deductions Payment Due After Subsidy</label>
                <input
                  readOnly
                  className="form-control"
                  value={results.remittance}
                />
              </div>

              <div className="form-group">
                <label>Source Deductions Remittance Due Date</label>
                <div className="input">
                  <input
                    readOnly
                    className="form-control"
                    value={results.remittanceDate}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Carry Forward Credit (if for some reason your subsidy exceeds your source deductions)</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    readOnly
                    className="form-control"
                    value={results.excess}
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
                  <label >Debit - Source deductions payable (Balance Sheet - Payable)</label>
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

                    <h5>Journal Entries to record payment of source deduction</h5>

                    <div className="form-group">
                      <label >Debit - Source deductions payable (Balance Sheet - Payable)</label>
                      <div className="input-group">
                        <div className="input-group-append">
                          <span className="input-group-text">$</span>
                        </div>
                        <input
                          readOnly
                          className="form-control"
                          value={results.remittance}
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
                            value={(() => {
                              const r=-results.remittance;
                              if(isNaN(r)){
                                return '';
                              }else{
                                return r;
                              }
                            }) ()}
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

export default TenPercentCalc;
