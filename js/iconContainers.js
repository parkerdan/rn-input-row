'use strict'

import React from 'react';
import {
StyleSheet,
View,
Animated,
Image,
Easing
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
iconContainer: {
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'row',
}
});

class LeftIcon extends React.Component {
render(){
  if (Object.keys(this.props).length > 0) {
    if (this.props.localIcon) {
      return <View style={styles.iconContainer}><Image {...this.props}/></View>
      } else {
        return <View style={styles.iconContainer}><Icon {...this.props}/></View>
    }
  } else {
    return null
  }
};
};


class RightIcon extends React.Component {

constructor(){
  super();
  this.state = {
    dotOne: new Animated.Value(.5),
    dotTwo: new Animated.Value(.5),
    dotThree: new Animated.Value(.5),
  }
};

componentWillUnmount(){
  this.animateDots = null;
  this.reverseAnimate = null;
  this.state.dotOne.stopAnimation();
  this.state.dotTwo.stopAnimation();
  this.state.dotThree.stopAnimation();
};


animateDots = () => {
  if (this.props.isFocused && this.props.renderActivity) {
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

reverseAnimate = () => {
  if (this.props.isFocused && this.props.renderActivity) {
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

render(){
  let {activityIconProps, isFocused, localIcon, renderActivity, renderIcon,...rest} = this.props;
  if (renderActivity && isFocused) {
    return this.activityDots(activityIconProps)
  } else if (renderIcon && localIcon) {
    return <View style={styles.iconContainer}><Image {...rest}/></View>
  } else if (renderIcon) {
    return <View style={styles.iconContainer}><Icon {...rest}/></View>
  } else if (Object.keys(this.props).length > 1) {
    return <View style={styles.iconContainer}/>
  } else {
    return null
  }
};

activityDots(activityIconProps){
  return(
    <View style={styles.iconContainer}>
      <Animated.View
        onLayout={this.animateDots}
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
        <Icon {...activityIconProps} />
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
        <Icon {...activityIconProps} />
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
        <Icon {...activityIconProps} />
      </Animated.View>

    </View>
  )
}
}
export {RightIcon,LeftIcon}
