$(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
			str = '';
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		Column.prototype = {
			addCard: function(card) {
				this.$element.children('ul').append(card.$element);
			},
			removeColumn: function() {
				this.$element.remove();
			}
		};

	    function createColumn() {
	    	var $column = $('<div>').addClass('column');
				$columnTitle = $('<h2>').addClass('column-title').text(self.name);
				$columnCardList = $('<ul>').addClass('column-card-list');
				$columnDelete = $('<button>').addClass('btn-delete1').text('x');
				$columnAddCard = $('<button>').addClass('add-card').text('Add a card');

			$columnDelete.click(function() {
			        self.removeColumn();
			});
			    $columnAddCard.click(function() {
			        self.addCard(new Card(prompt("Enter the name of the card")));
			});

			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);
			return $column;
	    }

	}

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card');
				$cardDescription = $('<p>').addClass('card-description').text(self.description);
				$cardDelete = $('<button>').addClass('btn-delete2').text('x');

			$cardDelete.click(function(){
			        self.removeCard();
			});
			
			$card.append($cardDelete)
					.append($cardDescription);
			return $card;
		}

		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
			}
		};
	}

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	}

	function initSortable() {
		$('.column').sortable({
			connectWith: '.column',
			placeholder: 'card-placeholder'
		}).disableSelection();
		$('column-title','btn-delete1', 'add-card')
		  .disableSelection();
	}

	$('.create-column')
		.click(function(){
			var name = prompt('Enter a column name');
				column = new Column(name);
				board.addColumn(column);
		});

	var todoColumn = new Column('To do');
		todoColumn = new Column('To do');
		doingColumn = new Column('Doing');
		doneColumn = new Column('Done');

	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);


	var card1 = new Card('New task');
		card1 = new Card('New task');
		card2 = new Card('Create kanban board');

	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
})

