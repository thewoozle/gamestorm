
	<template>
		<div id="page_footer" ref="page_footer">
		
					<div class="footer_wrapper"> 
						<div class="footer_inner clearfix">
							<div class="footer_element sitemap">
								<h3 class="title">SiteMap</h3>
								<div class="content">
									<a class="link" href="">Home</a>
									<a class="link" href="">Register</a>
									<a class="link" href="">Connect</a>
									<a class="link" href="">Convention</a>
									<a class="link" href="">Gallery</a>
									<a class="link" href="">Venue</a>
									<a class="link" href="">Convention Membership</a>
									<a class="link" href="">Dealers</a>
									<a class="link" href="">Organized Role Play</a>
									<a class="link" href="">Play &amp; Win</a>
									<a class="link" href="">Events</a>
									<a class="link" href="">Event List</a>
									<a class="link" href="">Submit an Event</a>
									<a class="link" href="">My Convention</a>
									<a class="link" href="">Info</a>
									<a class="link" href="">Press</a>
									<a class="link" href="">News center</a>
									<a class="link" href="">Policies</a>
									<a class="link" href="">Volunteering</a>
									<a class="link" href="">Connect</a>
								</div>
							</div>
							<div class="footer_element links ">
								<h3 class="title">Links</h3>
								<div class="content"><a class="link" href="">Contact Us</a>
								</div>	
							</div>
							
							<p class="copyright">Oregon Science Finction Conventions inc. ©2007 - </script></p>								
						</div>
					</div>
		</div>
	</template>
	
	
	
	<script>
		export default{
			name: 'page_footer',
			
			
			data() {
				return {
				}
			},
			
			
			watch: {				
			},
			
			
			computed: {
				
				
			},
			
			
			mounted: function() {
			},
			
			
			methods: {
			}
			
		}
	</script>
	
	
	<style>
	
		
	
    /*  -----------------------------------------------------------------------------------------------------
                                    PAGE FOOTER
        -----------------------------------------------------------------------------------------------------    */ 
    #page_footer {
		position: relative;
		width: 100%;
	}
	
	#page_footer .background {
		background: rgba(0,0,0,0.25);
		padding: 5px 0 0 0;		
	}
	#page_footer .footer_inner { 
		width: 100%;
		max-width: 1300px;
		padding: 4px 0;
		margin: 0 auto;
	}
	#page_footer .title {
		color: #3D7D52;
		font-size: 1.1em;
		line-height: 1.5em;
		border-bottom: solid 1px #666;
		display: inline-block;
		letter-spacing: .1em;
		text-shadow: -1px -1px 1px rgba(0,0,0,0.15);
	}
	#page_footer .footer_element {
		display: inline-block;
		background: rgba(146,0,0,.25);
		border-radius: 3px;
		padding: 6px 12px;
		width: 47%;
	}
	#page_footer .footer_element + .footer_element {
		margin-left: 
	}
	
	
	#page_footer .sitemap .list{
		margin-left: 50px;
		padding: 4px 0;
		-webkit-column-count: 4;
		-moz-column-count: 4;
		column-count: 4;
		font-size: .8em;
	}
	#page_footer .sitemap .item{
		display: inline-block;		
		width: 25%;
		min-width: 100px;
	}
	#page_footer .footer_footer {
		display: block;	
		padding: 5px 15px 0 0;		
	}
	#page_footer .footer_footer p {
		display: inline-block;
		line-height: 1.5em;		
		color: #444;
		text-shadow: 0 1px 1px rgba(0,0,0,0.25);
	}
	#page_footer .footer_footer .link {
		font: inherit;
	}
	#page_footer .footer_footer .copywrite {
		color: #666;
		float: right;
		letter-spacing: .25em;
		font-size: .8em;
		text-shadow: none;
	}
	
	
	
	</style>