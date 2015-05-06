import React from 'react/addons'
import LocationList from '../app/components/profile/location_list'
const { TestUtils } = React.addons

describe('<LocationList />', function () {
  it('add a keyword to the list', () => {
    var instance = TestUtils.renderIntoDocument(<LocationList />)
    var list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')
    expect(list).to.be.empty

    var streetInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'location-list__street-input')
    var zipInput = TestUtils.findRenderedDOMComponentWithClass(instance, 'location-list__zip-input')
    var button = TestUtils.findRenderedDOMComponentWithTag(instance, 'button')

    var zip = '84601'
    TestUtils.Simulate.change(zipInput, {target: {value: zip}})
    var street = '100 W 100 N' 
    TestUtils.Simulate.change(streetInput, {target: {value: street}})
    TestUtils.Simulate.click(button)

    list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')
    expect(list).to.not.be.empty
    var location = instance.state.locations[0]
    expect(location.zip).to.equal(zip)
    expect(location.street).to.equal(street)
  })
})
