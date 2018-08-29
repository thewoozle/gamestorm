
	import Vue from 'vue'
	import Vuex from 'vuex'
	import Axios from 'axios'
	import VueAxios from 'vue-axios'
		
	import {apiDomain} from '../config'
	
	import { siteContent } from './site_content'
	import { statesList } from './states_list'
   import { devNotes } from './dev_notes'
	
	Vue.use(Vuex);
	Vue.use(VueAxios, Axios);
	
	const state = {
		siteContent    : siteContent, 
		statesList     : statesList,
      devNotes       : devNotes,
		showMenu       : false,
		siteSettings   : {},
		currentCon     : {},
		response       : {},
		conEvents      : {},
      allEvents      : {},
		conventionInfo : {},
		conventions    : {},
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
		departments    : {},
		paymentMethods : {},
		members	      : [],
		regReport      : {},
		articles       : {},
		staffPositions : {},
		venues         : {},
      conLocations   : {},
      eventTracks    : {},
      eventTypes     : {},
      ageGroups      : {},  
	}
	
	const actions = {
		
		// GET SITE DATA
		get_site_data ({commit}) {
				Axios.get(apiDomain+ '_get_site_data').then((response) => {
					commit('set_site_data', {
						info		: response.data.convention, 
						pageContent	: response.data.pageContent,
						conventions	: response.data.conventions, 
						articles 	: response.data.articles,
					});
               console.log(response.data);
			  }, (err) => {
				  console.log('error: '+err.statusText);
			  });
		},
		
		// GET EVENTS
		get_con_events({commit}) {
			return new Promise((resolve, reject) => {
				Axios.get(apiDomain+'_get_con_events').then((response) => {
					commit('set_con_events', {events: response.data.con_events});
					resolve();
				},(err) => {
					console.log(err.statusText);
				});
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
			commit('set_user', {user});
		},
      
      
      // UPDATE USER INFO
      update_user_info({commit}, userInfo) {
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
                  commit('set_userInfo', {userInfo});
                  
               }, (err) => {
                  reject(err.response.data.errors);
                  console.log(err.statusText);
            });
         });
         
      },
      
      // SUBMIT LOGIN
      submit_login({commit}, loginInfo) {
         
         return new Promise((resolve, reject) =>{
            var vm = this,
               _formData = new FormData();
               
            for(var key in loginInfo) {
               _formData.append(key, loginInfo[key]);
            }
            
            Axios.post(apiDomain+ '_login', _formData, {headers : 
               {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response) => {
                   
               if (response.data.user) {

                        var user = response.data.user;
                        
                        commit('set_user', {user});
                        Vue.ls.set('user', response.data.user, (60*60*1000) *2); // one hour
                        
                        // start one-hour-and-two-minutes timer then log-out 
                        setTimeout(function() {
                           console.log('LOG OUT timer expired');
                           vm.logout();					
                        },(61*60*1000) * 2);
               }
               
               resolve(response.data);         

            },(err) => {
               reject(err.response.data.errors );
               console.log(err.statusText);
               console.log(err.response.data.errors);
            });
         });
         
      },
      
      
      // GET USER INFO
      get_user_info({commit}, uuid) {
         
         var formData = new FormData();
         formData.set('uuid', uuid);
         
         Axios.post(apiDomain + '_get_user_info', formData, {
               headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).then((response) => {		
            commit ('set_userInfo', response.data);
            
         }, (err) => {
            if (err.response.data.errors) {
               errors.errors = err.response.data.errors;
               resolve(errors);
            }						
            console.log(err.statusText+' - ' + JSON.stringify(err.response.data.errors));
         });
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
		
		// REMOVE MEMBER
		remove_member({dispatch,commit}, uuid) {	
			var vm = this;
			vm.formData = {
				uuid	: uuid,
			}	
			Axios.post(apiDomain + '_remove_member', vm.formData).then((response) => {
            dispatch('get_reg_report');
				commit('unset_member', {uuid});
				commit ('set_response', response.data.response);
			}, (err) => {
				  console.log(err.statusText);
			});
         
		},
		
		// GET REGISTRATION REPORT
		get_reg_report({commit}) {
			Axios.get(apiDomain+'_get_reg_report').then((response) => {
				commit('set_reg_report',{ regReport: response.data.regReport });
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
            _formData = new FormData();
			_formData.append('con', selectedCon);			
      
			Axios.post(apiDomain+'_get_scheduling_data', _formData).then((response) => {
				commit('set_scheduling_data', {
               conEvents      : response.data.conEvents, 
               venues         : response.data.venues, 
               conLocations   : response.data.conLocations, 
               allEvents      : response.data.allEvents,
               eventTypes     : response.data.eventTypes,
               eventTracks    : response.data.eventTracks,
               ageGroups      : response.data.ageGroups   
            });
			},(err) => {
				console.log(err.statusText);
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
      
      // GET CON LOCATIONS
      get_con_locations({commit}, selectedCon) {        
			var vm = this,
            _formData = new FormData();
			_formData.append('con', selectedCon);			
      
			Axios.post(apiDomain+'_get_con_locations', _formData).then((response) => {
            console.log(response.data);
				commit('set_con_locations', response.data); 
            });
      },
      
      //GET CON EVENTS
      get_con_events({commit}, selectedCon) {        
			var vm = this,
            _formData = new FormData();
			_formData.append('con', selectedCon);			
      
			Axios.post(apiDomain+'_get_con_events', _formData).then((response) => {
            console.log(response.data);
				commit('set_con_events', response.data); 
            });
      },
      
      // COPY CON LOCATIONS (copy work done on server)
      copy_con_locations({commit}, conData) {
         Axios.get(apiDomain+'_copy_con_locations', {params: conData}).then((response)=>{
            commit('set_con_locations', response.data);            
         });
      },
      
      update_location({commit}, location) {
         var   vm = this,
               _formData = new FormData();
          
         Object.entries(location).forEach((item)=>{
            console.log(item[0], item[1]);
            _formData.append(item[0], item[1]);	
         });
         
         Axios.post(apiDomain+'_update_location', _formData).then((response)=>{
            
            //commit('set_location', location);          
         }, (err) => {
				  console.log('error: '+err.statusText);
			              
         });
         
         
      },
      
      
		
      
    
	}
	
	const mutations = {
		// SET SITE DATA
		set_site_data: (state, {info, pageContent, conventions, articles}) => {
			state.conventionInfo= info;
			state.conventions	= conventions;
			state.currentCon = info;
			// set current con as selected con for scheduling if no prev. selection
			if(localStorage) {
				if(!localStorage.selectedCon) {
					localStorage.selectedCon = info.tag_name;
				}
			}
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
		
		//SET EVENTS
		set_con_events: (state, {conEvents}) =>{
			state.conEvents = conEvents;
		},
		
		//	 SCHEDULING DATA (for scheduling)
		set_scheduling_data: (state, {conEvents, venues, conLocations, allEvents, eventTypes, eventTracks, ageGroups}) => {
			state.conEvents   = conEvents;
			state.venues      = venues;
         state.conLocations= conLocations;
         state.allEvents   = allEvents;
         state.eventTracks = eventTracks;
         state.eventTypes  = eventTypes;
         state.ageGroups   = ageGroups;
		},		
		
		// SET USER 
		set_user: (state,{ user}) => {
			state.user = user;
		},
      
      
      //SET USER INFO   
      set_userInfo: (state, {userInfo}) => {
         console.log(userInfo);
         Vue.set(state, 'userInfo', userInfo);
      },
      
		
		// SET MEMBERS (chunks of 20%)
		set_members: (state, { members, action }) => {
         if(action == 'localstorage') {
            if(window.sessionStorage) {
               state.members = JSON.parse(sessionStorage.memberList);
            } 
         } else { 
         
            members.forEach((member)=> {
               var inMembers = false;
               
               state.members.forEach((_member)=>{
                  if(_member.uuid == member.uuid) {
                     console.log('update match');
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
			// state.members.splice(memberIndex,1);
			member.con_status				= null;
			member.con_department 			= null;
			member.con_position 			= null;
			member.badge_number 			= null;
			member.membership_description	= null;
		},
		
		// SET REG REPORT
		set_reg_report: (state, { regReport }) => {
			state.regReport = regReport;
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
      
      // SET LOCATIONS FOR SCHEDULING 
      set_con_locations: (state, {locations}) => {
         state.conLocations = locations;
      },
     
      // SET EVENTS FOR SCHEDULING 
      set_con_events: (state, {events}) => {
         state.conEvents = events;
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
      conLocations   : state=>state.conLocations,		
	}
	
	export default new Vuex.Store ({
		state,
		getters,
		actions,
		mutations
	})