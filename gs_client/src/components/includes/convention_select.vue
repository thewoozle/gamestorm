
	<template>
		<div id="convention_select" class="convention_select">
			<div class="cons">
				<span class="con" 
					:class="convention.tag_name == selectedCon? 'active' : ''" 
					v-for="convention in conventions" 
					v-text="convention.short_name" 
					@click="update_currentCon(convention)"
				></span>
			</div>
			<div class="buttons">
				<button class="button" @click="(() => {showConInfo = true; update_currentCon({})})" >New Convention</button>
				<button class="button" v-if="currentCon.short_name" @click="showConInfo = true" >Update {{currentCon.short_name}}</button>	
			</div>	
			
			
		
			<div class="slideout con_info" :class="showConInfo? 'show' : '' ">
				<span class="title" >Convention Information for {{currentCon.short_name || 'new convention'}} </span>
				<div class="control_bar">
					<button type="button"  class="control_button fal fa-times"@click.prevent="showConInfo = false" ></button>	
					<button type="button" title="Clear con. form" class="control_button fal fa-redo-alt" @click="update_currentCon({})"></button>
				</div>
				
				<div class="section_content">
					<form class="con_form" @submit="update_convention" >
						<div class="form_row">
								<label>Convention Name</label>
							<div class="input_wrapper">
								<input type="text" class="text_box" v-model="currentCon.name" />
							</div>
						</div>
						
						<div class="form_row">
							<label>Convention Number</label>
							<div class="form_element">
								<div class="input_wrapper">
									<input type="number" class="text_box" min="0" max="1000" v-model="currentCon.con_num" />
								</div>
								<label class="below">Con number</label>
							</div>	
							<div class="form_element">
								<div class="input_wrapper">
									<input type="text" class="text_box" v-model="currentCon.short_name" />
								</div>
								<label class="below" title="the con's common nickname">Con short name</label>
							</div>
							
						</div>
						
						
						
						<div class="form_row con_tag_row" :class="currentCon.short_name? 'show' : ''">
							<label title="system-friendly version of the tag name">Con tag name</label>
							<div class="input_wrapper">
								<input type="text" class="text_box" v-model="currentCon.tag_name" />
							</div>
						</div>	
						
						<div class="form_row">
						<label>Convention Dates</label>
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.start_date_time" use12-hour></datetime>
								</div>
									<label class="below">Convention start date & time</label>
							</div>
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.end_date_time" use12-hour></datetime>
								</div>
								<label class="below">Convention end date & time</label>
							</div>
						</div>
						
						<div class="form_row">
							<label>Registration Dates</label>		
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.registration_open" use12-hour></datetime>
								</div>
								<label  class="below" title="the date registration is open, typically the last day of, or the day after the prev con">Registration open date</label>
								
							</div>
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.prereg_close" use12-hour></datetime>
								</div>
									<label class="below" alt="when online pre-registration closes">Registration close</label>
							</div>
						</div>
						
						<div class="form_row">
						<label>Submission Dates</label>
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.event_submissions_open" use12-hour></datetime>
								</div>
								<label class="below" title="event submissions open date & time">Event submissions open</label>
							</div>
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.event_submissions_close" use12-hour></datetime>
								</div>
								<label class="below" title="event submissions close date & time">Event submissions close</label>
							</div>	
						</div>
						
						<div class="form_row">
							<label> Signup Dates</label>
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.signups_open" use12-hour></datetime>
								</div>
								<label class="below" title="event signups open date & time">Event signups open</label>
							</div>
							<div class="form_element">
								<div class="input_wrapper">
									<datetime type="datetime" v-model="currentCon.signups_close" use12-hour></datetime>
								</div>
								<label class="below" title="event signups close date & time">Event signups close</label>
							</div>
						</div>
						
						
						<div class="form_row">
							<div class="input_wrapper">
								<label>Convention Venue</label>
								<select class="select"  v-model="currentCon.venue" >
									<option value="" style="display: none;">Select Venue...</option>
									<option v-for="venue in venues" :value="venue.id">{{venue.venue_name}}</option>
								</select>
								
								
							</div>
						</div>
						
						
						<div class="controls">
							<button type="submit" class="button">Submit</button>
						</div>
						
						<p v-if="new_con(currentCon.tag_name)">Creating a new convention will create a new entry in the database CONVENTIONS table as well as create the following new 
						new databse tables for it:<br />
						{{currentCon.tag_name}}_membership, <br />
						{{currentCon.tag_name}}_member_roles, <br />
						{{currentCon.tag_name}}_events, <br />
						{{currentCon.tag_name}}_locations, <br />
						
							
						</p>
						
						
					</form>
				</div>
			
			</div>
			
				<article class="data_view" v-if="user.show_dev" @click="handle_data_view" >
					<span class="title">Conventions Data</span>
					<pre>{{JSON.stringify(conventions, null, 4)}}</pre>
				</article>
		</div>
		
	</template>

	<script>
		import Vue from 'vue'
		import { mapGetters } from 'vuex'
		import { Datetime } from 'vue-datetime'
		import 'vue-datetime/dist/vue-datetime.css'
		
		Vue.use(Datetime);
		
		export default{
			name: 'convention_select',
			
			data() {
				return {
					convention 		: {},
					showConInfo		: false,
				}
			},
			
			components: {
				datetime: Datetime,
			},
			
			computed: {
				...mapGetters({
					conventions	: 'conventions',
					siteContent	: 'siteContent',
					venues 		: 'venues',
					currentCon	: 'currentCon',					
					user 		: 'user',
				}),
				
				selectedCon() {
					var vm = this,
						selectedCon,
						returnCon;
					
					if(localStorage) {
						console.log('WORKING HERE');
						selectedCon = localStorage.selectedCon;
						console.log(selectedCon+' / ' + vm.currentCon.tag_name);	
						if (!selectedCon == vm.currentCon.tag_name) {	
							console.log(vm.selectedCon+' / ' +vm.currentCon.tag_name);					
							// // Object.entries(vm.conventions).forEach(function([key,con]) {
								// // if(vm.selectedCon == con.tag_name) {
									// // returnCon = con;
								// // }
								
							// // });
						}
					} else {
						returnCon = vm.currentCon;
					}
					return returnCon;
				},
			},
			
			mounted() {
			},
			
			
			methods: {
				update_convention() {
					
					console.log('UPDATE CONVENTION FUNCTION NEEDED');
				},
				
				
				update_currentCon(convention) {
					var vm = this;			
					if(localStorage) {
						localStorage.selectedCon = convention.tag_name;
					}
					vm.$store.dispatch('update_currentCon', {convention: convention}).then(() => {});
					vm.$store.dispatch('get_con_events', convention.tag_name).then(()=>{vm.$forceUpdate()});
					
			
				},
				
				
				
				new_con(tagName) {
					var vm = this,
						newCon = true;
						
					Object.entries(vm.conventions).forEach(function([key,con]) {
						//console.log(con.tag_name+' / ' + tagName);
						con.tag_name == tagName? newCon = false : '';
					});
					//console.log(newCon);
					return newCon;
				},		
				
			}
		}

	</script>	
	
	<style >
	
		.scheduling_header  .con_controls .cons {
			display: flex;
			flex-wrap: wrap; 
		}
		.scheduling_header  .con_controls .con  {
			display: flex;
			width: 100%;
			justify-content: flex-end;
			padding: .25rem 1rem;
			background: rgba(24,44,53,.65);
			
		}
		.scheduling_header  .con_controls .buttons {
			display: flex;
			flex-wrap: wrap;
		}
		.scheduling_header  .con_controls .button {
			width: 100%;
		}
		
		
	
	
		.convention_select {
			position: relative;
			display: flex;
			justify-content: space-between;
		}
		.convention_select .cons{
			display: flex;
			flex-direction: column;
			overflow: hidden;
			overflow-Y: auto;
			max-height: 10rem;
		}
		.convention_select .con {
			display: flex;
			width: 100%;
			cursor: pointer;
			justify-content: flex-end;
			padding: .25rem 1rem;
			height: 1.5rem;
			min-width: 6rem;
			align-items: center;
			border: solid 1px transparent;
			border-radius: .15rem;
			font-weight: 300;
			text-transform: uppercase;
		}
		.convention_select .con + .con {
			margin-top: .25rem;
		}
		.convention_select .con:hover {
			background: none;
			border-color: none;
		}
		.convention_select .con.active {
			color: var(--titleColor);
			background: rgba(24,44,53,.65);
			border-color: var(--borderColor3);			
		}
		.convention_select .buttons {
			display: flex;
			margin-left: 1rem;
			flex-direction: column;
		}
		.convention_select .button {
			min-width: 15rem;
		}
		.convention_select .button + .button {
			margin-top: .5rem;
		}
		
		/*	------	CON INFO SLIDEOUT	------	*/
		.slideout.con_info {
			background: var(--altBackground);
		}
		.slideout.con_info .form_row .input_wrapper {
			flex-wrap: nowrap;
		}
		.slideout.con_info label {
			text-align: right;
		}
		
		.slideout.con_info input[type="text"],
		.slideout.con_info .text_box {
			border-radius: 0;
			background: none;
			font-size: 1.1rem;
			padding: 0;
			color: var(--textColor2);
		}
		.con_form label.below {
			 width: 100%;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
			font-size: .85rem;
			padding: 0 0 0 .5rem;
			-webkit-box-pack: start;
			-ms-flex-pack: start;
			justify-content: flex-start;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			border: 0;
		}
	
		.slideout.con_info .form_row.con_tag_row {
			max-height: 0;
			overflow: hidden;
			transition: max-height .4s;
		}
		.slideout.con_info .form_row.con_tag_row.show {
			max-height: 5rem;
		}
		.slideout.con_info {
			
		}
		.slideout.con_info {
			
		}
		.slideout.con_info {
			
		}
		
	</style>