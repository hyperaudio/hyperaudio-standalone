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

# Running the thing.

```
    $ cd directory
    $ gulp
```

# Building the thing.

```
    …
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