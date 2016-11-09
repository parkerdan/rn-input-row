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

### Props

| Prop  |  Type  |  Description  |
| ---   |  ---   |  ---          |
| renderLeftIcon | boolean **REQUIRED** | render the left icon |
| renderTitle | boolean **REQUIRED** | render the title |
| renderTextInput | boolean **REQUIRED** | render the text input |
| renderRightIcon | boolean **REQUIRED** | render the right icon |
|||
| height | number | height of the container |
| containerStyle | object | styles applied to the container |
| rightIconSize | number | size of the rightSide icon (default-20) |
| rightContainerFlex | number | flex of the right side icon container (default-1) |
| validIconName | string (FontAwesome Icon name) | what icon to render if valid input (default-check) |
| validIconColor | string | color of the valid icon (default-green) |
| validIconSource | require('../Folder/file.ext') | optionally supply your own icon as the valid icon |
| validIconStyle | object | styles applied to the icon you supply, only used with the above prop|
| invalidIconName |string (FontAwesome Icon name) | what icon to render if inValid input (default-close...an X) |
| invalidIconColor | string | color of the inValid icon (default-red) |
| activeIconName | string (FontAwesome Icon name) | there are three icons that animate when the input is focused (default-circle)|
| activeIconColor | string | color of the active icons (default-black) |
|activeIconSize | number | size of the active icons (default-6) |
| leftIconSize | number | size of the left icon (default-20) |
| leftContainerFlex | number | flex of the left side icon container (default-1)|
| leftIconName | string (FontAwesome Icon name) | what icon to render on left side of container |
| leftIconColor | string | the color of the icon on the left side |
| leftIconSource | require('../Folder/file.ext') | optionally supply your own icon as the left icon |
| leftIconStyle | object | styles applied to the icon you supply, only used with the above prop|
| title | string | what text to display in title container |
| titleContainerFlex | number | flex of the title container (default-2) |
| titleTextStyle | object | styles applied to the title text |
| text | string | the text for the text input |
| placeholder | string | same as TextInput |
| placeholderTextColor | string | same as TextInput |
| secureTextEntry | boolean | same as TextInput |
| keyboardType | string | same as TextInput |
| underlineColorAndroid | string | same as TextInput |
| editable | boolean | wether the text input is editable (default-true) |
| onChangeText | function **Required If Editable** | just like TextInput function |
| textInputStyle | object | styles applied to the text of the text input |
| onFocus | function | called when text input is focused |
| textContainerFlex | number | flex of the text input container (default-3) |
|validate | 'email','zip','currency', or function | what to validate.  If you supply a function it takes in the text as the argument and **MUST** return true or false|
|isValid | function | function called when input loses focus and returns true or false |
| errorMessage | string | what message to display when the input does not pass the validation |
| errorOffset | number | how much should the container grow when there is an error (default-10) |
| errorTextStyle | object | styles to apply to the error text (default {color:'red',fontSize:10}) |
| onLayout | function | function called on outermost container layout |
| isButton | boolean | (default-false) when true, the input row can be used as a button, validIcon will be the right side icon applied, and text input is not editable |
| onPress | function | function called if isButton is true |
| forceShowError | boolean | Force show the error message. Example, user hasn't input a value so the error hasn't shown.  This starts by not showing an error for better UX, but if no input is entered you can force show with this prop, just remember to clear it on your component side once the validation comes back |
