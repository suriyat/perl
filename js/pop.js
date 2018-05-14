`use strict`
/**POPULATING FORM **/
$(document).ready(()=>{ 
       $('#add').hide()
       $('#new').click(()=>{
       $('#add').show();
       $('#new').hide();
    })
});

$(document).ready(()=>{
    $('#hide').click(()=>{
        $('#add').hide();
        $('#new').show()
    })
})
/** DATE PICKER**/
$(document).ready(()=>{
    $('#addPicker').datepicker({minDate: 0});
})

