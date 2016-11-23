'use strict'

import React from 'react';
import {
StyleSheet,
View,
Text,
TouchableOpacity
} from 'react-native';

import {LeftIcon} from './iconContainers';


const propTypes = {
containerProps: React.PropTypes.shape({
 onPress: React.PropTypes.func.isRequired,
style: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]).isRequired,
}),
leftIconProps: React.PropTypes.shape({
localIcon: React.PropTypes.bool.isRequired
}),
titleProps: React.PropTypes.shape({
text: React.PropTypes.string.isRequired
}),
detailProps: React.PropTypes.shape({
text: React.PropTypes.string.isRequired
}),
rightIconProps: React.PropTypes.shape({
localIcon: React.PropTypes.bool.isRequired,
})
};

export default class Button extends React.Component {


restructureContainerProps = (props) => {
 let {style,...rest} = props;
 let styles = StyleSheet.flatten(style);
 let returnValue = {};
 returnValue.style = [styles,{justifyContent:'center'}];
 for (var i in rest) {
   returnValue[i] = rest[i]
 }
 return returnValue
}

render(){
 return(
   <TouchableOpacity {...this.restructureContainerProps(this.props.containerProps)}>
     <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
       <LeftIcon {...this.props.leftIconProps} />
       <Title {...this.props.titleProps}/>
       <Title {...this.props.detailProps}/>
       <LeftIcon {...this.props.rightIconProps}/>
     </View>
   </TouchableOpacity>
 )
};

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


Button.propTypes = propTypes
