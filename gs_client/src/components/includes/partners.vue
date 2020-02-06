
	<template>
		<div id="partners" class="slideshow">
         <span class="toggle fal fa-arrow-alt-left"  @click="toggle_slides('prev')"></span>
         
         <div class="slide " v-if="slide_1" :class="[slide_1_class, slide_1_show]">
            <span class="image" v-bind:style="{'background-image': 'url(/static/images/partners/'+slide_1.image+')'}" ></span>
         </div>
         <div class="slide " v-if="slide_2" :class="[slide_2_class, slide_2_show]" >
            <span class="image" v-bind:style="{'background-image': 'url(/static/images/partners/'+slide_2.image+')'}" ></span>
         </div>
         <div class="slide " v-if="slide_3" :class="[slide_3_class, slide_3_show]" >
            <span class="image" v-bind:style="{'background-image': 'url(/static/images/partners/'+slide_3.image+')'}" ></span>
         </div>
         
         <span class="toggle next fal fa-arrow-alt-right" @click="toggle_slides('next')"></span>
		</div>
	
	</template>
	
	
	
	<script>
		import {apiDomain} from '@/config';
		import { mapState} from 'vuex';
		export default{
			name: 'partners',
			
			
			data() {
				return {
					slide_1        : null,
               slide_1_class  : 'current',
               slide_1_show   : 'show',
               slide_2        : null,
               slide_2_show   : '',
               slide_2_class  : 'next',
               slide_3        : null,
               slide_3_show   : '',
               slide_3_class  : 'prev',     
               slideAnimated  : null,
				}
			},
			
			
			watch: {
				
				
			},
			
			components: {
				
				
			},
			
			
			computed: {
			...mapState({
               partners    : 'partners',
               conventionInfo:'conventionInfo',
         }),
			},
			
			created() {
				let vm = this;
            vm.$store.dispatch('get_partners').then((response)=>{
               response? vm.set_up_slideshow() : '';
            });
			},
			
			
			mounted: function() {
				var vm = this;
            vm.animate_partners();
			},
			
			
			methods: {
            set_up_slideshow() {
               var vm = this;
               if(vm.partners) {
                  vm.slide_1 = vm.partners[0];
                  if (vm.partners.length > 1 ) {
                     vm.partners[1]? vm.slide_2 = vm.partners[1]: '';
                     vm.partners.length > 2? vm.slide_3 = vm.partners[(vm.partners.length)-1] : vm.slide_3 = vm.partners[1];
                  }
               }
            },
            
            
				animate_partners() {
               var vm = this;
               
               setTimeout(function() {
                  vm.toggle_slides('next');
                  vm.animate_partners();
               },30000);  
               
            },
            
            toggle_slides(direction) {
               var   vm = this,
                     lastPartner = (this.partners.length) -1;
               if(! vm.slideAnimated) {      
                  vm.slideAnimated = true;   
                  if(direction == 'next') {
                     if (vm.slide_2 ) {
                              vm.slide_3 = vm.slide_1;
                        vm.slide_1_class = 'prev';
                        vm.slide_2_class = 'current';
                        vm.slide_2_show = 'show';
                        setTimeout(function() {      
                           vm.slide_1_show = ''; 
                           vm.slide_1_class = 'current';
                           vm.slide_1 = vm.slide_2;  
                           setTimeout(function() {
                              vm.slide_2_show = '';
                              vm.slide_2_class = 'next';  
                              vm.slide_1_show = 'show'; 
                              vm.slide_2.index < vm.partners[lastPartner].index? vm.slide_2 = vm.partners[parseInt(vm.slide_2.index) +1] : vm.slide_2 = vm.partners[0];
                              vm.slideAnimated = null;
                           },600);                        
                        },600);
                     }
                  } else {
                     if (vm.slide_3 ) {
                              vm.slide_2 = vm.slide_1;
                        vm.slide_1_class = 'next';
                        vm.slide_3_class = 'current';
                        vm.slide_3_show = 'show';
                        setTimeout(function() {      
                           vm.slide_1_show = ''; 
                           vm.slide_1_class = 'current';
                           vm.slide_1 = vm.slide_3;  
                           setTimeout(function() {
                              vm.slide_3_show = '';
                              vm.slide_3_class = 'prev';  
                              vm.slide_1_show = 'show'; 
                              vm.slide_1.index > 0 ? vm.slide_3 = vm.partners[parseInt(vm.slide_3.index) -1] : vm.slide_3 = vm.partners[lastPartner];
                              vm.slideAnimated = null;
                           },600);                        
                        },600);
                     }
                     
                  }
                  
                  
               }
            },
			}
			
		}
	</script>
	
	
	<style>
      #partners {
         position: relative;
         width: 100%;
         height: 20rem;
         border: solid var(--borderColor) 1px;
         border-radius: .15rem;
         overflow: hidden;
      }
      #partners .toggle {
         display: flex;
         align-items: center;
         justify-content: center;
         font-size: 2.5rem;
         position: absolute;
            top: calc(50% - 1.5rem);
            z-index: 10;
         height: 3rem;   
         width: 3rem;
         opacity: .085;
         background: rgba(0,0,0,.85);
         cursor: pointer;
         transition: opacity .2s;
      }
      #partners .toggle:hover {
         opacity: .35;
      }
      #partners .toggle.prev {
         left: 0;
      }
      #partners .toggle.next {
         right: 0;
      }
      #partners .slide {
         position: absolute;
            top: 0;
         width: 100%;
         height: 100%;
         opacity: 0;
         transition: left 0s;
         transition-timing-function: ease-in-out;
      }
      #partners .slide.show {
         opacity: 1;
         transition: left .6s;
      }
      #partners .image {
         display: flex;
         background-size: cover;
         background-position: center;
         width: 100%;
         height: 100%;
      }
      #partners .slide.prev {
         left: -100%;
      }
      #partners .slide.next {
         left: 100%;
      }
      #partners .slide.current {
         left: 0;
      }
      #partners {
         
      }
	
	</style>