class AddCustomReplyTimeOption < ActiveRecord::Migration[7.0]
  def up
    # Add custom option to reply_time enum
    # We need to do this via execute as Rails enum doesn't support direct modification
    execute 'UPDATE channel_web_widgets SET reply_time = 3 WHERE reply_time IS NULL'

    # NOTE: The enum values are already handled in the model,
    # this migration is mainly for any future enum constraints
  end

  def down
    # Remove any custom entries by setting them to default
    execute 'UPDATE channel_web_widgets SET reply_time = 0 WHERE reply_time = 3'
  end
end
