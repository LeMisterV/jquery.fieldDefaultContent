/** Exemple d'implémentation simple

<?php
addScriptFile('/layoutftv/arches/common/javascripts/jquery.color.js');
?>*/
document.body.style.backgroundColor = 'white';

var form = $('<form><input type="submit" /></form>').appendTo(document.body);

$('<label for="toto1">libele</label>')
	.hide()
	.appendTo(form);

$('<input type="text" id="toto1" name="toto1" />')
	.appendTo(form)
	.fieldDefaultContent();

$('<input type="text" name="toto2" id="toto2" />')
	.appendTo(form)
	.fieldDefaultContent('test', 'lightgreen');

$('<input style="background:transparent;font-weight:bold" type="text" name="toto3" id="toto3" />')
	.appendTo(form)
	.fieldDefaultContent('test-toto3');

$('<input type="text" name="toto4" id="toto4" />')
	.appendTo(form)
	.fieldDefaultContent('test', 'lightgrey', true);
