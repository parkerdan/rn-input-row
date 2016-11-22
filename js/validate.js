'use strict'

export const validateEmail = (input) => {
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(input)
};

export const validateZip = (input) => {
return /^\d{5}(-\d{4})?$/.test(input);
};

export const validateCurrency = (input, allowBlank) => {
 if (input === '' && allowBlank) {
   return true
 } else {
   return /^(?=\(.*\)|[^()]*$)\(?\d{1,3}(,?\d{3})?(\.\d\d?)?\)?$/.test(input)
 }
};
