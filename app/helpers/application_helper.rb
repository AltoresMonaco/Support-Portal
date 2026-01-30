module ApplicationHelper
  def available_locales_with_name
    LANGUAGES_CONFIG.map { |_key, val| val.slice(:name, :iso_639_1_code) }
  end

  def feature_help_urls
    features = YAML.safe_load(Rails.root.join('config/features.yml').read).freeze
    features.each_with_object({}) do |feature, hash|
      hash[feature['name']] = feature['help_url'] if feature['help_url']
    end
  end

  # Convert Rails locale code (e.g., "pt_BR", "zh_CN") to valid HTML lang attribute (BCP 47 format)
  # Rails uses underscores for locale variants, but HTML lang attribute requires hyphens
  def html_lang_code(locale = I18n.locale)
    return 'en' if locale.blank?

    locale.to_s.tr('_', '-')
  end
end
