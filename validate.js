'use strict'

function email(input){
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(input)
};

function zip(input){
return /^\d{5}(-\d{4})?$/.test(input);
};

function currency(input){
 return /^(?=\(.*\)|[^()]*$)\(?\d{1,3}(,?\d{3})?(\.\d\d?)?\)?$/.test(input)
};

export { email, zip, currency }
