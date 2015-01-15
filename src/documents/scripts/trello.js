
var $container = $("<div>")
	.addClass("row")
    .text("Loading Cards...")
    .appendTo("#phases");

 var $modalsDiv = $("<div>")
    .appendTo("#modals");

var cardNames = {};
var $counter = 0;
var $modalID;
var $modalTarget;
var $stageModal;
var $modalBody, $modalDialog, $modalContent;
var $token;
var $columnLeft, $columnRight;

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
		$modalBody = createModals($modalID);
		$("<h3>")
		    .text(list.name)
		    .appendTo($modalHeader);
		$.each(list.cards, function(ix, card) {
			cardNames[card.name] = card;
			switch(card.name) {
				case "Information Sheet":
					$('<p>')
						.html(markdown.toHTML(card.desc))
						.appendTo($modalBody);
						break;
				default:
					if(card.badges.attachments) {
						var $cardAttach = $("<a>")
						.text(card.name)
						.appendTo($modalBody);
					};
			}

		});
		$counter++;
		if($counter % 3 == 0) {
			$container = $("<div>")
			.addClass("row")
		    .appendTo("#phases");
		}
	});
});

function createModals(modalID){
		$stageModal = $('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>')
			.attr("id", modalID)
			.appendTo($modalsDiv);
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
		return $modalBody;
}