'use strict'

import React from 'react';
import {
StyleSheet,
View,
Text,
TextInput,
Animated,
Easing
} from 'react-native';

import {RightIcon,LeftIcon} from './iconContainers';


const propTypes = {
containerProps: React.PropTypes.shape({
 style: React.PropTypes.any.isRequired
}),
errorProps: React.PropTypes.shape({
 render: React.PropTypes.bool.isRequired,
}),
leftIconProps: React.PropTypes.shape({
 localIcon: React.PropTypes.bool.isRequired
}),
titleProps: React.PropTypes.shape({
 text: React.PropTypes.string.isRequired
}),
textInputProps: React.PropTypes.shape({
 style: React.PropTypes.any.isRequired
}),
rightIconProps: React.PropTypes.shape({
 renderActivity: React.PropTypes.bool.isRequired,
 renderIcon: React.PropTypes.bool.isRequired,
 localIcon: React.PropTypes.bool.isRequired,
})
};

export default class InputRow extends React.Component {

constructor(props){
  super(props);
  this.state = {
    renderError: false,
    isFocused: false,
    height: new Animated.Value(StyleSheet.flatten(props.containerProps.style).height)
  }
};

componentWillReceiveProps(nextProps){
  if (nextProps.errorProps && nextProps.errorProps.render) {
    if (nextProps.errorProps.render !==  this.state.renderError) {
      this.animateError()
    }
  }
  if (nextProps.errorProps && nextProps.errorProps.render === false) {
    if (this.state.renderError) {
      this.setState({renderError:false},this.reverseAnimate)
    }
  }
};

reverseAnimate = () => {
  if (typeof this.state.height === 'number') {
    let _this = this;
    setTimeout(() => {this.setState({height:this.state.height - 10})},100)
  } else {
    Animated.sequence([
      Animated.delay(100),
      Animated.timing(this.state.height,{
        toValue: this.state.height._startingValue,
        duration: 200,
        easing: Easing.linear
      })
    ]).start()
  }
}

animateError = () => {
  if (typeof this.state.height === 'number') {
    this.setState({renderError:true,height:this.state.height + 10});
  } else {
    Animated.timing(this.state.height,{
     toValue: this.state.height._startingValue + 10,
     duration: 200,
     easing: Easing.linear
   }).start( () => this.setState({renderError:true}) )
  }
};

onFocus = (cb) => {
  this.setState({isFocused:true},cb)
};

onBlur = (cb) => {
  this.setState({isFocused:false},cb)
};

focusTextInput = (cb) => {
  if (Object.keys(this.props.textInputProps).length > 0) {
    this.input.textInput.focus();
  }
  if (cb) {
    cb()
  }
};

restructureTitleProps = (props) => {
  if (props) {
    let {onPress,...rest} = props;
    let returnValue = {};
    returnValue.onPress = () => this.focusTextInput(onPress);
    for (var i in rest) {
      returnValue[i] = rest[i]
    }
    return returnValue
  }
};

restructureTextInputProps = (props) => {
  if (props) {
    let {onFocus,onBlur,...rest} = props;
    let returnValue = {};
    returnValue.onFocus = () => this.onFocus(onFocus);
    returnValue.onBlur = () => this.onBlur(onBlur);
    for (var i in rest) {
      returnValue[i] = rest[i]
    }
    return returnValue
  }
};

restructureContainerProps = (props) => {
  let {style,...rest} = props;
  let styles = StyleSheet.flatten(style);
  let returnValue = {};
  returnValue.style = [styles,{height:this.state.height,justifyContent:'center'}];
  for (var i in rest) {
    returnValue[i] = rest[i]
  }
  return returnValue
}

render(){
  return(
    <Animated.View {...this.restructureContainerProps(this.props.containerProps)}>
      <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
        <LeftIcon {...this.props.leftIconProps} />
        <Title {...this.restructureTitleProps(this.props.titleProps)}/>
        <Input ref={ (ref) => this.input = ref }
          {...this.restructureTextInputProps(this.props.textInputProps)}/>
        <RightIcon isFocused={this.state.isFocused} {...this.props.rightIconProps}/>
      </View>
      {this.renderError()}
    </Animated.View>
  )
};

renderError(){
  if (this.state.renderError) {
    return(
      <View style={{position:'absolute',bottom:2,left:0}}>
        <Text {...this.props.errorProps}>{this.props.errorProps.text}</Text>
      </View>
    )
  }
}
};


class Title extends React.Component {
render(){
  if (Object.keys(this.props).length > 0) {
    return <Text {...this.props}>{this.props.text}</Text>
  } else {
    return null
  }
}
}

class Input extends React.Component {
render(){
  if (Object.keys(this.props.length > 0)) {
    return <TextInput ref={(ref) => this.textInput = ref } {...this.props}/>
  } else {
    return null
  }
}
}


InputRow.propTypes = propTypes
