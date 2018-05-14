`use strict`;
/**Adding Appointment */
function addAppt () {
    let dt = $('#addPicker').datepicker('getDate') ; //2007-12-12 
    let time = $('#addTime').val();
    let description = $('#addDesc').val();
    if (! isValid(dt, time, description)) {
        return;
    }
    //(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
    let dtStr = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();
    
    let datetime = dtStr + ' ' + time;
    
    

    $.ajax({url: './perl/add.pl', type: 'GET', contentType: 'application/json',
        data: {datetime, description},
        success: function (result) {
            console.log("added the appointment");
        }, error : function (err) {
            alert("Fill in the whole form");
        }
    })
}
/* Methods below are for searching */

function getAppointments() {
    searchApptsInternal(null);
}
/** Getting data from the server */
function searchApptsInternal (searchStr) {
    $.ajax({url: './perl/search.pl', type: 'GET', contentType: 'application/json',
        data: {search_for: searchStr},
        success: function (resp) {
            populateAppts(resp);
        }, error : function (err) {
            console.log("some error occured: " + err);
        }
    });
}
/**Populate Appointments */
function populateAppts (resp) {
    let tbl = '<tr><th>Date</th><th>Time</th><th>Description</th></tr>';
    for (let i=0; i <resp.length; i++) {
        let date = new Date(resp[i].apt_date);
        let day = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
        let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ;
        let des = resp[i].description;
        tbl+= `<tr><td>${day}</td><td>${time}</td><td>${des}</td></tr>`;
    }
    $('#apptsTable').html(tbl);
}
/** Search for Text */
function searchAppts () {
    let searchStr = $('#searchTxt').val();
    searchApptsInternal(searchStr);
}

/**Calling the getAppointments when the document is ready*/
$(document).ready(()=>{
    getAppointments();
});

/**Validating form */
function isValid(dt, time, desc){
    if (! dt) {
        alert("please enter right date");
        return false;
    }
    if (!time) {
        alert("please enter time");
        return false;
    }
    if (! desc) {
        alert ("please enter description0");
        return false;
    }
    return true;
}