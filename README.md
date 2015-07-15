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

# Running the thing.

```
    $ npm run build
```

which is equivalent to

```
    $ npm run build-english
```

or, if you want to run the thing in a lang different than English, substitute with arabic, turkish or bosnian

```
    $ npm run build-arabic
```

or build all the languages

```
    $ npm run build-all
```

Open http://localhost:8002/ in the browser.

# Scraping MUSE pages

Install phantomjs, on OSX use `brew install phantomjs`, be sure phantomjs is in your PATH

```
    $ cd src/data/E/muse/fetch
    $ node extract.js
```

or supply the proper PATH

```
    $ PATH=$PATH:/usr/local/Cellar/phantomjs/2.0.0/bin node extract.js
```

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
