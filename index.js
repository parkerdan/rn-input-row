'use strict';
import React, { Component, PropTypes } from 'react';

import {
Text,
View,
Animated,
TextInput,
Easing,
TouchableWithoutFeedback,
TouchableOpacity,
Image
} from 'react-native';

import {email,zip,currency} from './validate';

import Icon from 'react-native-vector-icons/FontAwesome';

const propTypes = {

asButton:React.PropTypes.bool,
onPress:React.PropTypes.func,

renderRightIcon: React.PropTypes.bool,
rightIconSize: React.PropTypes.number,
rightContainerFlex: React.PropTypes.number,

validIconName: React.PropTypes.string,
validIconColor: React.PropTypes.string,
validIconSource: React.PropTypes.number,
validIconStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object]),

invalidIconName: React.PropTypes.string,
invalidIconColor: React.PropTypes.string,

activeIconName: React.PropTypes.string,
activeIconColor: React.PropTypes.string,
activeIconSize: React.PropTypes.number,

renderLeftIcon: React.PropTypes.bool,
leftIconSize: React.PropTypes.number,
leftIconName: React.PropTypes.string,
leftIconColor: React.PropTypes.string,
leftContainerFlex: React.PropTypes.number,
leftIconSource: React.PropTypes.number,
leftIconStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object]),

renderTitle: React.PropTypes.bool,
title: React.PropTypes.string,
titleContainerFlex: React.PropTypes.number,
titleTextStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object]),

renderTextInput: React.PropTypes.bool.isRequired,
textContainerFlex: React.PropTypes.number,
editable: React.PropTypes.bool,
text: React.PropTypes.string,
textInputStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object]),
onChangeText: React.PropTypes.func,

height: React.PropTypes.number.isRequired,
containerStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object]),

validate: React.PropTypes.oneOfType([React.PropTypes.func,React.PropTypes.oneOf(['email','zip','currency'])]),
isvalid: React.PropTypes.func,

errorMessage: React.PropTypes.string,
errorOffset: React.PropTypes.number,
errorTextStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object]),

onFocus: React.PropTypes.func,
onLayout: React.PropTypes.func,

// placeholder
// placeholderTextColor
// secureTextEntry
// keyboardType
// underlineColorAndroid
};

