# API Gateway Sample Scripts

This is a collection of sample scripts for use with Axway API Gateway Scripting
Language filters.

For more information on Axway API Gateway, see:  

https://docs.axway.com/bundle/axway-open-docs/page/docs/index.html

I also strongly recommend this project to help avoid accidental global variables
in your JavaScript filters:

https://github.com/lfirwin/axway-js-filter-check

Globals in these filters cause thread safety issues and can leak data across
multiple transactions.

Although I currently work for Axway, this is a personal repository.  I have done
my best to test the scripts here, but there is no warranty expressed or implied,
SLA, support agreement, etc. covering the use of anything in this repository. 
Everything is provided as-is.  Please report any issues with these scripts to me
on Github.

These scripts are intended to implement and promote best practices because I
have seen too many scripts make it to production that have no affordances for
debugging them whatsoever.  These samples are intended to showcase the best way
I know how to deal with simple, common use cases.

The current Axway API Gateway version as of this writing is 7.7 January 2021 and
all scripts are being tested on 7.7.  I am not aware of any version-specific
items in these scripts, so they may work on older gateway versions but are not
guaranteed to.  Note that the use of scripts is inherently somewhat unsafe for
upgrade.  This is because it's possible for internal classes to change, JARs to
be removed from the classpath (e.g. Apache Commons), etc.  It is therefore best
to avoid scripts when possible.  There are many use cases that can be solved
with filters like Copy/Modify Attributes, String Replace, Evaluate Selector,
etc.  Please make use of those filters whenever possible, rather than scripting.
In particular, selectors allow Java Unified Expression Language (JUEL) syntax,
so it is much better to Evaluate Selector ${empty my.attribute} rather than
checking if an attibute is null or an empty string in script.
