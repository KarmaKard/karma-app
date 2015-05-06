import React from 'react/addons'
import cheerio from 'cheerio'
import expect from 'expect'
import DealBuilder from './deal_builder.js'

describe('<DealBuilder />', function () {
  it('shows next and back buttons when registering', () => {
    var props = { isRegistration: true }
    var $ = cheerio.load(React.renderToString(<DealBuilder {...props} />))
    var buttons = $('.navbuttons__button')
    expect(buttons.length).toBe(2)
    expect(buttons.text()).toContain('Next')
    expect(buttons.text()).toContain('Back')
  })

  it('shows only a save button if not registering', () => {
    var props = { isRegistration: false }
    var $ = cheerio.load(React.renderToString(<DealBuilder {...props} />))
    var button = $('.navbuttons__button')
    expect(button.length).toBe(1)
    expect(button.text()).toContain('Save')
  })
})
