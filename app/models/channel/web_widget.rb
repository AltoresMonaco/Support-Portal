# == Schema Information
#
# Table name: channel_web_widgets
#
#  id                              :integer          not null, primary key
#  channel_greeting_translations   :jsonb
#  continuity_via_email            :boolean          default(TRUE), not null
#  feature_flags                   :integer          default(7), not null
#  hmac_mandatory                  :boolean          default(FALSE)
#  hmac_token                      :string
#  offline_message_translations    :jsonb
#  pre_chat_form_enabled           :boolean          default(FALSE)
#  pre_chat_form_options           :jsonb
#  reply_time                      :integer          default("in_a_few_minutes")
#  reply_time_message_translations :jsonb
#  website_name_translations       :jsonb
#  website_token                   :string
#  website_url                     :string
#  welcome_tagline                 :string
#  welcome_tagline_translations    :jsonb
#  welcome_title                   :string
#  welcome_title_translations      :jsonb
#  widget_color                    :string           default("#1f93ff")
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  account_id                      :integer
#
# Indexes
#
#  index_channel_web_widgets_on_hmac_token     (hmac_token) UNIQUE
#  index_channel_web_widgets_on_website_token  (website_token) UNIQUE
#

class Channel::WebWidget < ApplicationRecord
  include Channelable
  include AccountCacheRevalidator
  include FlagShihTzu

  self.table_name = 'channel_web_widgets'
  EDITABLE_ATTRS = [:website_url, :widget_color,
                    :welcome_title, :welcome_tagline,
                    :welcome_title_translations, :welcome_tagline_translations,
                    :reply_time, :reply_time_message_translations, :pre_chat_form_enabled,
                    :continuity_via_email, :hmac_mandatory,
                    { pre_chat_form_options: [:pre_chat_message, :require_email,
                                              { pre_chat_fields:
                                                [:field_type, :label, :placeholder, :name, :enabled, :type, :enabled, :required,
                                                 :locale, { values: [] }, :regex_pattern, :regex_cue] }] },
                    { selected_feature_flags: [] }].freeze

  before_validation :validate_pre_chat_options
  validates :website_url, presence: true
  validates :widget_color, presence: true
  has_many :portals, foreign_key: 'channel_web_widget_id', dependent: :nullify, inverse_of: :channel_web_widget

  has_secure_token :website_token
  has_secure_token :hmac_token

  has_flags 1 => :attachments,
            2 => :emoji_picker,
            3 => :end_conversation,
            4 => :use_inbox_avatar_for_bot,
            5 => :minimal_widget_interface,
            :column => 'feature_flags',
            :check_for_column => false

  enum reply_time: { in_a_few_minutes: 0, in_a_few_hours: 1, in_a_day: 2, custom: 3 }

  def name
    'Website'
  end

  def web_widget_script
    "
    <script>
      (function(d,t) {
        var BASE_URL=\"#{ENV.fetch('FRONTEND_URL', '')}\";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+\"/packs/js/sdk.js\";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          window.altoresSDK.run({
            websiteToken: '#{website_token}',
            baseUrl: BASE_URL
          })
        }
      })(document,\"script\");
    </script>
    "
  end

  def validate_pre_chat_options
    return if pre_chat_form_options.with_indifferent_access['pre_chat_fields'].present?

    self.pre_chat_form_options = {
      pre_chat_message: 'Share your queries or comments here.',
      pre_chat_fields: [
        {
          'field_type': 'standard', 'label': 'Email Id', 'name': 'emailAddress', 'type': 'email', 'required': true, 'enabled': false
        },
        {
          'field_type': 'standard', 'label': 'Full name', 'name': 'fullName', 'type': 'text', 'required': false, 'enabled': false
        },
        {
          'field_type': 'standard', 'label': 'Phone number', 'name': 'phoneNumber', 'type': 'text', 'required': false, 'enabled': false
        }
      ]
    }
  end

  def create_contact_inbox(additional_attributes = {})
    ::ContactInboxWithContactBuilder.new({
                                           inbox: inbox,
                                           contact_attributes: { additional_attributes: additional_attributes }
                                         }).perform
  end

  # Locale-based text accessors with fallback
  def welcome_title_for(locale)
    (welcome_title_translations || {})[locale.to_s] || welcome_title || 'Welcome!'
  end

  def welcome_tagline_for(locale)
    (welcome_tagline_translations || {})[locale.to_s] || (welcome_tagline_translations || {})['en'] || welcome_tagline || 'How can we help?'
  end

  def reply_time_message_for(locale)
    return nil unless reply_time == 'custom'

    (reply_time_message_translations || {})[locale.to_s] || (reply_time_message_translations || {})['en']
  end

  def effective_reply_time_message(locale = 'en')
    return unless reply_time == 'custom' && reply_time_message_for(locale).present?

    reply_time_message_for(locale)
  end
end
