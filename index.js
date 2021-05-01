// // Your code here

// Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents
function createEmployeeRecord(arr) {
// Argument(s)
// A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// Returns
// JavaScript Object with keys:
    const obj = {
    // firstName
    firstName : arr[0],
    // familyName
    familyName : arr[1],
    // title
    title : arr[2],
    // payPerHour
    payPerHour : arr[3],

    timeInEvents : [],

    timeOutEvents : []
    }
    return obj

}
// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords (nestedArr) {
    let empRecs = nestedArr.map(element => createEmployeeRecord(element));
    return empRecs;
  }
// Add an Object with keys to the timeInEvents Array on the record Object:
function createTimeInEvent(empRecObj, dateStamp) {
    // Behavior: Add an Object with keys to the timeInEvents Array on the record Object:
    const timeObj = {

        // type: Set to "TimeIn"
        type : 'TimeIn',
        // hour: Derived from the argument 
        hour : parseInt(dateStamp.slice(11)),
        // date: Derived from the argument
        date: dateStamp.slice(0,10)
    }
    empRecObj.timeInEvents.push(timeObj)
    return empRecObj
}
function createTimeOutEvent(empRecObj, dateStamp) {
        // Add an Object with keys to the timeOutEvents Array on the record Object:
        const timeObj = {

            // type: Set to "TimeOut"
            type : 'TimeOut',
            // hour: Derived from the argument 
            hour : parseInt(dateStamp.slice(11)),
            // date: Derived from the argument
            date: dateStamp.slice(0,10)
        }
        empRecObj.timeOutEvents.push(timeObj)
        return empRecObj
}
// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(empRecObj, dateOnlyStamp){
    // time out 
    let timeOut = 0;
    // time in
    let timeIn = 0;
    // create return variable
    let hoursWorked = 0;
    // locate time in date
    empRecObj.timeInEvents.forEach((element) => {
        if(element.date === dateOnlyStamp){
            timeIn = element.hour;
        }
    } )
    // locate time out date
    empRecObj.timeOutEvents.forEach((element) => {
        if(element.date === dateOnlyStamp){
            timeOut = element.hour;
        }
    } )
    // calculate hours worked
    hoursWorked = timeOut - timeIn;
    
    return hoursWorked / 100;

}
// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
function wagesEarnedOnDate(empRecObj, dateOnlyStamp) {
    // calculated amount owed
    let amtOwed = 0;
    // hours worked
    let hoursWorked = hoursWorkedOnDate(empRecObj,dateOnlyStamp);
    amtOwed = hoursWorked * empRecObj.payPerHour;
    return amtOwed;
}
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context.
function allWagesFor(empRecObj) {
    // creates array of all the wages 
    const allWages = empRecObj.timeInEvents.map((workDay) => {return wagesEarnedOnDate(empRecObj,workDay.date)})
    // adds up the arrays using reduce
    return allWages.reduce((sum, curVal) => sum + curVal)
}
function findEmployeeByFirstName(srcArray, fName) {
   
    // iterate over Array of objs
    // compare each elements name to given name
    // if a match is found return element
    let el;
    srcArray.forEach(element => {
      if(element.firstName === fName){
        el = element
      } 
      });

      return el

}
function calculatePayroll (arr) {
    // iterate over arr and get all wages for emp stored in a array
    const allEmpPay = (arr.map((emp) => {return allWagesFor(emp)}))
    // add up all employee pay using reduce
    return allEmpPay.reduce((sum, curVal) => sum + curVal)

    // take emp reco


}