export default class InputRow extends Component {

constructor(props){
super(props);
this.animateDots = this.animateDots.bind(this);
this.reverseAnimate = this.reverseAnimate.bind(this);
this.validate = this.validate.bind(this);
this.animateError = this.animateError.bind(this);
this.unAnimateError = this.unAnimateError.bind(this);

this.state = {
  dotOne: new Animated.Value(.5),
  dotTwo: new Animated.Value(.5),
  dotThree: new Animated.Value(.5),
  isValid: true,
  isFocused: false,
  text:'',
  validate:false,
  email:email,
  zip:zip,
  currency:currency,
  renderErrorMessage:false,
  initialHeight: props.height,
  newHeight: props.height,
  height: (props.asButton === true) ? props.height:new Animated.Value(props.height),
  errorMessage: props.errorMessage || 'There seems to be an error here',
  errorOffset: props.errorOffset || 10
};
};

componentWillMount(){
var validate = false;
if (this.props.validate) {
  if (typeof this.props.validate === 'function') {
    validate = this.props.validate;
  } else {
    validate = this.state[this.props.validate]
  }
}

this.setState({validate:validate})

};

componentWillUnmount(){
this.animateDots = null;
this.reverseAnimate = null;
};

animateDots(){
if (this.state.isFocused) {
  Animated.stagger(100,[
    Animated.timing(this.state.dotOne,{
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }),
    Animated.timing(this.state.dotTwo,{
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }),
    Animated.timing(this.state.dotThree,{
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }),

  ]).start(this.reverseAnimate)
}
};

validate(){
var valid = this.state.isValid;

if (this.state.validate) {
  valid = this.state.validate(this.state.text)
}

if (this.props.isValid) {
  this.props.isValid(valid)
}

this.setState({
  isFocused:false,
  isValid:valid,
  dotOne: new Animated.Value(.5),
  dotTwo: new Animated.Value(.5),
  dotThree: new Animated.Value(.5),
});

if (this.state.text !== '') {
  if (!valid && this.state.initialHeight === this.state.initialHeight) {
    this.animateError()
  }

}

if (valid && this.state.height !== this.state.initialHeight) {
  this.unAnimateError()
}

};

animateError(){
Animated.timing(this.state.height,{
  toValue: this.state.initialHeight + this.state.errorOffset,
  duration: 200,
  easing: Easing.linear
}).start( () => this.setState({renderErrorMessage:true, newHeight: false}))
};

unAnimateError(){
this.setState({renderErrorMessage:false, newHeight:this.state.initialHeight})
Animated.timing(this.state.height,{
  toValue: this.state.initialHeight,
  duration: 200,
  easing: Easing.linear
}).start()
};

reverseAnimate(){
if (this.state.isFocused) {
  Animated.stagger(100,[
    Animated.timing(this.state.dotOne,{
      toValue: .5,
      duration: 200,
      easing: Easing.linear
    }),
    Animated.timing(this.state.dotTwo,{
      toValue: .5,
      duration: 200,
      easing: Easing.linear
    }),
    Animated.timing(this.state.dotThree,{
      toValue: .5,
      duration: 200,
      easing: Easing.linear
    }),

  ]).start(this.animateDots)
}
};

renderInputDots(){
return(
  <View style={{
    flex:this.props.rightContainerFlex || 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }}>
    <Animated.View
      onLayout={
        () => this.animateDots()
      }
      style={{
        marginHorizontal:1,
        transform: [{
          scale: this.state.dotOne
        }],
        opacity: this.state.dotOne.interpolate({
          inputRange: [.5,1],
          outputRange: [.2,1]
        })
      }}>
      <Icon
        size={this.props.activeIconSize || 6}
        color={this.props.activeIconColor || 'black'}
        name={this.props.activeIconName || 'circle'}
      />
    </Animated.View>

    <Animated.View style={{
      marginHorizontal:1,
      transform: [{
        scale: this.state.dotTwo
      }],
      opacity: this.state.dotTwo.interpolate({
        inputRange: [.5,1],
        outputRange: [.2,1]
      })
    }}>
      <Icon
        size={this.props.activeIconSize || 6}
        color={this.props.activeIconColor || 'black'}
        name={this.props.activeIconName || 'circle'}
      />
    </Animated.View>

    <Animated.View style={{
      marginHorizontal:1,
      transform: [{
        scale: this.state.dotThree
      }],
      opacity: this.state.dotThree.interpolate({
        inputRange: [.5,1],
        outputRange: [.2,1]
      })
    }}>
      <Icon
        size={this.props.activeIconSize || 6}
        color={this.props.activeIconColor || 'black'}
        name={this.props.activeIconName || 'circle'}
      />
    </Animated.View>

  </View>
)
};

renderValidIcon(){
 if (this.props.validIconName) {
   return(
     <Icon
       name={this.props.validIconName || 'check'}
       size={this.props.rightIconSize || 20}
       color={this.props.validIconColor || 'green'}
     />
   )
 } else if (this.props.validIconSource) {
   return(
     <Image
       resizeMode={'contain'}
       source={this.props.validIconSource}
       style={this.props.validIconStyle}
     />
   )
 }
};

renderRightIcon(){
if (this.props.renderRightIcon) {
  if (this.props.asButton) {
    return(
      <View style={{
        flex:this.props.rightContainerFlex || 1,
        justifyContent:'center',
        alignItems:'center',
      }}>
        {this.renderValidIcon()}
      </View>
    )
  } else if (this.state.isFocused) {
    return this.renderInputDots()
  } else if (this.state.text === '') {
    return (
      <View style={{
        flex:this.props.rightContainerFlex || 1,
      }}/>
    )
  } else if (this.state.isValid) {
    return(
      <View style={{
        flex:this.props.rightContainerFlex || 1,
        justifyContent:'center',
        alignItems:'center',
      }}>
        <Icon
          name={this.props.validIconName || 'check'}
          size={this.props.rightIconSize || 20}
          color={this.props.validIconColor || 'green'}
        />
      </View>
    )
  } else {
    return (
      <View style={{
        flex:this.props.rightContainerFlex || 1,
        justifyContent:'center',
        alignItems:'center'
      }}>
        <Icon
          name={this.props.invalidIconName || 'close'}
          size={this.props.rightIconSize || 20}
          color={this.props.invalidIconColor || 'red'}
        />
      </View>
    )
  }
}
};

leftIcon(){
 if (this.props.leftIconName) {
   return(
     <Icon
       name={this.props.leftIconName}
       size={this.props.leftIconSize || 20}
       color={this.props.leftIconColor}
     />
   )
 } else if (this.props.leftIconSource) {
   return(
     <Image
       resizeMode={'contain'}
       source={this.props.leftIconSource}
       style={this.props.leftIconStyle}
     />
   )
 }
};

renderLeftIcon(){
if (this.props.asButton && this.props.renderLeftIcon) {
  return(
    <View style={{
      flex:this.props.leftContainerFlex || 1,
    }}>
      <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }}>
        {this.leftIcon()}
      </View>
    </View>
  )
}
if (this.props.renderLeftIcon) {
  return(
    <View style={{
      flex:this.props.leftContainerFlex || 1,
    }}>
      <TouchableWithoutFeedback
        disabled={(!this.props.renderTextInput && this.props.editable) ? true:false}
        onPress={
          () => {
            if (this.props.renderTextInput) {
              this.textInput.focus()
            }
          }
        }>
        <View style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Icon
            name={this.props.leftIconName}
            size={this.props.leftIconSize || 20}
            color={this.props.leftIconColor}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
}

renderTitle(){
if (this.props.asButton && this.props.renderTitle) {
  return(
    <View
      style={{
        flex:this.props.titleContainerFlex || 2,
      }}>
      <View style={{
        justifyContent:'center',
        flex:1
      }}>
        <Text
          numberOfLines={1}
          style={[{
            fontSize:14,
          },this.props.titleTextStyle]}>
          {this.props.title}
        </Text>
      </View>
    </View>
  )
}
else if (this.props.renderTitle) {
  return(
    <View
      style={{
        flex:this.props.titleContainerFlex || 2,
      }}>
      <TouchableWithoutFeedback
        disabled={(!this.props.renderTextInput && this.props.editable) ? true:false}
        onPress={
          () => {
            if (this.props.renderTextInput) {
              this.textInput.focus()
            }
          }
        }>
        <View style={{
          justifyContent:'center',
          flex:1
        }}>
          <Text
            numberOfLines={1}
            style={[{
              fontSize:14,
            },this.props.titleTextStyle]}>
            {this.props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
};

renderTextInput(){
if (this.props.renderTextInput) {
  return(
    <TextInput
      ref={(ref) => this.textInput = ref}
      placeholder={this.props.placeholder}
      placeholderTextColor={this.props.placeholderTextColor}
      secureTextEntry={this.props.secureTextEntry}
      keyboardType={this.props.keyboardType}
      underlineColorAndroid={this.props.underlineColorAndroid}
      value={this.state.text}
      editable={(this.props.editable === false || this.props.asButton) ? false:true}
      onFocus={
        () => {
          this.setState({isFocused:true});
          if (this.props.onFocus) {
            this.props.onFocus()
          }
        }
      }
      onChangeText={
        (text) => {
          this.setState({text:text});
          this.props.onChangeText(text);
        }
      }
      onBlur={this.validate}
      style={[{
        flex:this.props.textContainerFlex || 3,
        justifyContent:'center',
        fontSize:14,
      },this.props.textInputStyle]}>

    </TextInput>
  )
}
};

renderErrorMessage(){
if (this.state.renderErrorMessage) {
  return (
    <View style={{
      position: 'absolute',
      bottom:1,
      paddingLeft:10
    }}>
      <Text
        numberOfLines={1}
        style={[{
          color:'red',
          fontSize:10
        },this.props.errorTextStyle]}>{this.state.errorMessage}</Text>
    </View>
  )
}
};

render(){
if (this.props.asButton) {
  return(
    <TouchableOpacity
      onPress={this.props.onPress}
      onLayout={
        (e) => {
          if (this.props.onLayout) {
            this.props.onLayout(e)
          }
        }
      }
      style={[{
        height: this.state.height,
        justifyContent:'center'
      },this.props.containerStyle]}>
      <View style={{
        overflow:'hidden',
        flexDirection: 'row',
      }}>

        {this.renderLeftIcon()}
        {this.renderTitle()}
        {this.renderTextInput()}
        {this.renderRightIcon()}
      </View>
    </TouchableOpacity>
  )
} else {
  return(
    <Animated.View
      onLayout={
        (e) => {
          if (this.props.onLayout) {
            this.props.onLayout(e)
          }
        }
      }
      style={[{
        height: this.state.height,
        justifyContent:'center'
      },this.props.containerStyle]}>
      <View style={{
        overflow:'hidden',
        flexDirection: 'row',
      }}>

        {this.renderLeftIcon()}
        {this.renderTitle()}
        {this.renderTextInput()}
        {this.renderRightIcon()}
      </View>
      {this.renderErrorMessage()}
    </Animated.View>

  )

}
};
}

InputRow.propTypes = propTypes;
