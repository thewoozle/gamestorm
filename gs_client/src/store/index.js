
	import Vue from 'vue'
	import Vuex from 'vuex'
	import Axios from 'axios'
	import VueAxios from 'vue-axios'
		
	import {apiDomain} from '../config'
	
	import { siteContent } from './site_content'
	import { statesList } from './states_list'
	
	Vue.use(Vuex);
	Vue.use(VueAxios, Axios);
	
	const state = {
		siteContent    : siteContent, 
		statesList     : statesList,
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
		regSettings    : {},
		memberTypes    : {},
		departments    : {},
		paymentMethods : {},
		members	      : {},
		regReport      : {},
		articles       : {},
		staffPositions : {},
		venues         : {},
      conLocations   : {},
	}
	
	const actions = {
		
		// GET SITE DATA
		get_site_data ({commit}) {
			return new Promise((resolve, reject) => {
				Axios.get(apiDomain+ '_get_site_data').then((response) => {
					commit('set_site_data', {
						info		: response.data.convention, 
						pageContent	: response.data.pageContent,
						conventions	: response.data.conventions, 
						articles 	: response.data.articles,
					});
               console.log(response.data);
					resolve();
			  }, (err) => {
				  console.log(err.statusText);
			  });
			});
		},
		
		// GET EVENTS
		get_events({commit}) {
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
			  });			
		},
		 
		// SUBMIT MEMBER for registration
		submit_member({commit}, member) {
			console.log(member);
			var errors = {errors: []};
			return new Promise((resolve, reject) => {
				Axios.post(apiDomain+'_submit_member', member).then((response) => {					
					commit ('set_member', {updatedMember: response.data.response.member.member});
					resolve(response.data.response);
				}, (err) => {
					if (err.response.data.errors) {
						errors.errors = err.response.data.errors
						resolve(errors);
					}						
					console.log(err.statusText);
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
			Axios.get(apiDomain + '_get_members').then((response) => {
				commit('set_members', { members: response.data.members });
			  }, (err) => {
				  console.log(err.statusText);
			  });
		},
		
		// REMOVE MEMBER
		remove_member({commit}, uuid) {	
			var vm = this;
			vm.formData = {
				uuid	: uuid,
			}	
			Axios.post(apiDomain + '_remove_member', vm.formData).then((response) => {
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
		
		/*-----------------------------------------------------------
                  SCHEDULING DATA 
      ----------------------------------------------------------- */
		// get scheduling data (con locations, con events, con signups, events)
   
		get_scheduling_data({commit}, selectedCon) {
			console.log(selectedCon);
			var vm = this;
			vm.conData = {
				con: selectedCon
			};
      
			Axios.post(apiDomain+'_get_scheduling_data', vm.conData).then((response) => {
				commit('set_scheduling_data', {
               conEvents : response.data.conEvents, 
               venues: response.data.venues, 
               conLocations : response.data.conLocations, 
               allEvents : response.data.allEvents});
			},(err) => {
				console.log(err.statusText);
			});
      
      
		},
      
    
	}
	
	const mutations = {
		// SET SITE DATA
		set_site_data: (state, {info, pageContent, conventions, articles}) => {
			state.conventionInfo= info;
			state.currentCon 	= info;
			state.conventions	= conventions;
			
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
		set_scheduling_data: (state, {conEvents, venues, conLocations, allEvents}) => {
			state.conEvents= conEvents;
			state.venues   = venues;
         state.conLocations= conLocations;
         state.allEvents   = allEvents;
		},		
		
		// SET USER 
		set_user: (state,{ user}) => {
			state.user = user;
		},
		
		// SET MEMBERS 
		set_members: (state, { members }) => {
			state.members = members;
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
			var member = state.members.find(member => member.uuid === updatedMember.uuid);
			
			if (member) {
				member = updatedMember;
			} else {
				state.members.push(updatedMember);
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
      conLocations   : state=>state.conLocations
		
	}
	
	export default new Vuex.Store ({
		state,
		getters,
		actions,
		mutations
	})