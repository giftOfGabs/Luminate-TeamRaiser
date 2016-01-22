Luminate Tips and Tricks
==============================


##URL Parameters
* **Disable Pagewrapper** - ```&pgwrap=n```
* **Set a Session Variable** - ```&s_foo=bar```
Retrieve the value of your session variable with S80
Ex. ```[[S80:foo]]``` would return "bar"
* **Manually Set a Pagewrapper** - ```&pgwrap={####}```
* **Force Browser to Always Load Current External File** - ```styles.css?v=[[S55:0:10000:5]]```
* **Preview Donation Form** - ```&df_preview=true ```
* **View Reusable Pagebuilder Names in Source** - ```&s_debug=true```
* **View Template Names** in Source - ```&s_dev_templates=true```
* **Set a Promo Code** - ```&s_promoCode={value}```
* **Pass URL Arguments to a URL Shortcut** - ```&key={LO_shortcutname}&{argument1=value}```
* **Set Value on Donation Form** - ```set.{input_name}={value}```
* **NEXTURL** - ```&NEXTURL=[[T1:http://yournexturl.com]]```
Set the redirect URL for surveys, logins, and other LO forms with this URL parameter
* **Set Locale** - ```?s_locale=es_US```
* **Remove Interests** - ```&RemoveInterest={interest_id}```
* **Logout** - ```?logout=0```
Ex. log people out on a donation confirmation page by placing this in a hidden image src attribute:
```<img src="https://[[S29:SECURE_DOMAIN]][[S29:SECURE_PATH]]?logout=0" height="1" width="1" style="display:none;" >```

Test if current page is a secure page
```[[?[[S8]]::[[S29:SECURE_DOMAIN]]::secure domain::insecure domain]]```


#####Body Class to Enable Luminate's Default Responsive Behavior
class="[[?xxtruex::x[[S80:mobile]]x::mobile::]]"

##Handy LO URLs
* **Edit Personal Page** - ```{shortname}/site/ConsProfileUser?dispMode=edit```
* **Edit Interests** - ```{shortname}/site/ConsInterestsUser```
* **Site Registration** - ```{shortname}/site/ConsProfileUser```
* **Log In** - ```{shortname}/site/UserLogin```
* **Log Out** - ```{shortname}/site/UserLogin?logout=```
* **Change Password** - ```{shortname}/site/ConsProfileUser?op.dispConsPasswd=```
* **Gift** Service Center - ```{shortname}/site/ServiceCenter```

##TeamRaiser LOs
**Primary Pages**
* Greeting Page - ```&pg=entry```
* Personal Page - ```&pg=personal```
* Team Page - ```&pg=team```
* Company Page - ```&pg=company```
* National Company Page - ```&pg=national_company```
* Custom Page - ```&pg=informational&sid={{custom_page_id}}```
* Top Participants List - ```&pg=teamlist```

**Registration**
* Login / Create Account - ```&pg=utype```
* Find a Participant - ```&pg=pfind```
* Select Team - ```&pg=tfind```
* Select Participation Options - ```&pg=ptype```
* Reg Info - ```&pg=reg```
* Secondary Reg Info - ```&pg=reganother```
* Participant Waiver - ```&pg=waiver```
* Registration Summary - ```&pg=regsummary```
* Registration Payment - ```&pg=paymentForm```
* Confirmation Page - ```&pg=confirm```
* Thank You - ```&pg=rthanks```

##C-Tags
TeamRaiser allows you to retrieve event information with C tags
**Greeting Page Info**
* Event Title - ```[[C1:event_title]]```
* Event Date/Time - 
* Event Schedule - ```[[C1:event_schedule]]```
* Event State - ```[[C1:event_location_state]]```
* Event City - ```[[C1:event_ location_city]]```
* Event Location - ```[[C1:event_location]]```
* Event Map - ```[[C1:map_link]]```
* Event Coordinator Name - ```[[C1:coordinator_name]]``` 
* Event Coordinator Phone - ```[[C1:coordinator_phone]]``` 
* Event Coordinator Email - ```[[C1:coordinator_email]]``` 
* Sponsor Name 1 - ```[[C1:sponsor_1]]``` - repeat for subsequent sponsors


