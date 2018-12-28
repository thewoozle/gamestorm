
	<template>
		<div id="registration_page">
			<div class="panel_selection">
				<button type="button"  class="button" @click.prevent="regPanel == 'regForm'? regPanel = 'memberList' : regPanel = 'regForm'">Reg Form</button>
			</div>
			<div class="sections">
			
				<section class="section reg_panel" :class="regPanel == 'regForm'? 'show' : ''">
					<div class="control_bar">					
						<button class="control_button fal fa-cog" type="button" @click.prevent="handle_slideouts('showRegSettings')" title="Show Reg. settings"  ></button>
						<button class="control_button fal fa-redo-alt"   type="button" @click="member={}" title="Clear reg. form" ></button>
						<button class="control_button fal fa-repeat-1-alt"  v-if="member.uuid" type="button" @click.prevent="showBadgeNumber? showBadgeNumber = false : showBadgeNumber = true" title="Update badge number" ></button>
						<button class="control_button fal fa-usd-circle"  v-if="member.uuid" type="button"@click="showTransactions? showTransactions = false : showTransactions = true" title="Show transaction history" ></button>
						<button class="control_button fal fa-user-times"  v-if="member.uuid" type="button" @click="remove_member(member.uuid)"title="Deactivate member entry" ></button>	
					</div>
					
               
					<!-- REG SETTINGS SLIDE-IN -->
					<div class="slide_in reg_settings" :class="showRegSettings? 'show' : ''">
						<button class="close_button fal fa-times" type="button" @click.prevent="showRegSettings = false"></button>
					
						<div class="control_wrapper select_wrapper">
							<label class="label" for="convention">Convention</label>
							<select id="convention" class="select" @change="update_reg_settings"  v-model="regSettings.convention" name="convention" >
								<option v-for="con in conventions"  :selected="con.tag_name == conventionInfo.tag_name" :value="con.tag_name">{{con.short_name}}</option>
							</select>
						</div>	
						
						<div class="control_wrapper ">
							<button class="toggle_button" @click="badges_csv()">Create printer CSVs</button>
						</div>
			
						<div class="control_wrapper ">
							<a href="_membership_csv" target="_blank" class="toggle_button" >
								<span class="text_wrapper">
									<span class="text">Create Membership CSV</span> 
								</span>	
							</a>
						</div>
								
						<div class="control_wrapper ">
							<button class="toggle_button" v-bind:class="regSettings.reg_mode== 1? 'active':''"  type="button" @click.prevent="update_reg_settings('reg_mode', $event)" >
								<span class="text_wrapper">
									<span class="text">At-Convention Mode</span> 
								</span>
								<span class="grad_bar"></span>
							</button>
						</div>
                  
						<div class="control_wrapper ">
							<button type="button" class="toggle_button" :class="showGuestGms? 'active' : ''" @click.prevent="handle_slideouts('showGuestGms')">
								<span class="text_wrapper">
									<span class="text">Guest Gm email blast</span> 
								</span>	
							</button>
						</div>
						
					</div>					
               
               
					<!-- GUEST GM LIST SLIDE-IN -->
					<div class="slide_in transaction_history" :class="showGuestGms? 'show' : ''">
						<button class="close_button fal fa-times" type="button" @click.prevent="showGuestGms? showGuestGms = false : showGuestGms = true" ></button>
               
               GUEST GMS LIST<br />
               select list of guest gms with slider and search, with list below
               
               </div>
					
					
					<!-- TRANSACTION HISTORY SLIDE-IN -->
					<div class="slide_in transaction_history" :class="showTransactions? 'show' : ''">
						<button class="close_button fal fa-times" type="button" @click.prevent="showTransactions? showTransactions = false : showTransactions = true" ></button>
						
						<div class="transaction_element transactions">
							<div class="transaction" v-for="transaction in member.transactions" v-if="member.transactions">
								
								<span class="item date" v-text="month_day_year(transaction.updated_at)"></span>
								<div class="details">
									<span class="item" v-if="transaction.transaction_type" v-text="'type: '+transaction.transaction_type"></span>
									<span class="item" v-if="transaction.transaction_record" v-text="'record: '+transaction.transaction_record"></span>
									<span class="item" v-if="transaction.transaction_method" v-text="'method: '+transaction.method"></span>
									<span class="item" v-if="transaction.order_method" v-text="'order method:'+transaction.order_method"></span>
									<span class="item" v-if="transaction.transaction_amount" v-text="'amount:'+transaction.transaction_amount"></span>
									<span class="item" v-if="transaction.transaction_discount" v-text="'discount: '+transaction.transaction_discount"></span>
								</div>
							</div>
						</div>
						
					</div>
					
					
					<!-- BADGE NUMBER SLIDE-IN -->
					<div class="slide_in badge_number" :class="showBadgeNumber? 'show' : ''">
						<button class="close_button fal fa-times" type="button" @click.prevent="showBadgeNumber? showBadgeNumber = false : showBadgeNumber = true" ></button>
					
						<form class="badge_number_form" :class="member.locked? 'locked' : ''" name="reg_form"  method="post" @submit.prevent="submit_member" >
						
							<div class="input_wrapper badge_number" v-bind:class="member.locked? 'locked' : '' ">
								<input  class="text_box " type="number" name="badge_number" v-model="member.badge_number" min="1" max="5000"  />
								<input type="hidden" v-bind:value="member.locked" name="locked" />
								<label>Badge Number</label>
								<button class="control_button fal fa-user-lock"  @click.prevent="member.locked? member.locked = false : member.locked = true " type="button" title="lock badge number for reserved badge numbers"></button>
							</div>
							
							<button class="button" @click="()=> {member.transaction_method? '' : member.transaction_method = '11'; member.badge_number >= 1 && member.badge_number <= 5000? showBadgeNumber = false : showBadgeNumber }" type="submit">Save</button>
							<p> check on change to see if taken, add option to assign as next of type</p>
						</form>
					</div>
					
					
					
					<form class="reg_form " name="reg_form"  method="post" @submit.prevent="submit_member" >
						<p class="popup_message" v-bind:class="formMessage? 'show' : '' " v-text="formMessage"></p>
						<input type="hidden" name="uuid" v-model="member.uuid"/>	
						<input type="hidden" name="status" v-model="member.con_status"/>	
						<input type="hidden" name="badge_number" v-model="member.badge_number"/>	
						<input type="hidden" name="conf_date" v-model="member.conf_date"/>
						
						<div class="form_content info">
								<div class="form_content main">
									<div class="form_row">
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="first_name" v-model="member.first_name" @keyup="search_members" v-on:keydown.once="formErrors['first_name'] = null" />
											<label>First Name</label>
											<span class="form_error" v-if="formErrors.first_name" v-text="formErrors.first_name? 'Everybone`s gotta have a name' : ''"></span>
										</div>
										
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="last_name" v-model="member.last_name" @keyup="search_members"  v-on:keydown.once="formErrors['last_name'] = null" />
											<label>Last Name</label>
											<span class="form_error" v-if="formErrors.last_name" v-text="formErrors.last_name? 'Last Name required' : ''"></span>
										</div>	
									</div>
									
									<div class="form_row">	
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="badge_name" v-model="member.badge_name" @keyup="search_members"     v-on:keydown.once="formErrors['badge_name'] = null" />
											<label>Badge Name</label>
											<span class="form_error" v-if="formErrors.badge_name" v-text="formErrors.badge_name? 'Badge Name Required' : ''"></span>
										</div>	
									</div>
									
									<div class="form_row">	
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="badge_name2" v-model="member.badge_name2"     v-on:keydown.once="formErrors['badge_name2'] = null" />
											<label>Badge Name 2</label>
											<span class="form_error" v-if="formErrors.badge_name2" v-text="formErrors.badge_name2? '' : ''"></span>
										</div>	
									</div>
									
									<div class="form_row">		
										
											<div class="input_wrapper email_wrapper">
												<input  class="text_box" type="text" name="email" v-model="member.email" @keyup="search_members"     v-on:keydown.once="formErrors['email'] = null" />
											<label>Email</label>
												<span class="form_error" v-if="formErrors.email" v-text="formErrors.email? formErrors.email : 'Must be valid email address'"></span>
											</div>							
										
											<div class="input_wrapper phone_wrapper">
												<input  class="text_box" type="text" name="Phone" v-model="member.phone"   v-on:keydown.once="formErrors['phone'] = null"/>
											<label>Phone</label>
												<span class="form_error" v-if="formErrors.phone" v-text="formErrors.phone? '' : ''"></span>
											</div>
									</div>
									
									<div class="form_row">
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="address" v-model="member.address"   v-on:keydown.once="formErrors['address'] = null" />
											<label>Mailing Address</label>
											<span class="form_error" v-if="formErrors.address" v-text="formErrors.address? 'Mailing Address is required' : ''"></span>
										</div>	
									</div>
									
									<div class="form_row">
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="address2" v-model="member.address2"   v-on:keydown.once="formErrors['address_2'] = null"/>
											<label>Address 2</label>
											<span class="form_error" v-if="formErrors.address2" v-text="formErrors.address2? '' : ''"></span>
										</div>	
									</div>
									
									<div class="form_row">
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="city" v-model="member.city"   v-on:keydown.once="formErrors['city'] = null"  />
											<label>City</label>
											<span class="form_error" v-if="formErrors.city" v-text="formErrors.city? 'City is required' : ''"></span>
										</div>	
									</div>
									
									<div class="form_row">								
										
										<div class="input_wrapper">
											<select class="select" name="state" id="state" v-model="member.state" @click="formErrors['state'] = null" >
												<option value="" style="display: none" >State...</option>										
												<option :value="state.state" v-for="state in statesList" >{{state.name}}</option>	
											</select>
											<label>State or Territory</label>
												<span class="form_error" v-if="formErrors.state" v-text="formErrors.state? 'State or Territory is required' : ''"></span>
										</div>	
											
										
										
										<div class="input_wrapper">
											<input  class="text_box" type="text" name="zip" v-model="member.zip"   v-on:keydown.once="formErrors['zip'] = null" />
											<label>Postal Code</label>
												<span class="form_error" v-if="formErrors.zip" v-text="formErrors.zip? 'Postal Code required' : ''"></span>
											
										</div>								
									</div>
									
									<div class="form_row">		
										<div class="input_wrapper">
											<textarea class="textarea" name="notes" v-model="member.notes"   v-on:keydown.once="formErrors['notes'] = null"></textarea>
											<label>Notes</label>
											<span class="form_error" v-if="formErrors.notes" v-text="formErrors.notes? 'Notes!!!' : ''"></span>
										</div>	
									</div>
								</div>
						
						</div>
						
						
						<div class="form_content meta">
						
							<div class="form_row status_row">	
								<div class="input_wrapper">
									<select class="select" name="status" v-model="member.con_status"   v-on:keydown.once="formErrors['con_status'] = null" >
										<option value="" style="display:none;" selected = "selected">Membership Status</option>
										<option value="0" >Not Attending</option>
										<option v-for="type in memberTypes"  v-bind:value="type.id"  v-text="type.membership_description"></option>
									</select>
									<label>Member Status</label>
									<span class="form_error" v-if="formErrors.con_status" v-text="formErrors.con_status? 'Is this person attending or not' : ''"></span>
								</div>	
							</div>
							
							<div class="member_meta">	
							
								<div class="checkboxes">
									<div class="input_wrapper checkbox_wrapper">
										<input type="checkbox" class="checkbox" :class="member.email_contact? 'checked' : ''" v-model="member.email_contact" name="email_contact"  />
										<label >Email contact</label>
									</div>	
									<div class="input_wrapper checkbox_wrapper">
										<input type="checkbox" class="checkbox" :class="member.gm_interest? 'checked' : ''" v-model="member.gm_interest" name="gm_interest"/>
										<label >Run a Game interest</label>
									</div>	
									<div class="input_wrapper checkbox_wrapper">
										<input type="checkbox" class="checkbox" :class="member.volunteer_interest? 'checked' : ''" v-model="member.volunteer_interest" name="volunteer_interest"/>
										<label >Volunteer Interest</label>
									</div>
								</div>	
								
								<div class="meta_input">
									<div class="input_wrapper">
										<input  class="text_box" type="number" min="0" max="18" name="age" v-model="member.age" title="Age IF under 18 at the time of the con, enter '18' if adult"/>
										<label>Age<br /> (if under 18)</label>
									</div>	
								</div>		
							</div>
						
							<div class="panel transaction_panel"  >
							
								<div class="transaction_elements">
								
								
									<div class="transaction_element new_transaction">
										<span class="title">Transaction Info</span>
									
										<div class="form_row">												
											<div class="input_wrapper">							
												<select class="select" name="transaction_method" v-model="member.transaction_method" @click="formErrors.transaction_method = null" >
													<option value="" style="display: none" >Method...</option>														
													<option value="" v-for="method in paymentMethods" :value="method.id" v-text="method.method"></option>
												</select>
												<label>Method</label>
												<span class="form_error" v-if="formErrors.transaction_method" v-text="formErrors.transaction_method? 'Method required' : ''"></span>
											</div>	
										</div>	
										
										<div class="form_row transaction_row" 
											:class="member.transaction_method == '1'? 'show' 
													:member.transaction_method == '2'? 'show' 
													: member.transaction_method == '4'? 'show' 
													: '' "
										>	
												<input type="hidden" name="transaction_status" value="1" />
												<input type="hidden" name="transaction_type" value="membership" />
												<div class="input_wrapper">
													<input type="text" class="text_box" name="transaction_record" v-model="member.transaction_record"  placeholder="Record #" />
												</div>														
										</div>

										<div class="form_row transaction_row" 
											:class="member.transaction_method == '1'? 'show' 
													:member.transaction_method == '2'? 'show' 
													:member.transaction_method == '3'? 'show' 
													: member.transaction_method == '4'? 'show' 
													: '' "
										>	
												<div class="input_wrapper">
													<input type="text" class="text_box"  name="transaction_amount" v-model="member.transaction_amount" placeholder="Amount Paid" />
												</div>	
										</div>
										
										<div class="form_row transaction_row" :class="member.transaction_method == '2'? 'show' : '' ">	
												<div class="input_wrapper">
													<input type="text" class="text_box"  name="transaction_last_4" v-model="member.cc_last_4" placeholder="CC last 4" />	
												</div>
												
										</div>
										
										<div class="form_row transaction_row" :class="member.transaction_method == '9'? 'show' : '' ">	
												<div class="input_wrapper">
													<input type="text" class="text_box"  name="transfered" v-model="member.transfered" placeholder="transfered from / to" />	
												</div>
												
										</div>
									</div>	
								</div>	
								
							</div>
							
							<div class="panel staff_panel staff" v-bind:class="member.con_status == '15' || member.con_status == '21'? 'show' : ''">
								<span class="title">Staff Info</span>
								
								<div class="form_row" >
								
									<div class="form_element half">
										<select class="select" name="department" id="department" v-model="member.con_department" >
											<option value="" style="display: none" selected = 'selected' >Department...</option>	
											<option value="" >none</option>
											<option :value="department.id" :selected="member.department == 'department.id'" v-for="department in departments" v-text="department.short_name"></option>
										</select>
									</div>
								
									<div class="form_element half">
										<select class="select" name="position" id="position" v-model="member.con_position" >
											<option value="" style="display: none" selected = 'selected'>Position...</option>
											<option value="" >none</option>
											<option :value="position.id" v-for="position in staffPositions" :selected = "member.con_position == 'position.id'" v-text="position.position"></option>
										</select>	
									</div>
								</div>
								
							</div>
							
							<div class="controls">
								<div class="button_wrapper email_status" v-if="member.email" v-bind:class="regSettings.reg_mode >0? '':'show'">
                           <input type="checkbox" style="vizibility: hidden; position: absolute; z-index: -1;" name="send_email_conf" :checked="member.send_email_conf == '1'" value="1" />
									<span class="info_text" v-if="member.email_conf">
										<span class="label">Confirmed: </span>
										<span class="info" v-text="month_day_year(member.email_conf)"></span>
									</span>
									
									<button type="button" v-else class="toggle_button " v-bind:class="member.send_email_conf == '1'? 'active' : '' "  title="send email confirmation on save" @click="member.send_email_conf=='1'? member.send_email_conf='0' : member.send_email_conf='1'">
										<span class="text_wrapper">
											<span class="text">Send Email Confirmation on save</span> 
										</span>
										<span class="grad_bar"></span>
									</button>
									<button class="button print_button" type="button" @click.prevent="print_badge(member)">Print Badge</button>
								</div>

								<button class="button" :class="member.email? '' : 'disabled'" type="submit">Save</button>
							</div>
							
						
						
						</div>
					</form>
				</section>
				
				
				
				
				<section class="section reg_list" >			
					<div class="section_content ">
                  <span class="update_status" v-text="members.length > 0? 'Records => '+ members.length : 'connecting...' "></span>
						<span class="loading"  :class="members.length> 0? '' : 'show'">Loading... </span>
					
						<div class="search_panel">
							<div class="input_wrapper">
								<input type="text"  class="input text_box member_search" @keyup="search_members" v-model="searchQuery" @click="searchQuery='' "  placeholder="search"  />
								<button type="button" class="control_button fal fa-redo-alt" @click.prevent="()=> {searchQuery=''; member={};}"></button>
							</div>
							<div class="buttons">
								<button type="button" class="control_button" :class="memberSort == 'last_name'? 'active' : ''" @click="()=>{memberSort = 'last_name'}">Last Name</button>								
								<button type="button" class="control_button" :class="memberSort == 'badge_number'? 'active' : ''" @click="()=> {memberSort = 'badge_number'}">Badge Number</button>
								<button type="button" class="control_button" :class="memberSort == 'con_department'? 'active' : ''" @click="()=> {memberSort = 'con_department'}">Staff</button>
								<button type="button" class="control_button" :class="memberSort == 'updated_at'? 'active' : ''" @click="()=> {memberSort = 'updated_at'}">Newest</button>
							</div>
						</div>	
						
						<div class="member_list">
							
							<div class="list">
							
								<button class="edit_member_button" 
									v-bind:class="result.con_status > 0? 'attending' : ''" 
									v-for="result in filteredMembers"   
									@click="()=> {
										formErrors = []; 
										member = result; 
										showRegSettings = false;
										showBadgeNumber	= false;
										showTransactions= false;
									}" 
								>
								
									<span class="element status_info" v-if="result.con_status > 0" v-html="result.membership_description"></span>
									
									<span class="element name" v-text="result.first_name+' '+result.last_name"></span>			
									
									<span class="element badge_wrapper" v-if="result.con_status > 0">
										<span class="element badge_num" v-text="result.badge_number"></span>
										<span class="badge_name_wrapper">
											<span class="element badge_name" v-text="result.badge_name"></span>
											<span class="element badge_name" v-text="result.badge_name2"></span>
										</span>
									</span>	
									
									<span class="dept_info" v-if="result.con_department > 0">
										<span class="element dept" v-text="result.department_name"></span>
										<span class="element con_staff" v-text="result.position"></span>										
									</span>
									
								</button>
							
							</div>
							
						</div>	
						
						
					</div>	
				</section>
				
			</div>
		</div>
	</template>
	
	
	
	
	<script>
		import Vue from 'vue'
		import { mapGetters, mapState } from 'vuex'
		import Router from 'vue-router'
		
		Vue.use(Router);
		
		export default{
			name: 'registration_page',
			
			
			data() {
				return {
					userPass		   : false,
					regPanel		   : 'regForm', 
					formMessage		: null,
					showBadgeNumber: false,
					showRegSettings: false,
               showGuestGms   : false,
					showTransactions: false,
					member			: {},
				//conNum : 0,
					searchQuery 	: '',
					formErrors		: [],
					memberSort		: 'last_name',
				}
			},
			
			
			watch: {
				
				
			},
			
			
			computed: {
            ...mapState({    
            }),
				...mapGetters({
					conventionInfo	: 'conventionInfo',
					user		   	: 'user',
					statesList		: 'states',
					conventions		: 'conventions',
					members			: 'members',
					statesList		: 'statesList',	
					memberTypes		: 'memberTypes',
					regSettings		: 'regSettings',
					departments		: 'departments',
					paymentMethods	: 'paymentMethods',
					staffPositions	: 'staffPositions',
				}),
				
				match_payment_record: function() {
					var vm = this;
					switch (vm.member.payment_method) {
						case '1':
						case '2':
							return 'show'
							break;
							
						default:
							return '';						
					}
					
				},
				
				filteredMembers: function() {
					var vm = this,
						badgeName,
						badgeNumber,
						fullName,
						firstName,
						lastName,
						email,
						members;
						//console.log(vm.members.length);
					if (vm.members.length  !== undefined) {
						
						switch(vm.memberSort) {
							// case 'badge_number' :
								// members =  vm.members.sort((a, b) => {
									// return a[vm.memberSort] ? a[vm.memberSort].localeCompare(b[vm.memberSort]) : 1;
									// return b[vm.memberSort] ? b[vm.memberSort].localeCompare(a[vm.memberSort]) : -1;
									// //a[vm.memberSort].localeCompare(b[vm.memberSort])
								// });			
							
								// break;
								
							case 'con_department':
								members =  vm.members.sort((a, b) => {
									return b[vm.memberSort] === null? -1 : a[vm.memberSort]===null? 1 : b[vm.memberSort].toString().localeCompare(a[vm.memberSort].toString());
								});			

								break;
								
							case 'updated_at':
								members =  vm.members.sort((a, b) => {
									b[vm.memberSort] === null? -1: console.log(b[vm.memberSort]);
									return b[vm.memberSort] === null? -1 : a[vm.memberSort]===null? 1 : b[vm.memberSort].toString().localeCompare(a[vm.memberSort].toString());
								});			

								break;
								
							default:
								members =  vm.members.sort((a, b) => {
									return a[vm.memberSort] === null? -1 : b[vm.memberSort]===null? 1 : a[vm.memberSort].toString().localeCompare(b[vm.memberSort].toString());
									//''+a[vm.memberSort].localeCompare(''+b[vm.memberSort]);
								});									
						}
						
						if (vm.searchQuery.length > 1) {	
							return members.filter(function(member) {
								member.badge_name	? badgeName	= member.badge_name	: badgeName = '';
								member.badge_number	? badgeNumber= member.badge_number	: badgeNumber = '';
								member.full_name 	? fullName	= member.full_name	: fullName = '';
								member.first_name 	? firstName = member.first_name : firstName = '';
								member.last_name 	? lastName 	= member.last_name 	: lastName = '';
								member.email 		? email 	= member.email 		: email = '';
                        var fullname = firstName.toLowerCase() + ' '+ lastName.toLowerCase();
								
								return 	fullName.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1 || 
									badgeName.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1 ||  
								//	badgeNumber.indexOf(vm.searchQuery ) !== -1 || 
									firstName.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1 || 
									lastName.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1  || 
                           fullname.indexOf(vm.searchQuery.toLowerCase()) !== -1 ||
									email.toLowerCase().indexOf(vm.searchQuery.toLowerCase() ) !== -1;
							});
						} else {
							return members;
						}
					}
				},
				
				
			},
			
			created() {
				var vm = this;
				vm.check_user();
				
				this.get_store_data();
				
			},
			
			mounted: ()=> {
				
			},
			
			
			methods: {				
				// GET STORE DATA FOR VUEX  
				get_store_data() {
					var vm = this;
					vm.$store.dispatch('get_reg_data').then(()=>{});
					vm.$store.dispatch('get_reg_report').then(()=>{});
					vm.$store.dispatch('get_members').then(() => {});
					vm.$store.dispatch('get_reg_settings').then(()=>{});
				},
				
				// CHECK USER PAGE PERMISSION
				check_user() {
					var vm = this;
					
					if (vm.user) {
						if (vm.user.permissions) {
							if (vm.user.permissions.registration) {
								vm.userPass = true;
							} 
						} 
					}					
					vm.userPass? '' : vm.$router.push('/');
				},
				
				// UPDATE REG SETTINGS
				update_reg_settings() {
					
				},
				
				// RESET REG FORM 
				reset_reg_form(e) {
					var vm = this;
					//e.preventDefault();
					vm.member = [];
					vm.searchQuery = '';
				},
				
				// SEARCH QUERY
				search_members(e) { 
					this.searchQuery = e.target.value;
				}, 
				
				// REMOVE Member				
				remove_member(uuid){
					var vm = this;
					if(confirm('are you sure you want to remove this member?')) {
						vm.$store.dispatch('remove_member', uuid).then(()=>{
							vm.$forceUpdate();
						});
						vm.member = [];
						vm.searchQuery = '';
					}
				},
				
            
            // close slideouts
            handle_slideouts(slideout) {
               var vm = this;
               slideout == 'showRegSettings'? vm.showRegSettings = true : vm.showRegSettings = false;
               slideout == 'showGuestGms'? vm.showGuestGms = true : vm.showGuestGms = false;
               slideout == 'showTransactions'? vm.showTransactions = true : vm.showTransactions = false;
            },
            
				
				// SUBMIT MEMBER FOR REGISTRATION
				submit_member(e) {
					var vm = this;
					
					vm.formErrors = [];
					
					if(!vm.member.badge_name) {
						vm.member.badge_name = vm.member.first_name;
					}
					if (vm.member.con_status > 0) {
						vm.member.membership_description = vm.memberTypes.find(type => type.id == vm.member.con_status).membership_description;
					} else {
						vm.membership_description = null;
					}
					
					vm.$store.dispatch('submit_member', vm.member).then((response)=> {
						
						if (response.errors) {
							vm.formErrors = response.errors;
						} else {
							if (vm.formErrors.length <1) {
								vm.member = [];
								vm.searchQuery = '';
							}
						}
					});
					
					vm.$forceUpdate();					
				}
			}			
		}
	</script>
	
	
	<style scoped>
		#registration_page .sections {
			justify-content: space-between;
			height: calc(100vh - 8rem);
			width: 100%;
			padding: 0 2rem;
			max-width: 80rem;
		}
		.panel_selection {
			display: none;
			width: 100%;
			height: 4rem;
			justify-content: center;
		}
		.panel_selection .button {
			font-size: 2rem;
		}
		.section.reg_panel { 
			position: relative;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100%;
			max-width: 45rem;
			padding: 1rem; 
			overflow: hidden;
			overflow-Y: auto;
			border-radius: var(--borderRadius);
			background: #2a2b2d;
			box-shadow: var(--blackBoxShadow);
		}
		.section.reg_panel .control_bar .control_button {
			color: #d7d7d7;
			background: var(--button);
			border: solid 1px var(--borderColor2);			
		}


		.section.reg_panel .slide_in { 
			position: absolute;
				top: 0;
				z-index: 50;
				right: -16rem;
			display: flex;
			flex-direction: column;	
			width: 15rem;
			padding: 3rem 1rem 1rem 1rem;
			margin: .5rem .5rem 0 0;
			border: solid 1px var(--borderColor2);
			background: rgba(30,30,30,.95);
			border-radius: .15rem;
			transition: right .4s, box-shadow .4s;
		}
		.section.reg_panel .slide_in.show { 
			right: 0;
		}
		.section.reg_panel .slide_in .close_button { 
			position: absolute;
				top: 0;
				right: 0;
			margin: -1px;	
		}
		
		.section.reg_panel .transactions {
			display: flex;
			flex-wrap: wrap;		
			max-height: calc(100vh - 15rem);
			overflow: hidden;
			overflow-Y: auto;
		}
		.section.reg_panel .transaction {
			display: flex;
			flex-wrap: wrap;	
		}
		.section.reg_panel .transaction .item {
			display: flex;
			font-weight: 300;
			width: 100%;
			
		}
		.section.reg_panel .transaction .date {
			font-weight: bold;
			color: var(--titleColor);
			
		}
		.section.reg_panel .transaction .details {
			display: flex;
			flex-wrap: wrap;
			padding: .5rem 1rem;
			width: 100%;
		}
		
		.section.reg_panel .slide_in  .badge_number_form {
			margin-top: 1rem;
			position: relative;
		}
		.section.reg_panel .slide_in  .badge_number_form .input_wrapper {
			padding-right: 3rem;			
		}
		.section.reg_panel .slide_in  .badge_number_form .control_button {
			position: absolute;
				top : 0;
				right: 0;
			width: 2rem;
			height: 2rem;
			font-size: 1.25rem;
		}
		.section.reg_panel .slide_in  .badge_number_form .text_box {
			text-align: center;
			font-size: 1.5rem;
		}
		.section.reg_panel .slide_in  .badge_number_form.locked .text_box {
			pointer-events: none;
			color: #555;
		}
		.section.reg_panel .slide_in  .badge_number_form.locked .control_button {
			color: var(--warningColor);
			background: none;
			border: none;
		}
		
		.section.reg_panel .slide_in  .badge_number_form label {
			border: none;
		}
		.section.reg_panel .slide_in  .badge_number_form .button {
			font-size: 1.25rem;
			width: auto;
			margin: 1rem auto 0;
			padding: .25rem 1rem;			
			min-height: 0;
		}
		
		.section.reg_panel .slide_in  .control_wrapper {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			height: 4.5rem;
			border-radius: .25rem;
			width: 100%;
			padding: .25rem .5rem;
			letter-spacing: .075em;
		}
		
		.section.reg_panel .slide_in .select_wrapper .select {
			display: flex;
			width: 100%;
			font-size: .85rem;
			line-height: 1.65rem;
			justify-content: center;
			height: 1.65rem;
			background: var(--button);
			color: var(--titleColor);
			border: solid 1px var(--borderColor2);
			margin: .15rem 0;
			
		}
		.section.reg_panel .slide_in .select_wrapper .label {
			display: flex;
			width: 100%;
			border-right: 0;
			font-size: .85rem;
			justify-content: flex-start;
			padding: 0 0 .15rem 0;
			margin: 0 .5rem;
			border-bottom: solid 1px #555;
		}
		
		/*	------	REG FORM	------	*/
		.reg_form {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			width: 100%;
		}
		.reg_form .form_row {
			margin-top: 0;
			padding: 0;
		}
		.reg_form .form_content{
			display: flex;
			flex-wrap: wrap;
			padding: 0 .5rem;
		}
		
		.reg_form .form_content .title {
			display: flex;
			width: 100%;
			justify-content: center;
			text-transform: uppercase;
			letter-spacing: .05em;
			line-height: 1.25em;
			font-size: .9rem;
			color: var(--borderColor);
		}
		.reg_form .form_content.info{
			width: 60%;
		}
		.reg_form .form_content.meta{
			width: 40%;
			padding-right: 3rem;
		}
		
		.section.reg_panel .text_box {
			border-bottom: solid 1px #777;
			border-radius: 0;
			padding: 0 .5rem;
		}
		.reg_form .select,
		.reg_form .textarea {
			border: solid 1px #777;
		}
		.reg_form label{
			width: 100%;
			flex-wrap: wrap;			
			font-size: .85rem;
			padding: 0 0 0 .5rem;
			justify-content: flex-start;
			align-items: center;
			border: 0;
		}
		.reg_form .email_wrapper {
			width: 60%;
		}
		.reg_form .phone_wrapper {
			width: 40%;
		}
		.reg_form .member_meta  {
			display: flex;
			width: 100%;
			margin-top: 2rem;
			align-items: space-between;
		}
		.reg_form .member_meta .meta_input{
			display: flex;
			align-items: flex-start;
			width: 40%;
			margin-left: 5%;
		}
		.reg_form .member_meta .checkboxes  {
			display: flex;
			flex-wrap: wrap;
			width: 55%;
		}
		
		.reg_form .member_meta .checkboxes .checkbox_wrapper + .checkbox_wrapper {
			margin-top: .75
			rem;
		}
		.reg_form .member_meta  .input_wrapper {
			width: 100%;
		}
		.reg_form .member_meta .text_box {
			height: 2rem;
			text-align: center;
		}
		.reg_form .panel {
			display: flex;
			align-self: flex-start;
			flex-wrap: wrap;
			width: 100%;
			background: rgba(0,0,0,0.2);
			border-radius: .15rem;
			border: solid 1px #444;
			padding: .5rem;
		}
		.reg_form .panel + .panel {
			margin-top: 1rem;
		}
		.reg_form .transaction_panel .transaction_row {			
			max-height: 0;
			overflow: hidden;
			transition: max-height .3s;
			margin-top: 0;
			padding: 0;
		}
		.reg_form .transaction_panel .transaction_row.show {
			max-height: 4rem;
			margin-top: .5rem;
			padding: .25rem 0;
		}
		.reg_form .panel.staff_panel {
			max-height: 0;
			overflow: hidden;
			padding: 0 .5rem;
			transition: max-height .4s, padding .4s;
		}
		.reg_form .panel.staff_panel.show {
			max-height: 5rem;
			padding: .5rem;
		}
		.reg_form .form_content.meta .controls {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			padding: 0 1rem;
			margin: .5rem 0 1rem 0;
		}
		.reg_form .form_content.meta .controls .button_wrapper {
			display: flex;
			align-self: flex-start;
			flex-wrap: wrap;
			width: 100%;
			max-height: 0;
			overflow: hidden;
			transition: max-height .4s;
		}
		.reg_form .form_content.meta .controls .button_wrapper.show {
			max-height: 6rem;
		}
		.reg_form .form_content.meta .controls .toggle_button {
			padding: .25rem 1rem;			
		}
		.reg_form .form_content.meta .controls .button {
			margin: .5rem 0;
			width: 100%;
		}
		
		
		
		.section.reg_list { 
			position: relative;
			display: flex;
			width: 100%;
			max-width: 20rem;
			padding: 1rem;
			background: #2a2b2d;
		}
		.section.reg_list .section_content {
			display:flex;
			width: 100%;
			flex-direction: column;			
		}
		
		.section.reg_list .loading {
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			width: 100%;
			height: 100%;
			opacity: 0;
			background: url(/static/images/carbonfiber_grid.png) repeat;
			font-size: 1.5rem;
			text-transform: uppercase;
			overflow: hidden;
			transition: opacity .3s, z-index .3s;
		}
		.section.reg_list .loading.show {		
			opacity: .65;
			z-index: 100;
		}
		
		
		/*------	SEARCH PANEL	------	*/
		.section.reg_list .search_panel {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			height: 5.5rem;
		}	
		
		.section.reg_list .input_wrapper {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
		.section.reg_list .input_wrapper .control_button {
			display: flex;
			width: 2rem;
			height: 2rem;
			font-size: 1.35rem;
			line-height: 1.5rem;
		}
		.section.reg_list .input_wrapper .text_box {
			display: flex;
			width: 15rem;
			min-height: 2rem;
			margin: 0;
			padding: 0 .5rem;
			border-radius: .15rem;
		}
		
		.section.reg_list .buttons {
			display: flex;
			justify-content: space-between;
			margin: .5rem 0;
			width: 100%;
		}
		.section.reg_list .buttons .control_button {
			display: flex;
			height: 2rem;
			padding: 0 .5rem;
			align-items: center;
			font-size: .85rem;
			line-height: .9rem;
			width: auto;
		}
		.section.reg_list .buttons .control_button+ .control_button {
			margin-left: .5rem;
		}
		
		
		/*------	MEMBER LIST	------	*/
		.section.reg_list .member_list{
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			width: 100%;
			
			border: solid 1px #333;
			border-radius: .2rem;
			margin: .5rem 0 0 0;
			overflow: hidden;
			overflow-Y: auto;
		}
		.section.reg_list .list {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
		}
	
	
		
		.section.reg_list  .edit_member_button {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			cursor: pointer;			
			border: solid 1px var(--borderColor2);
			border-radius: var(--borderRadius);	
			width: 100%;
			opacity: .65;
			padding: .25rem .5rem;
			flex-wrap: wrap;
			background: #000;
		}	
		.section.reg_list  .edit_member_button + .edit_member_button {
			margin-top: .25rem;
		}
		.section.reg_list  .edit_member_button:hover,
		.section.reg_list  .edit_member_button.attending {
			opacity: 1;
		}
		.section.reg_list  .edit_member_button.attending {
			padding: .5rem;
		}
		.section.reg_list  .edit_member_button .dept_info {
			display: flex;
			flex-wrap: wrap;
			padding: .25rem 0;
		}
		
		
		.section.reg_list .element {
			display: flex;
			width: 100%;
			flex-wrap: wrap;
			text-shadow: -1px -1px 1px rgba(0,0,0,0.25);
		}	
		.section.reg_list .status_info {
			padding: 0 0 0 1rem;
			color: var(--textColor3);
			font-weight: 300;
			font-size: .85rem;
			line-height: 1rem;
		}	
		
		.section.reg_list .name {
			padding: 0;
			font-size: .85rem;
			color: var(--altColor);
			letter-spacing: .05em;
         font-weight: 100;
		}
		.section.reg_list .attending .name {
			font-size: 1rem;
		}
		
		.section.reg_list .badge_wrapper {
			display: flex;
			overflow: hidden;
			line-height: 1.5rem;
			max-height: 4rem;
			border-top: solid 1px #5f5f5f;
			border-bottom: solid 1px #5f5f5f;
			margin: .5rem 0;
			padding: .25rem .25rem .35rem .5rem;
			background: rgba(0,0,0,0.1);
		}
		.section.reg_list .badge_num {
			align-items: center;
			justify-content: flex-end;
			font-size: 1.25rem;
			font-weight: 500;		
			width: 15%;			
			color: var(--textColor3);
			font-family: Dosis, sans-serif;
			letter-spacing: .05em;
		}
		.section.reg_list .badge_name_wrapper {
			display: flex;
			min-height: 1rem;
			flex-wrap: wrap;
			width: 85%;
			padding: 0 0 0 .5rem;
		}
		.section.reg_list .badge_name {		
			display: flex;		
			justify-content: center;
			font-size: .85rem;
			line-height: 1em;
			color: var(--highlightColor);
			letter-spacing: .05em;
			width: 100%;
		}
		.section.reg_list .con_staff b,
		.section.reg_list .dept b{
			display: flex;
			flex-wrap: nowrap;
			
			justify-content: flex-end;
			width: 5rem;
			padding-right: .5rem;
		}
		
		.section.reg_list  .edit_member_button .dept_info {
			display: flex;		
			justify-content: space-between;	
			flex-wrap: nowrap;
			width: 100%;
			padding: 0;		
		}
		.section.reg_list .con_staff,
		.section.reg_list .dept {
			font-size: .85rem;
			display: flex;		
			overflow: hidden;
			padding: 0 .5rem; 
		}
		
		
	
	
	
		
		/*  ---------------------------------------------------------------------------------
								RESPONSIVE LAYOUT
			---------------------------------------------------------------------------------  	*/
		
		
		@media (min-width:1536px) { 
		}
		
		@media (min-width:1280px) { /* desktop */ 
			
		}
		
		@media (max-width:1024px) { /* laptop, small desktop */ 
			
		}
		
		@media (max-width:800px) { /* tablet, large phone */
			.section.reg_panel {
				position: absolute;
				top: 0;
				left: -100%;
				width: 100%;
				transition: left .5s;
			}		
			.section.reg_list {
				position: absolute;
				top: 0;
				left: 100%;
				transition: left .5s;
			}
			.section.reg_list.show,
			.section.reg_panel.show {
				left: 0;
			}			
			
			.panel_selection {
				display: flex;
			}
		
		
		}
		
		@media (max-width:400px) { /* small phone */ 
		
		}
		
		
	
	
	</style>