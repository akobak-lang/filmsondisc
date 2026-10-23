Copyright IA, Inc. 1999.  All rights reserved.  This code may not be modified
without the express written permission of the copyright holder, IA, Inc.

This software and the accompanying files are sold "as is" and without warranties
as to performance or merchantability or any other warranties whether expressed or
implied.


Installation
============
You should have received the following files in your distribution archive:

   o readme.txt (this text file)
   o navigation.gif (the navigation bar)
   o iabIASYScom.class (your customized interActive Banner)
   o demo.html (sample HTML page)
   o oRealEstate[1..5].jpg (5 images for the sample page)
   o iab-edit.html (an editor to simplify setting interActive Banner values)
   o iab-editBanner.html (file used by the interActive Banner Editor)
   o iab-editColors.html (file used by the interActive Banner Editor)
   o iab-editFile.html (file used by the interActive Banner Editor)
   o iab-editMain.html (file used by the interActive Banner Editor)
   o iab-editNav.html (file used by the interActive Banner Editor)
   o iab-editOutput.html (file used by the interActive Banner Editor)

To get started quickly, make sure you have all the files in one directory and
then open up the iab-edit.html file to start creating banners for your web page.

To use this software, you must have a rudimentary knowledge of HTML and its
<APPLET> tag.  The iabIASYScom.class and navigation.gif files
must be placed together in the same directory as specified by the <APPLET> tag's
CODEBASE parameter.  Even if you do not use the navigation bar, the
navigation.gif must be present in the same directory as the applet or else the
first image will not properly appear.  Remember to FTP the iabIASYScom.class
file as binary, not ASCII.


Features
========
   o Light-weight download (only 9K) for web-based applications.
   o Unlike traditional banners, it's written in Java and thus allows users of
     your website to interact with your banners directly.
   o User-customized navigation bar, colors, fonts, and borders.
   o Careful coding makes it work even behind firewall/proxy.
   o Most parameters are optional, simplifying usage.
   o Flexible design permits it to be used in creative ways:  random rotating
     banner, animator, slide show, blinking text, typed text, product showcase,
     online training, catalog, etc.
   o Works under Netscape 3.0, 4.0, 4.5, Internet Explorer 3.0, 4.0, 5.0, and
     any other Java 1.02+ compliant browser.
   o Takes up less screen real-estate and makes it less busy by compacting a
     group of pictures into one focused area.
   o Increases perceived download time for pages with multiple images since only
     the current image that the viewer should focus on is downloaded.  While
     they are reading the text that goes with the image, the next frame is
     downloaded in the background.  Contrast this with a traditional page where
     all the images are downloaded at once.  Images that the user should not be
     focusing on are competing directly for download time with the current
     image, thus slowing its download time.
   o Does not require users to download and install a plug-in locally on their
     PC so there is a high probability that they will view your banner since
     all major browsers have built-in support.
   o Not limited to any particular size.  You determine what size shows best on
     your pages.
   o Comes with an editor to simplify creating and editing banners.


Examples
========
Here are some complete examples.  You can paste the code in your own page and
modify the parameters as you see fit.  Please see the Parameters section below
for a complete list of valid parameter names and values. To see banner images,
replace the "image..." values with your own images.  Make sure that the images
reside in the same directory as the applet or use relative or absolute paths if
they aren't.

Example 1:  This example uses all default values and demonstrates that the only
parameters that need to be set are the banner[0..4] parameters.

<applet codebase=. code=iabIASYScom.class width=400 height=68>
   <param name=(c)     value=www.iasys.com>
   <param name=banner0 value="Banner 1|image1.jpg|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner1 value="Banner 2|image2.gif|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner2 value="Banner 3|image3.jpg|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner3 value="Banner 4|image4.gif|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner4 value="Banner 5|image5.jpg|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
</applet>

Example 2:  This example shows how you would modify the colors, borders,
algorithm, and fonts for some of the applet.  A complete list can be found toward
the end of this file.

<applet codebase=. code=iabIASYScom.class width=400 height=68>
   <param name=(c)         value=www.iasys.com>
   <param name=titlecolor  value=#f0e68c>
   <param name=txtbgcolor  value=#008080>
   <param name=copycolor   value=#ffffff>
   <param name=linkcolor   value=#ffa500>
   <param name=titlefont   value="helvetica|bold|12">
   <param name=copyfont    value="times|normal|9">
   <param name=linkfont    value="times|normal|9">
   <param name=shownav     value=1>
   <param name=delay       value=10000>
   <param name=next        value=sequential>
   <param name=linktext    value="Click here">
   <param name=banner0     value="Banner 1|image1.jpg|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner1     value="Banner 2|image2.gif|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner2     value="Banner 3|image3.jpg|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner3     value="Banner 4|image4.gif|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
   <param name=banner4     value="Banner 5|image5.jpg|You can add a banner description here and change the image file to one of yours.|http://www.iasys.com">
</applet>

We also included a sample HTML page (demo.html), which you can open in Netscape
or Internet Explorer and see the interActive Banner in action with images.  You
will also find more examples and techniques at our website,
http://www.iasys.com.


