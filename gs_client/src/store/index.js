
	import Vue from 'vue'
	import Vuex from 'vuex'
	import Axios from 'axios'
	import VueAxios from 'vue-axios'
   import moment from 'moment'
	import Router from 'vue-router'
		
	import {apiDomain} from '../config'
	
	import { siteContent } from './site_content'
   import {statesList, eventDuration, experienceLevels } from './lists'
   import { devNotes } from './dev_notes'
	
	Vue.use(Router);
	Vue.use(Vuex);
	Vue.use(VueAxios, Axios);
	
	const state = {
		siteContent    : siteContent, 
		statesList     : statesList,
      devNotes       : devNotes,
      eventDuration  : eventDuration,
      experienceLevels: experienceLevels,
		showMenu       : false,
		siteSettings   : {},
		currentCon     : {},
		response       : {},
		conEvents      : {},
      allEvents      : {},
		conventionInfo : {},
		conventions    : [],
		liveEvents     : {},
		pageContent    : {},
		account        : {},
		gallery        : {},
		news           : {},
		pageStatus     : {},
		user           : {},
      userInfo       : {},
		regSettings    : {},
		memberTypes    : {},
      checkEmail     : null,
		departments    : {},
		paymentMethods : {},
		members	      : [],
		regReport      : {},
      regReports     : {},
		articles       : {},
		staffPositions : {},
		venues         : {},
      conLocations   : {},
      schedulingPermissions: {},
      schedulingAreas: {},
      eventTracks    : {},
      eventTypes     : {},
      ageGroups      : {},  
      conLocations   : {},
      memberList     : {},
		badgeTemplate		: null,
      timeblocks     : [],
      userEvents     : null,
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
               
               if(window.sessionStorage) {
                  sessionStorage.currentCon = JSON.stringify(response.data.convention);
               }
               
					commit('set_current_con', response.data.convention);
               
               
					commit('set_site_data', {
						pageContent	: response.data.pageContent,
						conventions	: response.data.conventions, 
						articles 	: response.data.articles,
					});
               console.log(response.data);
			  }, (err) => {
				  console.log('error: '+err.statusText);
			  });
		},
      
		
		
		
		// UPDATE CURRENTCON
		update_currentCon({commit}, {convention}) {
			commit('set_currentCon', {convention});
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
         console.log(userInfo);
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
      
      // SUBMIT LOGIN
      submit_login({commit}, loginInfo) {
            var vm = this,
               _formData = new FormData();
         
         return new Promise((resolve, reject) =>{
               
            for(var key in loginInfo) {
               _formData.append(key, loginInfo[key]);
            }
            
            Axios.post(apiDomain+ '_login', _formData, {headers : 
               {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response) => {
                   
               if (response.data.user) {
                        var user = response.data.user,
                            uuid = response.data.user.uuid;
                        
                        commit('set_user', user);
                        if(window.sessionStorage) {  
                           sessionStorage.user = JSON.stringify(user); 
                        
                        // start one-hour-and-two-minutes timer then log-out                        
                           setTimeout(function() {
                              console.log('LOG OUT timer expired');
                              
                              sessionStorage.user = '';
                              commit('set_user', {});
                              commit('set_user_events', '');
                           //},(10*1000));
                           }, (60*60*1000) *2);
                        }
                        
               }
               
               resolve(response.data);         

            },(err) => {
               console.log(err);
               console.log(err.response.data.errors);
               reject(err.response.data.errors );
            });
         });         
      },
      
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
      get_user_info({commit}, uuid) {
         console.log(uuid);
         Axios.post(apiDomain + '_get_user_info', {'uuid': uuid}, {
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
		
      
		
		/*-----------------------------------------------------------
                  REGISTRATION DATA 
      ----------------------------------------------------------- */
		
		// GET REG DATA	
		get_reg_data({commit}) {
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
		submit_member({dispatch,commit}, member) {
			var errors = {errors: []};
			return new Promise((resolve, reject) => {
            
            var formData = new FormData();
            for (var key in member) {
               formData.append(key, member[key]);               
            }
            
            
				Axios.post(apiDomain+'_submit_member', formData, {headers : 
            {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}).then((response) => {		
            
					commit ('set_member', {updatedMember: response.data.response.member.member});
               dispatch('get_reg_report');
					resolve(response.data.response);
               if(window.sessionStorage) {
                  sessionStorage.memberList = JSON.stringify(state.members);
               } 
               
				}, (err) => {
					if (err.response.data.errors) {
						errors.errors = err.response.data.errors;
						resolve(errors);
					}						
					console.log(err.statusText+' - ' + JSON.stringify(err.response.data.errors));
				});
            
			});	         
		},
		
		// GET REG SETTINGS	
		get_reg_settings({commit}) {
			Axios.get(apiDomain + '_get_reg_settings').then((response) => {
				commit('set_reg_settings', {regSettings: response.data.regSettings} );
			}, (err) => {
				  console.log(err.statusText);
			  });			
		},
		
		// GET MEMBERS
		get_members({commit}) {
         if (window.sessionStorage) {
            if(sessionStorage.memberList) {
               commit('set_members', { members: JSON.parse(sessionStorage.memberList), action: 'localstorage' });
            }          
         }
         // ten-step request for 20% of records at a time 
         for(var x = 0; x<=4; x++) {
            Axios.get(apiDomain + '_get_members', {params: {step : x }}).then((response) => {
               commit('set_members', { members: response.data.members, action: 'update' });
            }, (err) => {
               console.log(err.statusText);
            }); 
         }   
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
      get_member_info({commit}, uuid) {
         return new Promise((resolve, reject) => {   
            Axios.get(apiDomain+'_get_member_info', {params: {uuid: uuid.uuid}}).then((response) => {
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
		get_reg_report({commit}) {
			Axios.get(apiDomain+'_get_reg_report').then((response) => {
				commit('set_reg_report',{ regReport: response.data.regReport });   
            commit('set_reg_reports', {regReports: response.data});
			},(err) => {
				console.log(err.statusText);
			});
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
      check_email({commit},email) {
         if(email.indexOf('@') >-1) {
            return new Promise((resolve,reject) => {
               Axios.get(apiDomain+'_check_email', {params: {email : email}}).then((response) => {
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
            console.log(response.data);
            commit('set_scheduling_permissions', response.data);
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
      
		// SET SITE DATA
		set_site_data: (state, {pageContent, conventions, articles}) => {
			state.conventions	= conventions;
			// set current con as selected con for scheduling if no prev. selection
         
         
			// if(localStorage) {
				// if(!localStorage.selectedCon) {
					// localStorage.selectedCon = info.tag_name;
				// }
			// }
			articles.forEach(function(article) {
				article.open = false;
			});
			state.articles 		= articles;
			
			
			pageContent.forEach(function(item) {
				state.pageContent[item.content_name] = item;
			});
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
      
      
      //SET USER INFO   
      set_userInfo: (state, userInfo) => {
         console.log(userInfo);
         Vue.set(state, 'userInfo', userInfo);
      },
      
     
		
		// SET MEMBERS (chunks of 20%)
		set_members: (state, { members, action }) => {
         var vm = this;
         if(action == 'localstorage') {
            if(window.sessionStorage) {
               state.members = JSON.parse(sessionStorage.memberList);
            } 
         } else { 
         
            members.forEach((member)=> {
               var inMembers = false;
               
               state.members.forEach((_member)=>{
                  if(_member.uuid == member.uuid) {
                     _member = member;
                     inMembers = true;
                  } 
               });
               
               if(!inMembers) {
               state.members.push(member);
                  inMembers = false;
                  console.log('new');
               }
            });
            if(window.sessionStorage) {  
               sessionStorage.memberList = JSON.stringify(state.members); 
            }     
         }
		},
		
		
		// REMOVE MEMBER
		unset_member(state, uuid) {
			var member = state.members.find(member => member.uuid === uuid.uuid);
			var memberIndex = state.members.findIndex(member => member.uuid === uuid.uuid);
         console.log(memberIndex);
         
         
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
      
		
		// 	set reg settings	
		set_reg_settings: (state, { regSettings }) => {
			state.regSettings = regSettings;
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
	}
	
	const getters = {
		conventions		: state => state.conventions,
		articles 		: state => state.articles,
		conventionInfo	: state => state.conventionInfo,
		statesList 		: state => state.statesList,
		pageContent		: state => state.pageContent,
		siteContent		: state => state.siteContent,
		conventionInfo	: state => state.conventionInfo,
		currentCon		: state => state.currentCon,
		user			   : state => state.user,
      userInfo       : state => state.userInfo,
		
		// reg getters
		regReport 		: state => state.regReport,
		members			: state => state.members,
		memberTypes		: state => state.memberTypes,
		regSettings		: state => state.regSettings,
		departments		: state => state.departments,
		paymentMethods : state => state.paymentMethods,
		staffPositions	: state => state.staffPositions,
		
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
	}
	
	export default new Vuex.Store ({
		state,
		getters,
		actions,
		mutations
	})