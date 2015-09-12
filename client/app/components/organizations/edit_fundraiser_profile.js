import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { flux } from '../../main'
import crypto from 'crypto'
import AvatarEditor from 'react-avatar-editor'
import { Modal, Button } from "react-bootstrap"
import mui from 'material-ui'
import {AppBar, FlatButton, Card, CardTitle, TextField, RaisedButton, Slider} from 'material-ui'

var ThemeManager = new mui.Styles.ThemeManager()

export default React.createClass({
  getInitialState() {
    return {
      description: null,
      name: null,
      purpose: null,
      logoURL: null,
      descriptionCounter: 150,
      purposeCounter: 150,
      cropperOpen: false,
      img: null,
      croppedImg: "/img/grayicon.png",
      zoom: 1.2,
      imageType: null,
      buttonDisabled: true,
      nameErrorMessage: null
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
    if(this.props.organization.description || this.props.organization.purpose){
      this.setState({
        descriptionCounter: 150 - this.props.organization.description.length,
        purposeCounter: 150 - this.props.organization.purpose.length,
        purpose: this.props.organization.purpose,
        description: this.props.organization.description,
        name: this.props.organization.name,
        logoURL: this.props.organization.logoURL
      })
    }
    else{
      this.setState({
        descriptionCounter: 150,
        purposeCounter: 150,
        purpose: this.props.organization.purpose,
        description: this.props.organization.description,
        name: this.props.organization.name,
        logoURL: this.props.organization.logoURL
      })
    }
  },

  nameChange (e) {
    var sameNameOrganizations = this.props.organizations.filter(organization => 
      organization.name.toLowerCase().replace(/ /g,'') === e.target.value.toLowerCase().replace(/ /g,''))

    if (sameNameOrganizations.length > 0) {
      this.setState({nameErrorMessage: 'Must have unique name', buttonDisabled: true})
      return
    }
    this.setState({nameErrorMessage: null, name: e.target.value, buttonDisabled: false})
  },

  saveProfile (){

    var name = this.state.name ? this.state.name : this.props.organization.name
    var description = this.state.description ? this.state.description : this.props.organization.description
    var purpose = this.state.purpose ? this.state.purpose : this.props.organization.purpose
    var logoURL = this.state.logoURL ? this.state.logoURL : this.props.organization.logoURL


    var organization = this.props.organization
    organization.name = name
    organization.description = description
    organization.purpose = purpose
    organization.logoURL = logoURL

    this.props.updateOrganization(organization)
    this.setState({buttonDisabled: true})
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

  purposeChange(e){
    if ((150 - e.target.value.length) > 20) {
      this.setState({buttonDisabled: false, purposeCounter: 150 - e.target.textLength, purpose: e.target.value, purposeCounterColor: 'green'})
    } else if ((150 - e.target.value.length) >= 0 && (150 - e.target.textLength) <= 20){
      this.setState({buttonDisabled: false, purposeCounter: 150 - e.target.textLength, purpose: e.target.value, purposeCounterColor: 'orange'}) 
    } else {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1)
      this.setState({purposeCounter: 'only 150 characters', purposeCounterColor: 'red'}) 
    }
    
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
    console.log(imageBlob)

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
  console.log(signature)

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
      console.log(e)
      if (firstProgressEvent) {
        _this.total += e.total;
      }
      firstProgressEvent = false;
      _this.loaded += (e.loaded - lastBytesLoaded);
      _this.onProgress(_this.loaded / _this.total);
    }, false);

    xhr.onreadystatechange = function() {
      console.log('here')
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
    console.log(e.target.files)
    var reader = new FileReader();
    var file = e.target.files[0];
    this.setState({imageType: file.type})

    if (!file) return;
    console.log(file)
    reader.onload = function(img) {
      console.log(img.target.result)
      React.findDOMNode(this.refs.in).value = '';
      this.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  zoom (e, value) {
    this.setState({zoom: value})
  },

  render() {
  injectTapEventPlugin()
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
          <RaisedButton fullWidth={true} label = 'Crop Image' onClick={this.handleCrop} />
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

    return (
      <div>
          {avatarCropper}

          <TextField
            ref="name"
            onChange={this.nameChange}
            defaultValue={this.props.organization.name}
            hintText="XYZ Company"
            disabled={this.props.editDisabled}
            fullWidth={true}
            errorText={this.state.nameErrorMessage}
            floatingLabelText="Fundraiser Name" />
        
          <TextField
            hintText="Write fundraiser description here."
            floatingLabelText="Fundraiser Description"
            fullWidth={true}
            onChange={this.descriptionChange} 
            value= {this.state.description}
            disabled={this.props.editDisabled}
            multiLine={true}
            errorText={this.state.descriptionCounter}
            errorStyle={{color:this.state.descriptionCounterColor}}/>

          <TextField
            hintText="Write fundraiser purpose here."
            floatingLabelText="Fundraiser Purpose"
            fullWidth={true}
            onChange={this.purposeChange} 
            value= {this.state.purpose}
            disabled={this.props.editDisabled}
            multiLine={true}
            errorText={this.state.purposeCounter}
            errorStyle={{color:this.state.purposeCounterColor}}/>

          <RaisedButton 
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