import React from 'react/addons'
import KeywordList from '../app/components/profile/keyword_list'
const { TestUtils } = React.addons

describe('<KeywordList />', function () {
  it('add a keyword to the list', () => {
    var instance = TestUtils.renderIntoDocument(<KeywordList />)
    var list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')
    expect(list).to.be.empty

    var input = TestUtils.findRenderedDOMComponentWithTag(instance, 'input')
    var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button')

    var myKeyword = 'my tag'
    TestUtils.Simulate.change(input, {target: {value: myKeyword}})
    TestUtils.Simulate.click(button)

    list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')
    expect(list).to.not.be.empty

    expect(instance.state.keywords[0]).to.equal(myKeyword)
  })
})

