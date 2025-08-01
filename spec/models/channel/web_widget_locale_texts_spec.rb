# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Channel::WebWidget do
  let(:account) { FactoryBot.create(:account) }
  let(:widget) do
    described_class.create!(website_url: 'https://example.com', widget_color: '#fff', account: account)
  end

  before do
    widget.update!(welcome_title_translations: { 'en' => 'Welcome!', 'fr' => 'Bienvenue!' },
                   welcome_tagline_translations: { 'en' => 'How can we help?', 'fr' => 'Comment pouvons-nous aider?' })
  end

  it 'returns the correct locale-based welcome title' do
    expect(widget.welcome_title_for('en')).to eq('Welcome!')
    expect(widget.welcome_title_for('fr')).to eq('Bienvenue!')
    expect(widget.welcome_title_for('es')).to eq('Welcome!') # fallback
  end
end
