Al Jazeera - Palestine Remixed Mobile
======================================

# Installation

## 1. If you have Bower and Node installed

```
    $ cd directory
    $ npm install && bower install
```

## 2. If you don’t have Bower nor Node installed

1. [Install NodeJS](http://howtonode.org/how-to-install-nodejs)
2. Install Bower:

```
    $ npm install -g bower
```

Should you have problems installing Node, please refer to [this article](http://piotrf.pl/wrote/troubleshooting-command-line-tools).

3. Install Gulp CLI:

```
    $ npm install --global gulp
```
4. Install MetalSmith:
```
    $ npm install metalsmith
```
# Running the thing.

```
    $ cd directory
    $ gulp
```

or, if you want to run the thing in a lang different than English:

```
    $ cd directory
    $ LCODE=A gulp
```

Open http://localhost:8002/ in the browser.

======================================

# Documentation

## Switching to Arabic UI
Set $direction variable in _config.scss.

## Enabling viewer and pad walk-through tips locally
Remove cookies and comment out: 

```
    createCookie("HAPtourStatus", "done", 30)
```

…in HAPtour.coffee and

```
    createCookie("HAVtourStatus", "done", 30)
```

…in HAVtour.coffee

## Iframing PAD and VIEWER in desktop version

Add in .tpl--compact to `<body>` tag
	
	
