(function($) {
    var STATUS_NEW_ISSUE = 1,
    STATUS_STARTED_ISSUE = 2,
    STATUS_RESOLVED_ISSUE = 3,
    STATUS_FEEDBACK_ISSUE = 4,
    STATUS_CLOSED_ISSUE = 5,
    STATUS_REJECTED_ISSUE = 6;

    $.redimeStatusTranslations = {};
    var _ = function (text) {
        return $.redimeStatusTranslations[text]||text;
    }
    
    var RedmineStatusPlugin = function () {
        var that = this;
        this.s = $('#issue_status_id');
        this.f = $('#issue-form');
        this.a  =$("#issue_assigned_to_id :nth-child(2)");

	var areas = $('div#content>div.contextual:has(a.icon)');

	if (this.f.length === 0 || areas.length === 0 || this.s.length === 0) {
	    return;
	}
        this.issueStatus = parseInt(this.s.val());

        if (this.issueStatus == STATUS_NEW_ISSUE || this.issueStatus == STATUS_FEEDBACK_ISSUE) {
            this.startButton = $('<a href="#" class="icon icon-action-buttons-start">'+_('Start')+'</a>');
            this.startButton.click(function (e) {
                e.preventDefault();
                that.startIssue();
            });

        } else if (this.issueStatus == STATUS_STARTED_ISSUE) {
            this.finishButton = $('<a href="#" class="icon icon-action-buttons-finish">'+_('Finish')+'</a>');
            this.finishButton.click(function (e) {
                e.preventDefault();
                that.finishIssue();
            });

        } else if (this.issueStatus == STATUS_RESOLVED_ISSUE) {
            this.acceptButton = $('<a href="#" class="icon">'+_('Accept')+'</a>');
            this.acceptButton.click(function (e) {
                e.preventDefault();
                that.acceptIssue();
            });
        }

        areas.each(function() {
            var area = $(this);

            if (that.startButton)
                that.insertButton(area, that.startButton);
                
            if (that.finishButton)
	        that.insertButton(area, that.finishButton);

            if (that.acceptButton)
	        that.insertButton(area, that.acceptButton);

	});
    }

    RedmineStatusPlugin.prototype = {
        constructor: RedmineStatusPlugin,
        insertButton: function (area, btn) {
            var editButton = area.find('a.icon-edit');
            if (editButton.length > 0) {
		btn.clone(true).insertBefore(editButton);
	    } else {
		area.append(btn.clone(true));
	    }
        },
        startIssue: function () {
            this.s.val(STATUS_STARTED_ISSUE);
            this.a.attr("selected", "selected");
            this.f.submit();
        },
        finishIssue: function () {
            this.s.val(STATUS_RESOLVED_ISSUE);
            $('#issue_done_ratio').val(100);
            this.f.submit();
        },
        acceptIssue: function () {
            this.s.val(STATUS_CLOSED_ISSUE);
            this.f.submit();
        },
    };
    
    window.RedmineStatusPlugin = RedmineStatusPlugin;
    
    $(document).ready(function () {
         RedmineStatusPlugin._instance = new RedmineStatusPlugin();
    });
})(jQuery);
