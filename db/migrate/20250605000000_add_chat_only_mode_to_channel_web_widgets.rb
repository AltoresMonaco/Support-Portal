class AddChatOnlyModeToChannelWebWidgets < ActiveRecord::Migration[7.0]
  def change
    add_column :channel_web_widgets, :chat_only_mode, :boolean, default: false, null: false
  end
end
