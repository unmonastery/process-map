
var $referenceMap = $("<div>")
    .appendTo("#reference-map");

var $counter = 0;

var chapters = {};
var listIds = [];
var $color;

Trello.get("boards/54b56f71886fcc7bdc058779/lists?cards=open&attachments=true&attachment_fields=name,url", function(lists) {
	$.each(lists, function(ix, list) {
		chapters[list.name] = list;
		// Create chapter section 
	    var $chapter = $("<section>")
	    .addClass("chapter")
	    .attr("id", list.id)
	    .attr("name", list.id)
	    .appendTo($referenceMap);
	    // Create container for content
	    var $container = $("<div>")
	    	.addClass("container")
		    .appendTo($chapter);
	    // Create description area
	    var $description = $("<div>")
	    	.addClass("col-sm-8")
		    .appendTo($container);
	    // Create materials area
	    var $materials = $("<div>")
	    	.addClass("col-sm-4 list-group")
		    .appendTo($container);
		$.each(list.cards, function(ix, card) {
			switch(card.name) {
				case "Information Sheet":
					$('<p>')
						.html(markdown.toHTML(card.desc))
						.appendTo($description);
					break;
				case "Color":
					$color = card.desc;
					break;
				/*default:
					var $cardAttach = $("<a>")
						.addClass("list-group-item")
						.text(card.name)
						.appendTo($materials);
					break;*/
			}
			$.each(card.labels, function(ix, label) {
				if(label.name === "MATERIAL") {
					var $cardAttach = $("<a>")
						.addClass("list-group-item")
						.text(card.name)
						.appendTo($materials);
				}
				else if(label.name === "CARD") {
					var $cardAttach = $("<button>")
						.addClass("btn-sm btn-other")
						.text(card.name)
						.appendTo($materials);					
				}
			});
		});
		var $footerId = "footer-" + list.id;
		var $footer = $("<div>")
			.css("background", $color)
	    	.addClass("chapter-footer")
	    	.attr("id", $footerId)
		    .text(list.name)
		    .appendTo($chapter);
		listIds[ix] = list.id;
	});
	createLinks();
});

function createLinks() {
	$.each(listIds, function(ix, id) {
		var $idHash = "#" + listIds[ix + 1];
		var $footerId = "#footer-" + id;
		var $next = $("<a>")
			.attr("href", $idHash)
			.addClass("page-scroll")
			.text(">") // .html('<i class="fa fa-chevron-down"></i>')
			.addClass("next-reference")
			.appendTo($footerId);
	});
};