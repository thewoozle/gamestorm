   
   var domainLocation;
   
   if(location.hostname == 'localhost') {
      domainLocation = 'http://localhost:8000/api/';
   } else {
      domainLocation = '/public/api/';      
     //domainLocation = '';
   }
   
   console.log('host: '+location.hostname);
   
   export const apiDomain = domainLocation;
   