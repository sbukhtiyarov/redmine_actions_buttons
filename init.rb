require 'redmine'

require_dependency 'redmine_actions_buttons/hooks'

Redmine::Plugin.register :redmine_actions_buttons do
  name 'Redmine actions buttons'
  author 'wilsonpjunior@gmail.com'
  description 'This is the Actions for Issues in Redmine'
  version '0.0.9'
  url 'https://github.com/LethusTI/redmine_actions_buttons' if respond_to?(:url)
  author_url 'http://www.lethus.com.br'
  requires_redmine :version_or_higher => '2.0.0'
end

