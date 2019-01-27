   
   var domainLocation;
   
   if(location.hostname == 'localhost') {
      domainLocation = 'http://localhost:8000/api/';
   } else {
      //domainLocation = 'public/api/';
      domainLocation = 'https://'+location.hostname+'/public/api/';
      // domainLocation = 'new.gamestorm.org/public/api/';
   }
   
   console.log('host: '+location.hostname);
   console.log(domainLocation);
   
   export const apiDomain = domainLocation;
   