**Personal Page Info**
#####Include images/video on personal page
* ```[[C4:graphic_upload]]```
* ```[[C4:graphic_upload2]]```
* ```[[C:video:personal_video]]```
ex. inlcude a personal page photo in an og:image meta tag - 
```
<meta property="og:image" content="[[?xx::x[[C4:graphic_upload]]x::http://action.humanesociety.org/images/content/pagebuilder/myhumane-fb-logo.gif::http://[[S29:DOMAIN]][[E130:[[C4:graphic_upload]] ".." "" replaceall]]]]" />
```


##S-Tags
#####TODO - add S-Tags from [CD Library](http://library.charitydynamics.com/?page_id=1205)
#####S-Tag Quick Reference
[LO documentation on S-Tags](https://www.blackbaud.com/files/support/helpfiles/luminate-online/help/luminateonline.html#../Subsystems/S-Tags/Content/S-Tags/S-Tags_Quick_Reference.html)

#####S0 - System Information
Ex. API key - ```[[S0:CONVIO_API_KEY]]```


#####S1 - Retrieve data from Cons Profile
```
[[S1:first_name]]
[[S1:user_name]]
[[S1:cons_email]]
[[S1:custom_string1]]
[[S1:CAT_{1234}]]
``` 

#####S4 - Return App ID of Current Page

Find the app ID of any application by including [[S4]] on the page.

Here's a list of the most useful App IDs:
* Donations2 - 9
* Ecommerce - 6
* UserLogin - 10
* Survey - 17
* Secure Survey - 22
* PageServer - 19
* Secure PageServer - 23
* PageNavigator - 200
* Secure PageNavigator - 201
* TR Pages - 26
* TR Registration - 27
* TR Participant Center - 28
* TR Donation Form - 29

#####S8 - Return Current URL

Ex. Use this to set the NEXTURL of a login form to the current page (NEXTURL=[[S8]])


#####S29 - Build URL Paths
Insecure
http://[[S29:DOMAIN]][[S29:PATH]] returns http://shortname.com/site

Secure
https://[[S29:SECURE_DOMAIN]][[S29:SECURE_PATH]] returns https:secure.shortname.com/site

#####S50 - Get Page Referrer Information
The misspelling of "Referer" is intentional:
```
[[S50:Referer]]
[[S50:User-Agent]]
[[?[[S50:User-Agent]]::MSIE 8:: Do IE8 things here :: do non-IE8 things here]]
```

#####S66 - Render payment seal on pagebuilder page
S66 calls in templates, which allows you to pull in the default payment seal for a donation form
```
[[S66:payment/verisign_seal.tpt]]
```

#####S80 - Read Session Variable

Ex. ```[[S80:{session-variable}]]```


#####S86 - Get Auth Token
&auth=[[S86:true]]

#####S120 - Retrive Values on Transaction Thank You and Autoresponders
Following a transaction, information such as donation amount(```[[S120:dc:giftAmount]]```), transaction ID (```[[S120:dc:transactionID]]```), etc. can be retrived with S120 tags. The specific S120 tags available vary by application, donation type and other factors. To see what specific S120 tags are available to you, place the following S-tag on your page/autoresponder to see what options it returns to you ```[[S120:help]]```

S120 values are also used to fill in values on PDF receipts.

#####S334 - Read URL Parameters
Ex. For the URL "../site/PageServer/?pagename=homepage"
[[S334:pagename]] would return "homepage"
Combine S334 tags to see if you're on a donation thank you page:
```
[[?x[[E334:[[S334:df_id]].donation]]x::xcompletedx::<!-- on donation ty page -->::]]
```

##E-Tags
E130 - More coming soon...
[Helpful E130 post in BB Community](https://community.blackbaud.com/forums/viewtopic/1/1947?post_id=1947#p1947)
#####Remove empty decimals at end of a number
[[E130:"{value you're formatting}" ".00" "" replaceall]]

#####Break out individual elements of a date such as Oct 26, 2015
* Month: [[T9:[[E130:"Oct 26, 2015" dup " " indexof 0 swap substring]]]]
* Day: [[T9:[[E130:"Oct 26, 2015" dup "," indexof 4 swap substring]]]]
* Year: [[T9:[[E130:"Oct 26, 2015" dup length dup 5 - swap substring]]]]

##T-Tags
* URL Encode - [[T1:{{string}}]]
* URL Decode - [[T5:{{string}}]]
* JS Escape - [[T6:{{string}}]]
* Escape Double Quotes (used most often with arguments within E130 tag) - [[T8:{{string}}]]
* Trim Whitespace - [[T9:{{string}}]]

##U-Tags
#####U0 or U1 - Set Session Variable
Ex. [[U0:foo=bar]]
Set a TeamRaiser event ID as a session variable so you can use the same syntax to access it everywhere:
```
[[U0:evID=[[S80:frID]]]]
[[?xx::x[[S80:evID]]x::[[U0:evID=[[S80:trID]]]]::]]
[[?xx::x[[S80:evID]]x::[[U0:evID=[[S334:fr_id]]]]::]]
[[?xx::x[[S80:evID]]x::[[U0:evID=[[S334:FR_ID]]]]::]]
[[?xx::x[[S80:evID]]x::[[U0:evID=[[S120:dc:teamRaiserId]]]]::]]
```

#####U5 - Set Meta Information from Anywhere on Page

Ex. [[U5:metatags=<meta tag info >]]
```
[[U5:metatags=
<meta property="og:title" content="" />
<meta property="og:image" content="" />
<meta property="og:description" content="" />
]]
```

##Snippets
#####Get Participant's Name on Personal Page Regardless of Logged In State
```[[E48:[[S80:trID]]-[[S334:px]]:cons.first_name]] [[E48:[[S80:trID]]-[[S334:px]]:cons.last_name]]```

#####Set a Session Variable to evID
```
<!-- Set a Session Variable to evID -->
[[?x[[S42:0:fr_id]]x::xx::
	[[?x[[S334:fr_id]]x::xx::
		[[?x[[S334:FR_ID]]x::xx::
			[[?x[[S334:trID]]x::xx::
				[[?x[[S334:frID]]x::xx::
					[[?x[[S334:fr_ID]]x::xx::
						[[?x[[S334:amp;fr_id]]x::xx::
							[[?x[[S120:dc:teamRaiserId]]x::xx::
							::[[U0:evID=[[S120:dc:teamRaiserId]]]]]]
						::[[U0:evID=[[S334:amp;fr_id]]]]]]
					::[[U0:evID=[[S334:fr_ID]]]]]]
				::[[U0:evID=[[S334:frID]]]]]]
			::[[U0:evID=[[S334:trID]]]]]]
		::[[U0:evID=[[S334:FR_ID]]]]]]
	::[[U0:evID=[[S334:fr_id]]]]]]
::[[U0:evID=[[S42:0:fr_id]]]]]]
<!-- // Set a session variable  to evID -->

<!-- The current evID is "[[S80:evID]]" -->
<!-- [[S120:help]] -->
```

#####Common Badge Conditionals for Personal Pages (can also be used in the PC by removing the PX value)
```
[[?[[E48:[[S334:fr_id]]-[[S334:px]]:if-is-self-donor]]::TRUE::
    <!-- Is a self donor -->
::
	<!-- NOT a self donor -->
]]

[[?[[E48:[[S334:fr_id]]-[[S334:px]]:if-is-captain]]::TRUE::
    <!-- Is Team Captain -->
::
	<!-- NOT Team Captain -->
]]
[[?[[E48:[[S334:fr_id]]-[[S334:px]]:if-dollars-gt:249]]::TRUE::
    <!-- Raised $250 or more -->
::
    <!-- Raised $248 or less -->
]]

[[?[[E48:[[S334:fr_id]]-[[S334:px]]:if-percent-gt:99]]::TRUE::
    <!-- Reached goal -->
::
	<!-- Did NOT reach goal -->
]]
```
#####Get Current Year for Copyright
Copyright &copy; ```[[S9:pattern:yyyy]]```
