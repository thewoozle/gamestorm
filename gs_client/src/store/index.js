
	import Vue from 'vue'
	import Vuex from 'vuex'
	import Axios from 'axios'
	import VueAxios from 'vue-axios'
   import moment from 'moment'
	import Router from 'vue-router'
		
	import {apiDomain} from '../config'
	
	import { siteContent } from './site_content'
   import { statesList, eventDuration, experienceLevels } from './lists'
   import { devNotes } from './dev_notes'
   import { testData } from './test_data'
	
	Vue.use(Router);
	Vue.use(Vuex);
	Vue.use(VueAxios, Axios);
   
   const newCart = {
      'amount' : 0,
      'transaction' : '',
      'items': [
     
      ]
   } 
   
   
      
      
	const state = {
		account        : {},
      adminPermissions: {},
      ageGroups      : {},  
      allEvents      : {},
		articles       : {},
      allArticles    : {},
		badgeTemplate	: null,
      checkEmail     : null,
		conEvents      : {},
      conLocations   : {},
      conLocations   : {},
		conventionInfo : {},
		conventions    : [],
		currentCon     : {},
		departments    : {},
      devNotes       : devNotes,
      eventDuration  : eventDuration,
      eventTracks    : {},
      eventTypes     : {},
      experienceLevels: experienceLevels,
		galleryData    : {},
      guestGmList    : [],
      linkCode       : null,
      linkedAccounts : {},
		liveEvents     : {},
      memberList     : {},
		members	      : [],
		memberTypes    : {},
      memberPercent  : 0,
		news           : {},
		pageContent    : {},
		pageStatus     : {},
		paymentMethods : {},
      partners       : null,
		regReport      : {},
      regReports     : {},
		regSettings    : {},
		response       : {},
      schedulingAreas: {},
      schedulingPermissions: {},
		showMenu       : false,
      shoppingCart   : newCart,
      siteContent    : siteContent, 
		siteSettings   : {},
		staffPositions : {},
      statesList     : statesList,
      storeItems     : {},
      timeblocks     : [],
		user           : {},
      userEvents     : null,
      userInfo       : {},
		venues         : {},
      
      testData       : testData,
	}
	
	const actions = {
		
		// GET SITE DATA
		get_site_data ({commit}) {
         
         if(window.sessionStorage.currentCon) {
					commit('set_current_con', {
                  info: JSON.parse(sessionStorage.currentCon)
               });
         }
         
				Axios.get(apiDomain+ '_get_site_data').then((response) => {
               if(response.data.convention.price_breaks) {
                  response.data.convention.price_breaks = JSON.parse(response.data.convention.price_breaks);
               }else {
                  response.data.convention.price_breaks = [];
               }
               
               if(window.sessionStorage) {
                  sessionStorage.currentCon = JSON.stringify(response.data.convention);
               }
               
					response.data.convention? commit('set_current_con', response.data.convention) : '';
               
               
					commit('set_site_data', {
						pageContent	: response.data.pageContent,
                  venues      : response.data.venues,                 
					});
               commit('set_news_articles', response.data.articles);
               commit('set_conventions', response.data.conventions);
			  }, (err) => {
				  console.log('error: '+err.statusText);
			  });
		},
      
      
      // GET NEWS ARTICLES 
      get_news_articles({commit}) {
         var vm = this;
         
         Axios.get(apiDomain+'_get_news_articles').then((response)=>{
            commit('set_news_articles', response.data.articles);
         }, (err) =>{
            console.log(err.data);
         });
      },
      get_all_articles({commit}) {
         var vm = this;
         
         Axios.get(apiDomain+'_get_all_articles').then((response)=>{
            commit('set_all_articles', response.data.articles);
         }, (err) =>{
            console.log(err.data);
         });
      },
      
      
      
      
      // GET ADMIN PERMISSIONS 
      get_admin_permissions({commit}) {
         var vm = this;
         
         Axios.get(apiDomain+'_get_admin_permissions' ).then((response) => {
            commit('set_admin_permissions', response.data.permissions);
         },(err) => {
            console.log(err.response.data.errors);
         });         
      },
      
      // UPDATE ADMIN PERMISSIONS 
      update_admin_permission({commit}, member) {
         var vm = this;
         Axios.post(apiDomain+'_update_admin_permission', member, {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
         }).then((response)=>{     
            commit('set_admin_permission',response.data.permission);
         },(err) => {
            
         });
      },
      remove_admin_permission({commit}, member) {
         var vm = this;
         Axios.post(apiDomain+'_remove_admin_permission', member, {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
         }).then((response)=>{            
         commit('set_admin_permissions', response.data.permissions);
         },(err) => {
            
         });
      },
      
      // UPDATE CURRENT CON 
      update_current_con({commit},con){
         var vm = this;
         return new Promise((resolve, reject) => {   
            Axios.post(apiDomain+'_update_current_con', {'con': con.tag_name}, {
               headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF8'}
            }).then((response) =>{
                  commit('set_conventions', response.data.conventions);
            }, (err) => {
               console.log(err);
            });
         });
      },
      
      
		
		// UPDATE CURRENTCON
		update_currentCon({commit}, {convention}) {
			commit('set_currentCon', {convention});
		},
      
      // SAVE/UPDATE CONVENTION 
      save_convention({commit}, convention) {
         var vm = this;
         Axios.post(apiDomain+'_save_convention', convention, {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
         }).then((response) => {                  
            commit('set_conventions', response.data.conventions);
         }, (err) => {
            console.log(err.response.data.errors);
            reject(err.response.data.errors );
         });
      },
		
		// SET PAGE STATUS
		update_page_status({commit}, pageStatus) {
			commit('set_page_status',{pageStatus});
		},
		
		
		// UPDATE USER (login, logout)
		update_user({commit}, user) {         
         if(user) {
            window.sessionStorage.user = JSON.stringify(user);
            commit('set_user', {user});
         } else {
            window.sessionStorage.user = '';
            commit('set_user');
         }
		},
      
      
      // UPDATE USER INFO
      create_update_user_info({commit}, userInfo) {
         return new Promise((resolve, reject) => {
            var   vm = this,
                  _formData = new FormData();
            for (var key in userInfo) {
               _formData.append(key, userInfo[key]);
            }      
            Axios.post(apiDomain+'_update_create_user', _formData, {headers : 
                  {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response) => {               
                  resolve(response.data);
                  commit('set_userInfo', userInfo);
                  
               }, (err) => {                  
                  console.log(err.response.data.errors);
                  reject(err.response.data.errors );
                  console.log(err.data);
            });
         });
         
      },
      
      
      // CHECK LOGIN EMAIL 
      check_login_email({commit}, email) {
         // find all users with matching email address
         var vm = this;
         return new Promise((resolve, reject) => {
            Axios.post(apiDomain+'_check_login_email', {email : email }, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; cjarset=UTF-8'}
            }).then((response) => {
               resolve(response.data);
            });   
         });
         
      },
      
      // SUBMIT LOGIN
      
      submit_login({commit}, loginInfo) {
         var vm = this;
         // simple validation, post info and return/reject response
         
         return new Promise((resolve, reject) =>{
               
            Axios.post(apiDomain+ '_login', loginInfo, {headers : 
               {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response) => {
               var _response = response.data.response;
               if (_response.user && _response.success =='pass') {
                  
                  commit('set_user', _response.user);
                  
                  if(window.sessionStorage) {  
                     sessionStorage.user = JSON.stringify(_response.user); 
                  
                  // start one-hour-and-two-minutes timer then log-out
                     setTimeout(function() {
                        console.log('LOG OUT timer expired');
                        
                        sessionStorage.user = '';
                        commit('set_user', {});
                        commit('set_user_events', '');
                     //},(10*1000));
                     }, (60*60*1000) *2);
                  }
                        
                  resolve(_response);
               }  else {
                  reject(_response);
               } 

         },(err) => {
            console.log(err);
            console.log(err.response.data.errors);
            reject(err.response.data.errors );
            });
         });         
      },
      
      // submit_login({commit}, loginInfo) {
            // var vm = this,
               // _formData = new FormData();
         
         // return new Promise((resolve, reject) =>{
               
            // for(var key in loginInfo) {
               // _formData.append(key, loginInfo[key]);
            // }
            
            // Axios.post(apiDomain+ '_login', _formData, {headers : 
               // {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            // }).then((response) => {
                   
               
               // resolve(response.data);         

            // },(err) => {
               // console.log(err);
               // console.log(err.response.data.errors);
               // reject(err.response.data.errors );
            // });
         // });         
      // },
      
      // RESET PASSWORD
      reset_password({commit}, email) {
         
         return new Promise((resolve, reject) =>{
            Axios.post(apiDomain+'_password_reset_request',  {email : email }, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response) => {
               resolve(response.data);
            }, (err) => {
               reject(err.response.data.errors);
            });
         });
      },
      
      // UPDATE PASSWORD
      update_password({commit}, userInfo) {
         Axios.post(apiDomain+'_update_password', {userInfo: userInfo}, {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded;  charset=UTF-8' }
         }).then((response) => {
            console.log(response);
         }, (err) => {
            console.log(err);
         });            
      },
      
      // GET PARTNERS 
      get_partners({commit}) {
         return new Promise ((resolve, reject) => { 
            if(!state.partners) {           
                  Axios.get(apiDomain+'_get_partners' 
                  ).then((response)=>{
                     let partners = response.data.partners;                  
                     commit('set_partners', partners);
                     resolve(partners);
                  },(err)=>{
                     console.log(err.data);
                  });
            } else {
               resolve(state.partners);
            }
         });
      },
      
      // GET USERS EVENTS 
      get_users_events({commit}, uuid) {
         Axios.post(apiDomain+'_get_users_events', {uuid: uuid}, {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded;  charset=UTF-8' }
         }).then((response) => {            
            commit('set_user_events', response.data.userEvents);
         }, (err) => {
            console.log(err);
         });
      },
      
      // VALIDATE RESET 
      validate_reset({commit}, reset_code) {
         console.log('validate reset code returns true');
         return true;
      },
      
      // CHECK USER (is logged in)
      check_user({commit}) {
         if(sessionStorage.user) {
            commit('set_user', JSON.parse(sessionStorage.user));
         }
      },
      
      
      // GET USER INFO
      get_user_info({commit}, data) {
         Axios.post(apiDomain + '_get_user_info', data, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response) => {	
            commit ('set_userInfo', response.data.userInfo);
            
         }, (err) => {
            if (err.response.data.errors) {
               errors.errors = err.response.data.errors;
               resolve(errors);
            }						
            console.log(err.statusText+' - ' + JSON.stringify(err.response.data.errors));
         });
      },
      
      setup_timeblocks({commit}, selectedCon) {
         commit('set_timeblocks', selectedCon);
         
      },
		
      
      /* ----------------------------------------------------------
                     GET STORE ITEMS
         ----------------------------------------------------------  */
      get_store_items({commit}) {
         var vm = this;
         Axios.get(apiDomain+'_get_store_items').then((response)=>{
            commit('set_store_items', response.data.storeItems);
         });
      },
      
      get_cart_account({commit}, uuid) {
         return new Promise ((resolve, reject) => { 
            Axios.post(apiDomain+'_get_cart_account', {'uuid' : uuid}, {
                  headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
               }).then((response)=>{
               resolve(response.data.user);
            });
         });
      },
      
      /* ----------------------------------------------------------
                     GET LINK CODE
         ----------------------------------------------------------  */
      get_link_code({commit}, uuid) {
         var linkCode;
         Axios.post(apiDomain+'_get_link_code', {'uuid' : uuid}, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response)=>{
            response.data.account? linkCode = response.data.account.link_code : linkCode = null;
            commit('set_link_code', linkCode);
         });
         
      }, 
        
      /* ----------------------------------------------------------
                     GET LINKED ACCOUNTS
         ----------------------------------------------------------  */
      get_linked_accounts({commit}, uuid) {
         var linkCode;
         Axios.post(apiDomain+'_get_linked_accounts', {'uuid' : uuid, 'sellectedCon': state.currentCon.tag_name }, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response)=>{  
            commit('set_linked_accounts', response.data.accounts);
         });
         
      },  
      
      
      /* ----------------------------------------------------------
                     ADD LINK CODE
         ----------------------------------------------------------  */
      add_link_code({commit}, data) {
         Axios.post(apiDomain+'_add_link_code', data, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response)=>{
            commit('set_link_code', response.data.account.link_code);
         });     
      },   
       
      // CREATE LINK CODE  
      /* ----------------------------------------------------------
                     CREATE LINK CODE
         ----------------------------------------------------------  */           
      create_link_code({commit}, uuid) {
         Axios.post(apiDomain+'_create_link_code', {'uuid' : uuid}, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response)=>{
            commit('set_link_code', response.data);
         });
         
      },
      
      // CLEAR LINK CODE 
      clear_link_code({commit}, uuid) {
         Axios.post(apiDomain+'_clear_link_code', {'uuid':uuid}, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response)=>{
            commit('set_link_code', null);
            });         
      },
      
      update_linked_account({commit}, item) {         
         //commit('set_linked_account', info.account);
         commit('set_shopping_cart_update', item);
      },
      
      
		/* -----------------------------------------------------------
                  CLEAR SUBMIT ERROR in cart 
         ----------------------------------------------------------- */
         clear_submit_error({commit}, data) {
            commit('clear_submit_error', data);
         },
         
         
         
      
		/* -----------------------------------------------------------
                  GALLERY DATA 
         ----------------------------------------------------------- */
		get_gallery_data({commit}, selectedCon) {
         var   gallery  = [],
               category = [],
               conNum   = null;
         
         Axios.get(apiDomain+'_get_gallery_data').then((response)=>{
            
            Object.entries(response.data.galleryData).forEach((item)=> {  
            
               if(item[1].con_num != conNum) {
                  
                  conNum? gallery.push(category) : '';
                  
                  category = {
                     title   : item[1].convention+' '+item[1].con_num,
                     items   : [item[1]],
                  };                  
                  conNum = item[1].con_num;                  
               } else {
                  category.items.push(item[1]);
               }
            });
            
            gallery.push(category);
            
            commit('set_gallery_data', gallery);
         });
         
      },
      
      
		
		/*-----------------------------------------------------------
                  REGISTRATION DATA 
      ----------------------------------------------------------- */
		
		// GET REG DATA	
		get_reg_data({commit}, selectedCon) {
			Axios.get(apiDomain + '_get_reg_data').then((response) => {		
				commit('set_reg_data', {
					memberTypes		: response.data.memberTypes,
					departments		: response.data.departments,
					paymentMethods	: response.data.paymentMethods,
					staffPositions	: response.data.staffPositions,
				});
			}, (err) => {
				  console.log(err.statusText);
			})
		},
		 
		// SUBMIT MEMBER for registration
		submit_member({dispatch,commit}, memberData) {
			var errors = {errors: []};
			return new Promise((resolve, reject) => {
            
				Axios.post(apiDomain+'_submit_member', memberData, {headers : 
            {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).then((response) => {		
            
					commit ('set_member', {updatedMember: response.data.response.member.member});               
               dispatch('get_reg_report');
					resolve(response.data.response);
               if(window.sessionStorage) {
                  sessionStorage.memberList = JSON.stringify(state.members);
               } 
               
				}, (err) => {
					if (err.response.data.errors) {
                  console.log(err.response.data);
						resolve(err.response.data);
					}						
					console.log(err.statusText+' - ' + JSON.stringify(err.response.data.errors));
				});
            
			});	         
		},
		
		// GET REG SETTINGS	
		get_reg_settings({commit}) {
			Axios.get(apiDomain + '_get_reg_settings').then((response) => {
				commit('set_reg_settings', response.data.regSettings );
			}, (err) => {
				  console.log(err.statusText);
			});			
		},
      
      
      // UPDATE REG SETTINGS 
      update_reg_settings({commit}, setting) {
         commit('set_reg_setting', setting );
      },
		
      
      get_members({commit,dispatch}, selectedCon)  {
         var   vm = this,
               selectedCon = selectedCon;
         selectedCon? '': selectedCon = state.currentCon.tag_name;  
         Vue.set(state, 'memberPercent', 0);       
         commit('set_members_from_localstorage');
         dispatch('get_member_list', selectedCon);         
      },
      
      get_member_list({commit,dispatch}, selectedCon) {
         var vm = this;
            Axios.get(apiDomain + '_get_members', {params: {'selectedCon' : selectedCon, 'percent' : state.memberPercent}}).then((response) => {    
               let percent =response.data.percent;
               commit('set_members', { members: response.data.members, percent: percent });

         
                  if(percent < 100) {
                     dispatch('get_member_list', selectedCon);
                  } 
                  
            }, (err) => {
               console.log(err.statusText);
            }); 
      },
      
      

      
      
      
      // GET BADGE TEMPLATE
      get_badge_template({commit}) {
         var vm = this;
         Axios.get(apiDomain+'_get_badge_template').then((response) => {
            var template = response.data.template.trim(' ');
            commit('set_badge_template', template);
         }, (err) => {
            console.log(err);
         });
         
         
      },
            
           
      
      // GET MEMBER INFO
      get_member_info({commit}, data) {    
         return new Promise((resolve, reject) => {   
            Axios.post(apiDomain+'_get_member_info', {'uuid': data.uuid, 'selectedCon' : data.selectedCon}, {headers : 
            {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).then((response) => {
               resolve(response.data);               
            }, (err) => {
               console.log(err);               
            });
         });
      },
		
		// REMOVE MEMBER
		remove_member({dispatch,commit}, uuid) {	
			
            var vm = this,
               formData = {
               uuid	: uuid,
            }	
			Axios.post(apiDomain + '_remove_member', formData, {headers : 
            {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).then((response) => {		
               dispatch('get_reg_report');
               commit('unset_member', {uuid});
               commit ('set_response', response.data.response);
               console.log(response.data.response.message);
			}, (err) => {
				  console.log(err.statusText);
			});
         
		},
		
		// GET REGISTRATION REPORT
		get_reg_report({commit}, selectedCon) {
         selectedCon? '' : selectedCon = state.currentCon.tag_name;
			Axios.post(apiDomain+'_get_reg_report', {'selectedCon': selectedCon}, {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
         }).then((response) => {
				commit('set_reg_report',{ regReport: response.data.regReport });   
            commit('set_reg_reports', {regReports: response.data});
			},(err) => {
				console.log(err.statusText);
			});
		},
      
      
		/*-----------------------------------------------------------
                  SEND GUEST GM INVITES
      ----------------------------------------------------------- */
      send_guest_gm_invites({commit}, gmList) {
         Axios.post(apiDomain+'_guest_gm_emails').then((response) => {            
         });
      },
      
      
      
		
		/* -----------------------------------------------------------
                     SHOPPING CART DATA 
         ----------------------------------------------------------- */
         
         update_shopping_cart({commit}, item) {
            var vm = this;
            if(!item.uuid) {item.uuid = '';} 
            commit('set_shopping_cart_update', item);
         },
         
         
         // UPDATE ORDER CODE OF CONDUCT
         update_order_coc({commit}, acknowledgement) {
            console.log(acknowledgement);
         },
         
         
         submit_shopping_cart({commit}) {
            var   vm = this,
                  cartSuccess = true;
            return new Promise((resolve, reject)=>{
               // validate cart information and return 
               if(state.shoppingCart.items) {
                  
                  Object.entries(state.shoppingCart.items).forEach((item) => {
                     var success = true;
                  //each item, validate account, category, age, 
                  // if pass, set 'pass' otherwise, set 'fail'
                     if(!item[1].account.last_name ||!item[1].account.email ) {
                        success = false;
                        item[1].submitErrors.account = 'Please select an account or fill-out the member information form';
                     } else {
                        delete item[1].submitErrors.account;
                     }
                     
                     item[1].account.first_name.length >=2? delete item[1].submitErrors.first_name : item[1].submitErrors.first_name = 'first name required';
                     item[1].account.last_name.length >=2? delete item[1].submitErrors.last_name : item[1].submitErrors.last_name = 'last name required';
                     item[1].account.email.indexOf("@") >0 && item[1].account.email.indexOf(".") >0 ? delete item[1].submitErrors.email : item[1].submitErrors.email = 'email address required';
                     item[1].account.address.length >=2? delete item[1].submitErrors.address : item[1].submitErrors.address = 'address required';
                     item[1].account.state.length >=2? delete item[1].submitErrors.state : item[1].submitErrors.state = 'state required';
                     item[1].account.city.length >=2? delete item[1].submitErrors.city : item[1].submitErrors.city = 'city required';
                     item[1].account.zip.length >=2? delete item[1].submitErrors.zip : item[1].submitErrors.zip = 'postal code required';
                     
                     
                     if(!success) { 
                        cartSuccess = false;
                        
                        commit('set_shopping_cart_update', item[1]);
                     }
                  });
                  
                  
                  // if everything is good, resolve 'success' and proceed to checkout
                  if(cartSuccess) {
                     resolve('success');                  
                  
                  } else {
                     // if cartSucess == false, show errors
                    reject('fail');
                  }
                  
               } else {
                  // if cartSucess == false, show errors
                 reject('fail');
               }
               
            });
            
            
            
            
            
            
            // Axios.post(apiDomain+'_submit_checkout', {cart: state.shoppingCart}, { 
               // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset-UTF-8'}
            // }).then((response)=> {
                  // console.log(response.data);
            // }, (err) =>{
                  // console.log(err.statusText);
            // });
         },
         
         
      
      
		
		/* -----------------------------------------------------------
                     SCHEDULING DATA 
         ----------------------------------------------------------- */
		// get scheduling data (con locations, con events, con signups, events)
   
		get_scheduling_data({commit}, selectedCon) {         
			var vm = this,
            _formData = new FormData(),
            schedulingData = {};
            
         _formData.append('con', selectedCon);
         
         if(localStorage) {
            if(localStorage.schedulingData) {
               schedulingData = JSON.parse(localStorage.schedulingData);
               commit('set_scheduling_data', {
                  venues         : schedulingData.venues, 
                  conLocations   : schedulingData.conLocations, 
                  allEvents      : schedulingData.allEvents,
                  eventTypes     : schedulingData.eventTypes,
                  eventTracks    : schedulingData.eventTracks,
                  ageGroups      : schedulingData.ageGroups,
                  memberList     : schedulingData.memberList,
                  permissions    : schedulingData.permissions,
                  areas          : schedulingData.areas,
               });
            }            
         }
      
			Axios.post(apiDomain+'_get_scheduling_data', _formData).then((response) => {
            if(localStorage) {
               localStorage.setItem('schedulingData', JSON.stringify(response.data));  
            }
				commit('set_scheduling_data', {
               conEvents      : response.data.conEvents, 
               venues         : response.data.venues, 
               conLocations   : response.data.conLocations, 
               allEvents      : response.data.allEvents,
               eventTypes     : response.data.eventTypes,
               eventTracks    : response.data.eventTracks,
               ageGroups      : response.data.ageGroups,
               memberList     : response.data.memberList,
               permissions    : response.data.permissions,
               areas          : response.data.areas
            });
			},(err) => {
				console.log(err.statusText);
			});
		},
      
      // CHECK EMAIL
      check_email({commit}, emailData) { 
         if(emailData.indexOf('@') >-1) {
            return new Promise((resolve,reject) => { 
               Axios.get(apiDomain+'_check_email', {params: {email : emailData.email}}).then((response) => {   
console.log(response.data);      
                  commit('set_check_email', {orderNumber: emailData.orderNumber, users:response.data.users});
                  resolve(response);
               });
            });
         }
      },
      
      
      
      update_schedulers({commit}, scheduler) {         
         var vm = this,
            _formData = new FormData();
         Object.entries(scheduler).forEach((item)=>{
            _formData.append(item[0], item[1]);	
         });
         
         Axios.post(apiDomain+'_update_schedulers', _formData).then((response) => {
            commit('set_schedulers', response.data.permissions);
         });
      },
      
      update_convention({commit}, convention) {
         
         var vm = this,
            newConvention,
            _formData = new FormData();
            
         Object.entries(convention).forEach((item)=>{
            _formData.append(item[0], item[1]);	
         });
         
         
         Axios.post(apiDomain+'_update_convention', _formData).then((response)=>{
            console.log(response.data);
         });
      },
      
      
      // GET SCHEDULING PERMISSIONS 
      get_scheduling_permissions({commit}) {
         var vm = this;
         
         Axios.get(apiDomain+'_get_scheduling_permissions').then((response) => {
            commit('set_scheduling_permissions', response.data.permissions);
         });
         
      },
      
      // GET CON LOCATIONS
      get_con_locations({commit}, selectedCon) {        
			var   vm = this,
               conLocations,
               _formData = new FormData();
               _formData.append('con', selectedCon);	
            
         if(localStorage) {      
            if(localStorage.conLocations) {
               commit('set_con_locations', JSON.parse(localStorage.conLocations)); 
            }   
         }
            
         Axios.post(apiDomain+'_get_con_locations', _formData).then((response) => {
            if(localStorage) {      
               localStorage.setItem('conLocations', JSON.stringify(response.data.locations));
            }
            commit('set_con_locations', response.data.locations);   
            
         });
         
      },
      
      // UPDATE EVENT STATUS
      update_event_status({commit}, event) {
         var vm = this;
         
         Axios.post(apiDomain+'_update_event_status', event.event, {headers : 
            {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
         ).then((response) => {
            vm.dispatch('get_con_events', event.selected_con);
         });
         
         
        console.log(event); 
      },
      
      // REMOVE PRESENTER
      remove_presenter({commit}, conData) {        
			var vm = this;
         Axios.get(apiDomain+'_remove_presenter', {params: conData}, {headers : 
         {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).then((response) => {
         });
      },
      
      
      // GET EVENTS
		get_con_events({commit}, selectedCon) {
         var vm = this,
            _formData = new FormData();
			_formData.append('con', selectedCon);
         
         // check localStorage and set_con_events
         if(localStorage) {
            if(localStorage.conEvent) {               
               commit('set_con_events', {
                  conEvents : JSON.parse(localStorage.conEvents),
               });
            }
         }             
         
         Axios.post(apiDomain+'_get_con_events', _formData).then((response) => {
         //Axios.post('https://new.gamestorm.org/public/api/_get_con_events', _formData).then((response) => {
            if(localStorage) {
               localStorage.setItem('conEvents', JSON.stringify(response.data.events));
            }   
            
            commit('set_con_events', response.data.events);
         },(err) => {
            console.log(err.statusText);
         });
		},
      
      
      
      // SUBMIT EVENT 
      submit_event({commit}, event) {
         var vm = this;
            
         return new Promise((resolve, reject) => {            
            Axios.post(apiDomain+'_submit_event', event, {headers : 
            {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).then((response) => {
               // if(response.data.errors) {
                  // reject(response.data.errors);                  
               // } else {
                  commit('set_con_event', response.data.event);
                  resolve(response.data.message);            
               //}
            }, (err) => {
               // console.log(err);
               // reject(err.response.data.errors);
            });
         });
         
         
         
      // ADD PRESENTER TO SIGNUPS
      // add_presenter({commit}, eventInfo) {
         // return new Promise((resolve, reject) => { 
            // Axios.get(apiDomain+'_add_presenter', {params: eventInfo}).then((response) => {
               // console.log(response.data);
            // }, (err) =>{
               // console.log(err.statusText);
            // });
         // });
      // },
      
      
      
      
         
      },
      
      // COPY CON LOCATIONS (copy work done on server)
      copy_con_locations({commit}, conData) {
         Axios.get(apiDomain+'_copy_con_locations', {params: conData}).then((response)=>{
            commit('set_con_locations', response.data.locations);            
         });
      },
      
      update_location({commit}, location) {
         console.log('LOCATION: '+location.length);
         if(location) {
            var   vm = this,
                  _formData = new FormData();
             
            Object.entries(location).forEach((item)=>{
               _formData.append(item[0], item[1]);	
            });
            
            Axios.post(apiDomain+'_update_location', _formData).then((response)=>{
               
               //commit('set_location', location);          
            }, (err) => {
                 console.log('error: '+err.statusText);
            }); 
         }
      },
      
      
      // GET EVENT SIGNUPS
      get_event_signups({commit}, selectedCon) {
         return new Promise((resolve, reject) =>{
            Axios.get(apiDomain+'_get_event_signups', {params: {con : selectedCon}}).then((response) => {
               
            }, (err) => {
               console.log(err.statusText);
            });
         });         
      },  
	}
	
	const mutations = {
      
      set_current_con: (state, info) => {
			state.conventionInfo= info;
			state.currentCon = info;
      },
      
   
      // SET CONVENTIONS 
      set_conventions:(state, conventions) => {
         state.conventions	= conventions;
         Object.entries(conventions).forEach(([key, convention]) => {
            convention.price_breaks = JSON.parse(convention.price_breaks);
            if(convention.current_con == 1) {
               state.currentCon = convention;
               state.conventionInfo = convention;
               if(sessionStorage) {
                  sessionStorage.currentCon = JSON.stringify(convention);
               }
            }
         });
      },
      
		// SET SITE DATA
		set_site_data: (state, {pageContent, venues, articles}) => {			
         state.venues         = venues;			
			pageContent.forEach(function(item) {
				state.pageContent[item.content_name] = item;
			});
		},
      
      // SET NEWS ARTICLES 
      set_news_articles: (state, articles) => {
         state.articles = articles;
      },
      set_all_articles: (state, articles) => {
         // creates the 'show' atribute for accordions
         Object.entries(articles).forEach(([key, value]) => {
            value.show = false;
         });
         state.allArticles = articles;
      },
      
      //SET ADMIN PERMISSIONS       
      set_admin_permissions: (state, permissions) => {
         var   vm                = this;    
         state.adminPermissions = permissions;
      },    
      set_admin_permission: (state, permission) => {         
         var   vm                = this,
               found             = false; 
               
         Object.entries(state.adminPermissions).forEach(([key, user])=>{
            if (permission.uuid == user.uuid) {
               state.adminPermissions[key] = permission;
               found = true;
            }
         });
         found? '' : state.adminPermissions.push(permission);
      },
		
		// SET GALLERY DATA 
      set_gallery_data: (state, galleryData) => {
         state.galleryData = galleryData;
      },
      
		// SET PAGE STATUS
		set_page_status: (state, {pageStatus}) => {
			pageStatus.pageReady? state.pageStatus.pageReady = pageStatus.pageReady : '';
			pageStatus.showMenu	? state.pageStatus.showMenu = pageStatus.showMenu : '';
			pageStatus.slideOut	? state.pageStatus.showSlideout = pageStatus.slideOut : '';
			pageStatus.fixFooter? state.pageStatus.fixFooter = pageStatus.fixFooter : '';
		},
		
		// SET RESPONSE	
		set_response: (state, response) => {
			state.response = response;
		},
		
		// SET CURRENT CON
		set_currentCon: (state, {convention}) => {
			state.currentCon = convention;
		},
		
      // SET CON (NEW) EVENT
      set_con_event: (state, conEvent) => {
         // add or update event in conEvents
         console.log(conEvent);
      }, 
      
		//SET CON EVENTS
		set_con_events: (state, conEvents) =>{
         //console.log(conEvents);         
			Vue.set(state, 'conEvents', conEvents);
		},
            
            
		//	 SCHEDULING DATA (for scheduling)
		set_scheduling_data: (state, {venues, conLocations, allEvents, eventTypes, eventTracks, ageGroups, memberList, permissions, areas}) => {
			Vue.set(state, 'venues', venues);
        // Vue.set(state, 'conLocations', conLocations);
         Vue.set(state, 'allEvents', allEvents);
         Vue.set(state, 'eventTracks', eventTracks);
         Vue.set(state, 'eventTypes', eventTypes);
         Vue.set(state, 'ageGroups', ageGroups);
         Vue.set(state, 'memberList', memberList);
         Vue.set(state, 'schedulingPermissions', permissions);
         Vue.set(state, 'schedulingAreas', areas);
		},		
		
		// SET USER 
		set_user: (state,user) => {
         if(user) {
            Vue.set(state, 'user', user);
         } else {
            Vue.set(state, 'user', {});
         }
		},
      
      // SET LINK CODE 
      set_link_code: (state, code) => {
         Vue.set(state,'linkCode', code);
      },
      // SET LINKED ACCOUNT 
      set_linked_account: (state, account) => {   
         Object.entries(state.linkedAccounts).forEach((entry) => {
            if(entry[1].uuid == account.uuid) {  
               if(account.purchase) {
                   entry[1].purchase = false;
               } else {
                  entry[1].purchase = true;
               }
            }             
         });
      },
      
      // SET LINKED ACCOUNTS 
      set_linked_accounts: (state, accounts) =>{
         Vue.set(state, 'linkedAccounts', accounts);         
      },
      //SET USER INFO   
      set_userInfo: (state, userInfo) => {
         userInfo? Vue.set(state, 'userInfo', userInfo) : Vue.set(state, 'userInfo', {});
      },
      
     
     set_members_from_localstorage() {        
          if(window.sessionStorage) {  
               if(window.sessionStorage.memberList) {
                  state.members =  JSON.parse(sessionStorage.memberList);
               } 
            } 
     },
		
		// SET MEMBERS (chunks of 20%)
		set_members: (state, { members, percent}) => {
         let   vm       = this,
               _members = state.members;  
         if (percent <= 20) {
            // first pass, set members = session storage and clear session storage and store variable           
            //Vue.set(state, 'memberPercent',  []);
            _members = members;         
         }  else {  
               for( let i = 0; i < members.length; i++)  {
                  var   found = false,
                        member = members[i];
                  for(let f = 0; f < _members.length; f++) {
                     let _member = _members[f];
                     if(_members[f].uuid == member.uuid) {
                        found = true;
                     } 
                  }
                  found? '' : _members.push(member);
               }
         
         }
         
         if(state.memberPercent >= 100) {
            if(window.sessionStorage) {  
               sessionStorage.memberList = JSON.stringify(state.members); 
            }
         }
         Vue.set(state, 'members', _members);
         Vue.set(state, 'memberPercent', percent);
         
		},
      
      
      // CHECK SET EMAILS
      set_check_email(state, emailData) {
         var   vm = this;
         let   items = state.shoppingCart.items;
          
         Object.entries(items).forEach((item) => {
            if(item[1].item_order_number == emailData.orderNumber) {
               if(emailData.users[0]) {
                  Object.entries(emailData.users).forEach((user) => {
                     user[1].last_initial = user[1].last_name.substring(0,1).toUpperCase();
               

                     item[1].checkedEmail = emailData.users;
                     item[1].submitErrors.email = '1';
                  });
               } else {
                  item[1].checkedEmail = null;
                  delete item[1].submitErrors.email;
               }
            }
         });
         
         Vue.set(state.shoppingCart, 'items', items);
      },
		
		
		// REMOVE MEMBER
		unset_member(state, uuid) {
			var member = state.members.find(member => member.uuid === uuid.uuid);
			var memberIndex = state.members.findIndex(member => member.uuid === uuid.uuid);
			state.members.splice(memberIndex,1);         
			member.con_status				= null;
			member.con_department 		= null;
			member.con_position 			= null;
			member.badge_number 			= null;
			member.membership_description	= null;
		},
		
		// SET REG REPORT
		set_reg_report: (state, { regReport }) => {
			state.regReport = regReport;
		},
      
      // SET OTHER REG REPORTS
      set_reg_reports: (state,  {regReports}) => {
         state.regReports = regReports
      },
		
      // SET BADGE TEMPLATE 
      set_badge_template: (state, template) => {
         Vue.set(state,'badgeTemplate', template);
      },
		
		// SET MEMBER 
		set_member: (state, {updatedMember}) => {
         var inMembers = false;
        
         state.members.forEach((member, i)=> {
            if (member.uuid == updatedMember.uuid) {
               console.log('update');
               inMembers = true;
               member = updatedMember;
               Vue.set(state.members[i], 'badge_number', updatedMember.badge_number);               
            }
         });
         
         inMembers? '' : state.members.push(updatedMember);  
         if(window.sessionStorage) {  
               sessionStorage.memberList = JSON.stringify(state.members); 
         }
		},
      
		set_partners:(state, partners) => {
         Vue.set(state, 'partners', partners);
      },
		// 	set reg settings	
		set_reg_settings: (state,  regSettings ) => {
			state.regSettings = regSettings;
		},
      
		// 	set reg setting (update)	
		set_reg_setting: (state,  setting ) => {
         //console.log(setting); 
         var vm = this;         
         // update regSettings for setting
         
         Object.entries(setting).forEach(([_setting, item])=>{         
            Object.entries(state.regSettings).forEach(([key, value])=>{
               _setting == key? state.regSettings[key] = item : '';
            });
         });
                  
			Axios.post(apiDomain + '_update_reg_settings', state.regSettings, {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).then((response) => {
			}, (err) => {
				  console.log(err.statusText);
			});	


            // Axios.post(apiDomain+'_password_reset_request',  {email : email }, {
               // headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            // }).then((response) => {
               
         
			//state.regSettings = regSettings;
		},
		
		// SET REG DATA
		set_reg_data: (state, { memberTypes, departments, paymentMethods, staffPositions }) => {
			state.memberTypes 	= memberTypes;
			state.departments	= departments;
			state.paymentMethods= paymentMethods;
			state.staffPositions= staffPositions;
		},
      
     
      // SET CON LOCATIONS 
      set_con_locations: (state, conLocations) => {
         state.conLocations = conLocations;
      },
      
      // SET SCHEDULERS
      set_schedulers: (state, permissions) => {
        Vue.set(state, 'schedulingPermissions', permissions);
      },
      
      // SET USER  EVENTS 
      set_user_events: (state, userEvents) => {
         Vue.set(state, 'userEvents', userEvents);
      },
      
      
      /* -------------------------------------------------------
               SET STORE ITEMS
         -------------------------------------------------------  */         
      set_store_items: (state, items)=> {
         Vue.set(state, 'storeItems', items);         
      }, 


      /* -------------------------------------------------------
               CLEAR SUBMIT ERROR
         -------------------------------------------------------  */
      clear_submit_error: (state, data) => {         
         Object.entries(state.shoppingCart.items).forEach((item) => {
            if(item[1].item_order_number == data.item_order_number) {
               delete item[1].submitErrors[data.field];
            }
         });         
      },
      
      
      
      /* -------------------------------------------------------
               SET SHOPPING CART UPDATE
         -------------------------------------------------------  */
      set_shopping_cart_update: (state, item) => {
         // check to see if existing item or new item and update cart accordingly
         let   cartAmount = 0,
               removeIndex = null;
               
         if(item.purchase == false) {
            // REMOVE
            if(state.shoppingCart.items) {
               Object.entries(state.shoppingCart.items).forEach((cartItem)=>{               
                  if(cartItem[1].item_order_number== item.item_order_number) {
                     removeIndex = cartItem[0]
                  }
               });
               
               delete state.shoppingCart.items[removeIndex]
               state.shoppingCart.items = state.shoppingCart.items.filter(v => v);
               state.shoppingCart.items.length <=0? delete state.shoppingCart.items : '';
            
            }
            
         } else if (item.item_order_number ) { 
            // UPDATE
            Object.entries(state.shoppingCart.items).forEach((cartItem)=>{
               if(cartItem[1].item_order_number== item.item_order_number) {                  
                  cartItem[1] = item;
               }
            });
            
            
         } else {
            //create
            var hasCartItem = false;
            if(!state.shoppingCart.items) { state.shoppingCart.items = []; }
            
            Object.entries(state.shoppingCart.items).forEach((cartItem)=>{
               if(item.account.uuid&& cartItem[1].account.uuid == item.account.uuid) {hasCartItem = true;}
            }); 
                 
         
            if(!hasCartItem) {
               let   randChars = 'ABCDEFGHJKMNPQRSTUVWXYZ0123456789_.&%-',
                     randString = '',
                     cartItem = item;
               
               for(var i = 0; i<= 5; i++) {
                  randString += randChars.charAt(Math.floor(Math.random() * randChars.length));               
               }
               cartItem.item_order_number = state.currentCon.tag_name+'-'+ randString;
               cartItem.submitErrors = {};
               
               state.shoppingCart.items.push(cartItem);
            }  
         }
         
         
         
         
         
         // RECALC CART AMOUNT
         if(state.shoppingCart.items) {            
            Object.entries(state.shoppingCart.items).forEach((cartItem) =>{
               cartAmount = parseInt(cartAmount) + cartItem[1].item.price;            
            });
            
         } else {
            state.shoppingCart.items = [];
         }
         state.shoppingCart.amount = cartAmount;
         
         // clean-up empty items
         state.shoppingCart.items = state.shoppingCart.items.filter(v => v);
         state.shoppingCart.items.length <=0? delete state.shoppingCart.items : '';
         
      },
	}
	
   
   
   
   
	const getters = {
		conventions		: state => state.conventions,
		articles 		: state => state.articles,
		conventionInfo	: state => state.conventionInfo,
		statesList 		: state => state.statesList,
		pageContent		: state => state.pageContent,
		siteContent		: state => state.siteContent,
		currentCon		: state => state.currentCon,
		user			   : state => state.user,
      userInfo       : state => state.userInfo,
      partners       : state => state.partners,
      adminPermissions:state => state.adminPermissions,
		
		// reg getters
		regReport 		: state => state.regReport,
		members			: state => state.members,
		memberTypes		: state => state.memberTypes,
      memberInfo     : state => state.memberInfo,
		regSettings		: state => state.regSettings,
		departments		: state => state.departments,
		paymentMethods : state => state.paymentMethods,
		staffPositions	: state => state.staffPositions,
      linkedAccounts : state => state.linkedAccounts,
		
		// EVENTS getters 
		allEvents		: state => state.allEvents,
		conEvents 		: state => state.conEvents,
		venues			: state => state.venues,
      eventTypes     : state => state.eventTypes,
      eventTracks    : state => state.eventTracks,
      ageGroups      : state => state.ageGroups,
      conLocations   : state => state.conLocations,		
      timeblocks     : state => state.timeblocks,
      memberList     : state => state.memberList,
      schedulingPermissions: state => state.schedulingPermissions,
      conLocations   : state => state.conLocations,
      userEvents     : state => state.userEvents,
      memberPercent  : state => state.memberPercent,
      
      // ADMIN GETTERS
      allArticles    : state=> state.allArticles,
      
      shoppingCart   : state=> state.shoppingCart,
	}
	
	export default new Vuex.Store ({
		state,
		getters,
		actions,
		mutations
	})