Parameters
==========
The following parameters are supported by the interActive Banner.  All
parameters except for the copyright and banner data parameters have default
values, making them optional.

(c)
   o This is the copyright notice.
   o This value is required and must always be www.iasys.com.
   o There is no default value.  This is a required parameter that must always
     be set to www.iasys.com.

banner[0..n]
   o This sets the data for each banner.  The parameter name is "banner",
     followed by a number starting with "0" (zero) and incrementing by 1 up to
     the last banner.  E.g., banner0 sets the data for the first banner and
     banner1 sets the data for the second banner.  Do not skip the numbering
     like so: banner0, banner1, banner3, banner5.  If the applet sees this, it
     will only read the data for banner0 and banner1 and will ignore the rest.
   o The super-value is a string separated by three bars formatted as
     "title|image|copy|link", which delimit the individual banner values.  The
     first sub-value sets the banner title.  The second sub-value sets the
     filename for the image and can be relative to the "codebase" parameter set
     in the HTML <applet> tag.  Please note that due to Java security
     restrictions, the image *MUST* reside on the same server as the applet.
     The third parameter sets the copy or description for the banner.  The
     fourth parameter sets the value for the hyperlink and must be an absolute
     path (e.g., "http://www.iasys.com/shopping.html") rather than a relative
     path (e.g., "shopping.html").
   o There is no default value.  This is a required parameter.

titlecolor
   o This sets the color of the banner's title.
   o The value should be an RGB value, (e.g., "#ffffff" is white).  You can use
     the IA, Inc. Color Mixer at http://www.iasys.com/_services/color.html to
     find those values.
   o The default value is black.

imgbgcolor
   o This sets the background color for the image-side of the banner.
   o This parameter is not currently being used.

txtbgcolor
   o This sets the background color for the text-side of the banner.
   o The value should be an RGB value, (e.g., "#ffffff" is white).  You can use
     the IA, Inc. Color Mixer at http://www.iasys.com/_services/color.html to
     find those values.
   o The default value is orange.

copycolor
   o This sets the color of the copy or description for the banner.
   o The value should be an RGB value, (e.g., "#ffffff" is white).  You can use
     the IA, Inc. Color Mixer at http://www.iasys.com/_services/color.html to
     find those values.
   o The default value is black.

linkcolor
   o This sets the color of the hyper link text.
   o The value should be an RGB value, (e.g., "#ffffff" is white).  You can use
     the IA, Inc. Color Mixer at http://www.iasys.com/_services/color.html to
     find those values.
   o The default value is blue.

titlefont
   o This sets the font for the title.
   o The super-value is a string separated by two bars formatted as
     "family|style|size", which delimit the individual font values.  The first
     sub-value sets the font family such as Helvetica, Dialog, and Courier.
     These values are dependent on which JVM (i.e., the browser) that the applet
     runs in (e.g., Netscape will have different fonts than Internet Explorer).
     To be compatible with all the browsers, use the common ones like Helvetica,
     Dialog, and Courier.  The style sub-values can be italic, bold, or normal.
     The size sub-value simply specifies the font's point size.
   o The default value is "Helvetica|bold|12" which represents a font in the
     Helvetica family, bolded, and at a 12 point size.

copyfont
   o This sets the font for the copy or description of the banner.
   o The super-value is a string separated by two bars formatted as
     "family|style|size", which delimit the individual font values.  The first
     sub-value sets the font family such as Helvetica, Dialog, and Courier.
     These values are dependent on which JVM (i.e., the browser) that the applet
     runs in (e.g., Netscape will have different fonts than Internet Explorer).
     To be compatible with all the browsers, use the common ones like Helvetica,
     Dialog, and Courier.  The style sub-values can be italic, bold, or normal.
     The size sub-value simply specifies the font's point size.
   o The default value is "Helvetica|normal|12" which represents a font in the
     Helvetica family, normal styling, and at a 12 point size.

linkfont
   o This sets the font for the link.
   o The super-value is a string separated by two bars formatted as
     "family|style", which delimit the individual font values.  The first
     sub-value sets the font family such as Helvetica, Dialog, and Courier.
     These values are dependent on which JVM (i.e., the browser) that the applet
     runs in (e.g., Netscape will have different fonts than Internet Explorer).
     To be compatible with all the browsers, use the common ones like Helvetica,
     Dialog, and Courier.  The style sub-values can be italic, bold, or normal.
     The size cannot be modified since it must be the same height as the
     navigation bar.
   o The default value is "Helvetica|bold|11" which represents a font in the
     Helvetica family, bolded, and at a 11 point size.

linktarget
   o This sets the target window for the hyper link.
   o The value can be any valid HTML value such as "_self", "_top", etc.  To
     link into a new window, simply set this value to any name.
   o The default value is "_self", which makes the link behave normally like
     most Web pages.

linktext
   o This sets the text for the hyper link.
   o The value can be any string that fits on the last line of the banner.
   o The default value is "Click here".

