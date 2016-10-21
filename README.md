# rn-input-row

![Example One](./inputrow.gif "Input Rows")


- This is a HIGHLY customizable ANIMATED input row for React-Native.

- Good for single line form inputs.

##### Requires react-native-vector-icons/FontAwesome
###### All Icon Names are the Font Awesome available options

- There are are built in default values, but you can change just about anything.

```js
npm install rn-input-row --save
npm install react-native-vector-icons --save
react-native link
```

Two required props `height` and `renderTextInput`, but they won't take you far on their own.

The input row is broken into 4 containers.
You have to declare what containers to render.

```js
.
  renderLeftIcon={true} // has a flex of 1 by default
  renderTitle={true}  //  has a flex of 2 by default
  renderTextInput={true} // has a flex of 3 by default.   Make sure to include onChangeText function with this!!
  renderRightIcon={true} // has a flex of 1 by default
```

then customize them

```js
.
  leftIconName={'envelope'}
  leftIconColor={'rgb(229, 179, 60)'}
```



```js
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import InputRow from 'rn-input-row';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';


export default class Example extends Component {

  constructor(){
    super();
    this.state={

    }
  };

  render(){
    return(
      <View style={{paddingTop:50}}>
        <InputRow
          height={40}
          renderLeftIcon={true}
          renderTitle={true}
          renderTextInput={true}
          renderRightIcon={true}
          title={'Email'}
          validate={'email'}
          errorMessage={'Please enter an email address'}
          leftIconName={'envelope'}
          leftIconColor={'rgb(229, 179, 60)'}
          onChangeText={
            (text) => console.log(text)
          }
          isValid={
            (bool) => console.log(bool)
          }
          containerStyle={{
            borderTopWidth:1,
            borderBottomWidth:1,
          }}
        />
        <InputRow
          height={40}
          renderLeftIcon={true}
          renderTitle={true}
          renderTextInput={true}
          renderRightIcon={true}
          title={'User Name'}
          validate={
            (text) => {
              if (text.length >=8) {
                return true
              } else {
                return false
              }
            }
          }
          errorMessage={'User Name must be 8 characters'}
          leftIconName={'users'}
          leftIconColor={'blue'}
          onChangeText={
            (text) => console.log(text)
          }
          isValid={
            (bool) => console.log(bool)
          }
          containerStyle={{
            borderBottomWidth:1,
          }}
        />


        // Here is a "trick" I use to force the blur to call the validations
        // I just dismissKeyboard
        // I like calling the validation onBlur because it shows the activity icons when focused

        <TouchableOpacity
          onPress={
            () => dismissKeyboard()
          }
          style={{
            marginTop:20,
            marginHorizontal: 100,
            borderRadius:10,
            backgroundColor: 'magenta',
            alignItems:'center',
            justifyContent:'center',
            padding:20
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>

      </View>
    )
  };

};

```

##### You can pass in validations.
- Validations must be a function that `returns` `true` or `false` or one of the validations I defined

```js
  validate={
    (text) => {
      if (text.length > 8) {
        return true
      } else {
        return false
      }
    }
  }
```
- Right now I have `email`, `zip`, and `currency` as options.  I will add more If I need more for my projects

```js
  validate={'email'}
```

- all possible props

```js
height={50}
containerStyle={{
  margin:5,
  borderRadius:5,
  borderWidth:1
}}

renderRightIcon={true}
rightIconSize={20}
//you can change the flex of the containers for enhanced layouts
rightContainerFlex={1}
validIconName={'check'}
validIconColor={'green'}
invalidIconName={'close'}
invalidIconColor={'red'}
activeIconName={'circle'}
activeIconColor={'black'}
activeIconSize={6}

renderLeftIcon={true}
leftIconSize={20}
leftIconName={'envelope'}
leftIconColor={'rgb(229, 179, 60)'}
leftContainerFlex={1}

renderTitle={true}
title={'Email'}
titleContainerFlex={2}
titleTextStyle={{
  fontSize:20,
  textAlign:'left'
}}

renderTextInput={true}
textContainerFlex={2}
editable={true}
text={''}
textInputStyle={{
  fontSize:20
}}
onChangeText={
  (text) => console.log(text)
}


validate={'email'}
// function called when Text Input in blurred
isvalid={
  (bool) => console.log(bool)
}
errorMessage={'Please enter an email address'}
// the height the container will grow when the error message is shown
errorOffset={10}
errorTextStyle={{
  fontSize:10,
  color:'red'
}}

onFocus={
  () => console.log('I am focused')
}

onLayout={
  (e) => console.log(e.nativeEvent.layout)
}

// can use this as a button, TextInput is not editable if button is enabled
// you can set a value to TextInput with placeholder if button is enabled
// validIcon will be rendered as the right icon if you want a right icon
isButton={boolean}
onPress={
  () => console.log('You pressed button')
}


// *****  And this shit form TextInput as well
// placeholder
// placeholderTextColor
// secureTextEntry
// keyboardType
// underlineColorAndroid
```
