module RedmineCloseButton
  class Hooks < Redmine::Hook::ViewListener
    render_on :view_issues_show_details_bottom, :partial => 'issues/actions_buttons'
  end
end
