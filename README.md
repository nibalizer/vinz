vinz
====

Vinz is a replacement UI for gerrit.


Status
------

Vinz is currently highly experimental and is implemented as a greasemonkey script.
At current it is completely unusable as a review tool. It is a proof of concept that the apis and authentication can be used in this fashion.


Installation
------------


1) Install greasemonkey.

2) On the greasemonkey icon in the toolbar, click the drop down.

3) Select 'New user script'

4) Name: vinz, namespace: vinz, description: vinz. Includes:   ``https://review.openstack.org/#/c/*  ``

5) Close and quit the file that opens.

6) Clone this repository somewhere.

7) Find the vinz script inside your firefox profile. E.g. ``.mozilla/firefox/aZ3bisb.default/gm_scripts/vinz/vinz.user.js``

8) Remote that file and replace it with a symlink to the file managed in git. Any git pull operation will be picked up automatically by firefox and greasemonkey.

```
rm .mozilla/firefox/aZ3bisb.default/gm_scripts/vinz/vinz.user.js
ln -s /full/path/to/vinz/vinz.user.js .mozilla/firefox/aZ3bisb.default/gm_scripts/vinz/vinz.user.js
```
