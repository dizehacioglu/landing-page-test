$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: 'http://localhost:8081/api/v1/leads/' + (window.location.href).split('token=')[1],
    dataType: 'json',
    success: function(result){
      if(result){
        $('input').each(function(i, input){
          if(result.body.formParams[input.name]){
            $('input[name="' + input.name + '"]').val(result.body.formParams[input.name]);
          }
        })
      }
    },
    error: function(err){
      console.log(err);
    }
  })

  $('form#lead').on('submit', function(e){
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: 'http://formservice-env.us-west-2.elasticbeanstalk.com/api/v1/leads',
      contentType: 'application/json',
      dataType: 'json',
      data: createJSONForService($(this)),
      success: function(result){
        console.log(result);
      },
      error: function(err){
        console.log(err);
      }
    })

  })
})

function createJSONForService(form){
  // create blueprint of parseable data
  var goodData = {
    formType: form[0].id,
    formParams: {},
    Referrer__c: ''
  };

  // grab values from the form just submitted
  var rawData = form.serializeArray();

  // go through each key-value pair from the form
  // adding them to the blueprint object
  rawData.forEach(function(obj){
    for(var key in obj){
      console.log(obj['name'], obj['value']);
      goodData['formParams'][obj['name']] = obj['value'];
    }
  })

  // return the stringified version of the blueprint data
  return JSON.stringify(goodData);

}