shownav
   o This setting determines whether the navigation bar is shown or not.
   o The value can be either "1" to show the navigation bar or "0" to hide the
     navigation bar.  Typically, the navigation bar is hidden for animations.
   o The default value is to show the navigation bar.

delay
   o This sets the delay time before another banner is displayed.
   o The value is specified in milliseconds without any commas.  Remember that
     there are 1,000 milliseconds in 1 second.
   o The default value is "10000", which gives it a delay value of 10 seconds
     before showing a different banner.

border
   o This setting determines whether borders should be drawn around the banner
     and between the image and the text areas.
   o The value can be either "1" to draw the borders or "0" to not draw the
     borders.
   o The default value is to draw the borders.

next
   o This sets the algorithm to be used to process the next banner.
   o The value can be either "random" or "sequential".  Typically, the
     sequential algorithm is used for slide shows or animations.
   o The default value is random.


Tips
====
   o You can swap in your own navigation bar by replacing the navigation.gif
     with your own version.  The only caveat is that the button size and their
     order must be the same (prev, next, pause).  Each button is 14 pixels wide
     and 13 pixels high.
   o For optimal performance, you should resize images that are taller than the
     height of the applet.  This will reduce download time.  However, if you are
     going to use the same image elsewhere on your site, don't resize it since
     you will have to download it twice.  When reducing the height of your
     images, be sure to use a paint program that preserves the aspect ration.
     In other words, if you reduce the height by 10 pixels or a reduction of 5%,
     the width should be reduced by 5% and not just by 10 pixels unless of
     course, 10 pixels also equals 5% of the width.  Also remember to take into
     account the borders, which is enabled by default.  For example, if the
     applet's height is 100, you should resize the images to 98 with borders and
     100 without broders.
   o Use it on your site to sell advertising space.  This way, it acts like a
     billboard and takes up less space and does not clutter your site with
     multiple banner ads.  An added benefit is that the page will appear to load
     faster to the user since ads are downloaded by the in the background and
     the user does not see the browser's download animated icon.
   o The CODEBASE parameter of the <APPLET> tag specifies where the browser will
     download the interActive Banner and its images.  Set this parameter to a
     subdirectory if you want to put all banner-related files in one directory.
     If you want to access images somewhere else on your website, simply
     reference them relative to the CODEBASE directory.
   o Remember to use the HTML &quot if you want to use quotes within a parameter
     value (e.g., <param name="quote" value="I said, &quotHello.&quot">).


Bugs, Limitations, Issues
=========================
   o Due to the security restrictions imposed by browsers upon Java applets, you
     cannot specify an image that resides on a different server other than the
     one from which the interActive Banner applet was downloaded.  E.g., if you
     have the banner located on http://www.iasys.com and you want to link
     images from http://www.anotherDomain.com, Java will not permit this.  You
     will have to copy those images onto your web server or have the interActive
     Banner (i.e., iabIASYScom.class) located on the web server hosting
     anotherDomain.com.
   o Under Netscape, if an HTML page containing the applet is accessed through a
     proxy, the applet may not be able to display the images.  The cause is
     unknown but it could be that Netscape thinks the applet and the images are
     from different servers.  Nonetheless, our interActive Banner will continue
     to run without the images.  The text will be displayed and the navigation
     bar image will be substituted by a text-based navigation bar (<< >> ||).
   o If you are accessing an HTML page locally (i.e., not through the web server
     via the http:// protocol), Internet Explorer 3.0 will not load the images.
     To work around this problem, you should access your page through a local
     Web Server such as Personal Web Server or upgrade to IE4+.
   o To make the interActive Banner as small in size as possible for web
     applications, we had to compromise the process of setting the parameters
     for more visual features.  The notable one being the setting of each
     "frame" of the banner.  We use a "|" character to delimit each field.  So
     this means that you cannot use that character in any of your data.  It's
     reserved for the interActive Banner's use.  Note that the "|" character is
     also known as a "pipe" character and is usually the shifted character
     containing the backslash, "\", character.  The pipe character is NOT a
     lowercase "L" nor the "one" number.
   o Java applets using images will have problems when run under AOL's browser
     because AOL compresses the graphics in a propietary format.  To work
     around this problem, do not use the "compress graphics" option for Web
     graphics in AOL.  An alternative is to make sure the images are smaller
     than 1Kb or larger than 8Kb.  Images between 1Kb and 8Kb will be compressed
     by AOL.
   o The interActive Banner Editor has only been tested under Netscape 4.0+ and
     IE 4.0+.  It uses JavaScript 1.3, which is not supported by lower versions
     of these browsers.
   o When using the interActive Banner Editor under IE to preview the banner,
     images that are correctly specified may not display if they refer to
     parent directories (e.g., "../../images").  This has to do with the
     security mechanism in IE and is only affected in local mode.  When the
     banner is viewed on a web server, the images will display fine.
   o If you want to add a newline in the description, you should use the
     " <br> " tag.  Note that there is a space BEFORE and AFTER the tag.  If you
     want to add a paragraph, simply use " <br> <br> ".
