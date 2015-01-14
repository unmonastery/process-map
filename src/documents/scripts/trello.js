
var $container = $("<div>")
	.addClass("row")
    .text("Loading Cards...")
    .appendTo("#output");

var listNames = {};
var $counter = 0;
var $modalID;
var $modalTarget;
var $stageModal;
var $modalBody, $modalDialog, $modalContent;

// 54b56f71886fcc7bdc058779
// 53c68ad5cd5e81637bc7db48
Trello.get("boards/54b56f71886fcc7bdc058779/lists?cards=open&attachments=true&attachment_fields=name,url", function(lists) {
	$container.empty();
	$.each(lists, function(ix, list) {
	    var $level = $("<div>")
	    .addClass("col-sm-4")
	    .appendTo($container);
	    $modalID = list.id; // .replace(/ /g, "-").replace(/[^a-zA-Z0-9 -]/g, '').toLowerCase();
	    $modalTarget = "#" + $modalID;
	    var $levelName = $("<button>")
		    .text(list.name)
		    .addClass("btn btn-light")
		    .attr("data-target", $modalTarget)
		    .attr("data-toggle", "modal")
		    .appendTo($level);
		$stageModal = $('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>')
			.attr("id", $modalID)
			.appendTo($container);
		$modalDialog = $('<div>')
			.addClass("modal-dialog")
			.appendTo($stageModal);
		$modalContent = $('<div>')
			.addClass("modal-content")
			.appendTo($modalDialog);
		$modalHeader = $('<div>')
			.addClass("modal-header")
			.appendTo($modalContent);
		$modalBody = $('<div>')
			.addClass('modal-body')
			.appendTo($modalContent);
		$("<h3>")
		    .text(list.name)
		    .appendTo($modalHeader);
		$.each(list.cards, function(ix, card) {
			var $cardName = $("<h5>");
	        $cardName.text(card.name)
	        .appendTo($modalBody);
			$('<p>')
				.text(card.desc)
				.appendTo($modalBody);
	        if(card.badges.attachments) {
				var $cardAttach = $("<a>")
				.text(card.name)
		        .appendTo($modalBody);
			};
		});
		$counter++;
		if($counter % 3 == 0) {
			$container = $("<div>")
			.addClass("row")
		    .appendTo("#output");
		}
	});
});

var customModal = $('<div class="custom-modal modal hide fade" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></div><div class="modal-body"></div><div class="modal-footer"><button class="btn" data-dismiss="modal">Close</button></div></div>');

$('.device').click(function(){
    $('body').append(customModal);
    $(this).find($('h3')).clone().appendTo('.custom-modal .modal-header');
    $(this).find('.device-product, .device-details').clone().appendTo('.custom-modal .modal-body');
    $('.custom-modal .hide').show();
    $('.custom-modal').modal();
  
  	$('.custom-modal').on('hidden', function(){
 		console.log("hidden");
    	$('.custom-modal').remove();
	});
});