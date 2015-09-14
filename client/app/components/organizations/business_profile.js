import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import crypto from 'crypto'
import AvatarEditor from 'react-avatar-editor'
import mui from 'material-ui'

import {AppBar, FlatButton, Card, CardHeader, SelectField, CardTitle, TextField, RaisedButton, Slider} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState() {
    return {
      descriptionCounter: 150,
      description: null,
      beginDate: null,
      endDate: null,
      category: null,
      name: null,
      logoURL: null,
      cropperOpen: false,
      img: null,
      croppedImg: "/img/grayicon.png",
      zoom: 1.2,
      imageType: null,
      buttonDisabled: true
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentWillMount(){
    var descriptionCharactersLeft, purposeCharactersLeft
    if(this.props.organization.description){
      this.setState({
        descriptionCounter: 150 - this.props.organization.description.length,
        beginDate: this.props.organization.beginDate,
        endDate: this.props.organization.endDate,
        category: this.props.organization.category,
        description: this.props.organization.description,
        name: this.props.organization.name,
        logoURL: this.props.organization.logoURL
      })
    }
    else{
      this.setState({
        descriptionCounter: 150,
        beginDate: this.props.organization.beginDate,
        endDate: this.props.organization.endDate,
        category: this.props.organization.category,
        description: this.props.organization.description,
        name: this.props.organization.name,
        logoURL: this.props.organization.logoURL
      })
    }
  },

  saveProfile(){

    var name = this.state.name
    var category = this.state.category
    var description = this.state.description
    var beginDate = this.state.beginDate
    var endDate = this.state.endDate
    var logoURL = this.state.logoURL

    var organization = this.props.organization
    organization.name = name
    organization.category = category
    organization.description = description
    organization.logoURL = logoURL
    organization.beginDate = beginDate
    organization.endDate = endDate

    this.props.updateOrganization(this.props.organization)
    this.setState({buttonDisabled: true})
  },

  nameChange(e){
    this.setState({name: e.target.value, buttonDisabled: false})
  },

  descriptionChange(e){
    
    if ((150 - e.target.value.length) > 20) {
      this.setState({buttonDisabled: false, descriptionCounter: 150 - e.target.textLength, description: e.target.value, descriptionCounterColor: 'green'})
    } else if ((150 - e.target.value.length) >= 0 && (150 - e.target.textLength) <= 20){
      this.setState({buttonDisabled: false, descriptionCounter: 150 - e.target.textLength, description: e.target.value, descriptionCounterColor: 'orange'}) 
    } else {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({descriptionCounter: 'only 150 characters', descriptionCounterColor: 'red'}) 
    }
    
  },

  categoryChange(e) {
    
    this.setState({buttonDisabled: false, category: e.target.value})
  },

  getActivePeriod(){
    var date = new Date()
    var thisMonth = date.getMonth()
    var thisYear = date.getFullYear()
    var nextYear = thisYear + 1


    var beginDate1, beginDate2, beginDate1Text, beginDate2Text, endDate1Text, endDate2Text
    
    if(thisMonth < 3){
      beginDate1 = new Date(thisYear, 3)
      beginDate2 = new Date(thisYear, 6)
    }
    else if(thisMonth < 6){
      beginDate1 = new Date(thisYear, 6)
      beginDate2 = new Date(thisYear, 9)
    }
    else if(thisMonth < 9){
      beginDate1 = new Date(thisYear, 9)
      beginDate2 = new Date(nextYear, 0)
    }
    else {
      beginDate1 = new Date(thisYear, 0)
      beginDate2 = new Date(nextYear, 3)
    }

    var activePeriod = {
      beginDate1,
      beginDate2,
    }

    return activePeriod
  },

  changeDates(e){
    var beginDate = new Date(parseInt(e.target.value))
    var endDate = new Date(beginDate.getFullYear()+2, beginDate.getMonth())
    endDate = endDate.toDateString()
    this.setState({buttonDisabled: false, beginDate: beginDate.toDateString(), endDate})
    
  },

  handleFileChange (dataURI) {
    this.setState({
      img: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: true
    })
  },

  handleCrop (dataURI) {

    var imageData = this.refs.cropper.getImage().replace(/^data:image\/(png|jpg);base64,/, "")
    var imageBlob = this.b64toBlob(imageData, this.state.imageType)

    var s3Policy = { "expiration": "2020-12-01T12:00:00.000Z",
            "conditions": [
            {"bucket": 'karmakard'},
            ["starts-with", "$key", ""],                    
            ["starts-with", "$Content-Type", ""],
            ["content-length-range", 0, 524288000]
            ]
          };

    // stringify and encode the policy
  var stringPolicy = JSON.stringify(s3Policy);
  var base64Policy = Buffer(stringPolicy, "utf-8").toString("base64");

  // sign the base64 encoded policy
  var signature = crypto.createHmac("sha1", process.env.AWS_SECRET_KEY_ID)
    .update(new Buffer(base64Policy, "utf-8")).digest("base64");

    var xhr = new XMLHttpRequest()
    var fd = new FormData()
    var key = 'uploads/' + this.props.organization.id + '_' + Date.now() + '.png'

    // Populate the Post paramters.
    fd.append('key', key);
    fd.append('AWSAccessKeyId', 'AKIAJPJSSDYIMIBTAXSA');
    fd.append('policy', base64Policy)
    fd.append('signature',signature)
    fd.append('Content-Type', this.state.imageType)
    // This file object is retrieved from a file input.
    fd.append('file', imageBlob);

    xhr.open('POST', 'https://karmakard.s3.amazonaws.com', true);
    xhr.send(fd)

    xhr.upload.addEventListener('progress', function(e) {
      if (firstProgressEvent) {
        _this.total += e.total;
      }
      firstProgressEvent = false;
      _this.loaded += (e.loaded - lastBytesLoaded);
      _this.onProgress(_this.loaded / _this.total);
    }, false);

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4)  { return; }
      var uploadedImageURL = 'https://karmakard.s3.amazonaws.com/' + key
      
      this.setState({
        buttonDisabled: false,
        cropperOpen: false,
        img: null,
        croppedImg:uploadedImageURL,
        logoURL: uploadedImageURL
      })
    }.bind(this)
  },

  b64toBlob (b64Data, contentType, sliceSize) {
    contentType = contentType || ''
    sliceSize = sliceSize || 512

    var byteCharacters = atob(b64Data)
    var byteArrays = []

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize)

      var byteNumbers = new Array(slice.length)
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      var byteArray = new Uint8Array(byteNumbers)

      byteArrays.push(byteArray)
    }

    var blob = new Blob(byteArrays, {type: contentType})
    return blob
  },

  handleRequestHide () {
    this.setState({
      cropperOpen: false
    })
  },

  handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    this.setState({imageType: file.type})

    if (!file) return;
    reader.onload = function(img) {
      React.findDOMNode(this.refs.in).value = '';
      this.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  zoom (e, value) {
    this.setState({zoom: value})
  },

  render() {
    
  
    var avatarCropper
    if(this.state.cropperOpen) {
      avatarCropper = (
        <Card style={{padding: '2%', margin: '0 auto'}}>
          <AvatarEditor
            style={{width:'100%', height:'100%'}}
            ref='cropper'
            image={this.state.img}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA 
            scale={this.state.zoom} />
          <Slider name="slider1" onChange={this.zoom} defaultValue={1.2} max={2} min={1} />
          <RaisedButton className='raisedButton' primary={true} fullWidth={true} label = 'Crop Image' onClick={this.handleCrop} />
        </Card>
      )
    } else {
      var logoURL = this.props.organization.logoURL ? this.props.organization.logoURL : this.state.croppedImg
      avatarCropper = (
        <Card style={{margin:'0 auto'}} className="avatar-photo">
          <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
          <div className="avatar-edit">
            <span>Logo Upload</span>
            <i className="fa fa-camera"></i>
          </div>
          <img src={logoURL} />
        </Card>
      )
    }

    var beginDateOptions = this.getActivePeriod()
    var beginDate = new Date(this.state.beginDate)
    var endDate = new Date(this.state.endDate)
    var endDateText
    if (this.state.endDate){endDateText = this.state.endDate}
    else if (endDate) {endDateText = endDate.toDateString()}
    else {endDateText = "End Date"}
    
    var startDate = [
      {value:beginDateOptions.beginDate1.getTime(), text:beginDateOptions.beginDate1.toDateString()},
      {value:beginDateOptions.beginDate2.getTime(), text:beginDateOptions.beginDate2.toDateString()}
      ]

    var categoryOptions = [
      {value:"Dining", text:"Dining"},
      {value:"Entertainment", text:"Entertainment"},
      {value:"Health & Fitness", text:"Health & Fitness"},
      {value:"Home & Garden", text:"Home & Garden"},
      {value:"Professional", text:"Professional"},
      {value:"Services", text:"Services"},
      {value:"Shopping", text:"Shopping"}
    ]

    return (
      <div>
          {avatarCropper}

          <SelectField
            value={beginDate.getTime()}
            hintText="Beginning Date"
            onChange={this.changeDates}
            floatingLabelText="Contract Start Date"
            valueMember="value"
            displayMember="text"
            fullWidth={true}
            menuItems={startDate} 
            disabled={this.props.editDisabled}/>

          <TextField
            disabled={true}
            value={this.state.endDate}
            fullWidth={true}
            floatingLabelText="Contract End Date" />

          <TextField
            hintText="Organization Name"
            floatingLabelText="Business Name"
            fullWidth={true}
            onChange={this.nameChange} 
            defaultValue={this.props.organization.name}
            disabled={this.props.editDisabled}/>

          <SelectField
            value={this.state.category}
            hintText="Category"
            onChange={this.categoryChange}
            floatingLabelText="Contract Start Date"
            valueMember="value"
            displayMember="text"
            fullWidth={true}
            menuItems={categoryOptions} 
            disabled={this.props.editDisabled}/>
          
          <TextField
            hintText="Write business description here."
            floatingLabelText="Business Description"
            fullWidth={true}
            onChange={this.descriptionChange} 
            value= {this.state.description}
            disabled={this.props.editDisabled}
            multiLine={true}
            errorText={this.state.descriptionCounter}
            errorStyle={{color:this.state.descriptionCounterColor}}/>

            <RaisedButton className='raisedButton' primary={true} 
                disabled={this.state.buttonDisabled}
                fullWidth={true} 
                onClick={this.saveProfile} 
                label="Save Profile" 
                style={{
                  margin: '15px 0 0 0'
                }}/>
      </div>
    )
  }
})
