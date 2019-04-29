$(document).ready(function() {
	if ($('input[type=checkbox]').is(':checked')) {
		$('body').addClass('dark-theme');
	}
	$('input[type=checkbox]').change(function() {
		if ($('input[type=checkbox]').is(':checked')) {
			$('body').addClass('dark-theme');
		} else {
			$('body').removeClass('dark-theme');
		}
    });
});