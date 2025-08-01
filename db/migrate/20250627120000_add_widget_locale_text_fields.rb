class AddWidgetLocaleTextFields < ActiveRecord::Migration[6.1]
  def change
    add_column :channel_web_widgets, :welcome_title_translations, :jsonb, default: {}
    add_column :channel_web_widgets, :welcome_tagline_translations, :jsonb, default: {}
    add_column :channel_web_widgets, :offline_message_translations, :jsonb, default: {}
    add_column :channel_web_widgets, :reply_time_message_translations, :jsonb, default: {}
    add_column :channel_web_widgets, :channel_greeting_translations, :jsonb, default: {}
  end
end
