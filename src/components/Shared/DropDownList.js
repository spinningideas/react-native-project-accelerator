import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, TextInput } from 'react-native';
import PropTypes from 'prop-types';

// Icon
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();

const styles = StyleSheet.create({
  arrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  dropDown: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc'
  },
  dropDownDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexGrow: 1
  },
  dropDownBox: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    width: '100%'
  },
  dropDownItem: {
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginBottom: 10
  },
  hidden: {
    position: 'relative',
    display: 'none',
    borderWidth: 0
  },
  noBottomRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  notFound: {
    textAlign: 'center',
    color: 'grey',
    marginVertical: 10,
    marginBottom: 15
  }
});

const DropDownList = (props) => {
  const [dropDownState, setDropDownState] = useState({
    choice: props.multiple
      ? items
      : {
          label: choice.label,
          value: choice.value
        },
    searchableText: null,
    isVisible: props.isVisible,
    props: {
      multiple: props.multiple,
      defaultValue: props.defaultValue,
      isVisible: props.isVisible
    }
  });

  const { multiple, disabled } = dropDownState.props;
  const { placeholder } = props;
  const isPlaceholderActive = dropDownState.choice.label === null;
  const label = isPlaceholderActive ? placeholder : dropDownState.choice.label;
  const placeholderStyle = isPlaceholderActive && props.placeholderStyle;
  const opacity = disabled ? 0.5 : 1;
  const items = getItems();

  useEffect(() => {
    let selectedItemDefault;
    let items = [];
    if (!props.multiple) {
      if (props.defaultValue) {
        selectedItemDefault = props.items.find((item) => item.value === props.defaultValue);
      } else if (props.items.filter((item) => item.hasOwnProperty('selected') && item.selected === true).length > 0) {
        selectedItemDefault = props.items.filter(
          (item) => item.hasOwnProperty('selected') && item.selected === true
        )[0];
      } else {
        selectedItemDefault = null();
      }
    } else {
      if (props.defaultValue && Array.isArray(props.defaultValue) && props.defaultValue.length > 0) {
        props.defaultValue.forEach((value, index) => {
          items.push(props.items.find((item) => item.value === value));
        });
      } else if (props.items.filter((item) => item.hasOwnProperty('selected') && item.selected === true).length > 0) {
        items = props.items.filter((item, index) => item.hasOwnProperty('selected') && item.selected === true);
      }
    }
    //setDropDownState(selectedItemDefault)
  }, []);

  const getDerivedStateFromProps = (props, state) => {
    // Change default value (! multiple)
    if (!state.props.multiple && props.defaultValue !== state.props.defaultValue) {
      const { label, value } =
        props.defaultValue === null
          ? {
              label: null,
              value: null
            }
          : props.items.find((item) => item.value === props.defaultValue);
      return {
        choice: {
          label,
          value
        },
        props: {
          ...state.props,
          defaultValue: props.defaultValue
        }
      };
    }

    // Change default value (multiple)
    if (state.props.multiple && JSON.stringify(props.defaultValue) !== JSON.stringify(state.props.defaultValue)) {
      let items = [];
      if (props.defaultValue && Array.isArray(props.defaultValue) && props.defaultValue.length > 0) {
        props.defaultValue.forEach((value, index) => {
          items.push(props.items.find((item) => item.value === value));
        });
      }

      return {
        choice: items,
        props: {
          ...state.props,
          defaultValue: props.defaultValue
        }
      };
    }

    // Change visibility
    if (props.isVisible !== state.props.isVisible) {
      return {
        isVisible: props.isVisible,
        props: {
          ...state.props,
          isVisible: props.isVisible
        }
      };
    }

    // Change disability
    if (props.disabled !== state.props.disabled) {
      return {
        props: {
          ...state.props,
          disabled: props.disabled
        }
      };
    }

    return null;
  };

  const toggle = () => {
    setSelectedItem(
      {
        isVisible: !dropDownState.isVisible
      },
      () => {
        const isVisible = dropDownState.isVisible;
        if (isVisible) {
          props.onOpen();
        } else {
          props.onClose();
        }
      }
    );
  };

  const select = (item, index) => {
    const { multiple } = dropDownState.props;
    if (!multiple) {
      setState({
        choice: {
          label: item.label,
          value: item.value
        },
        isVisible: false,
        props: {
          ...dropDownState.props,
          isVisible: false
        }
      });

      // onChangeItem callback
      props.onChangeItem(item, index);
    } else {
      let choice = [...dropDownState.choice];
      const exists = choice.findIndex((i) => i.label === item.label && i.value === item.value);

      if (exists > -1 && choice.length > props.min) {
        choice = choice.filter((i) => i.label !== item.label && i.value !== item.value);
      } else if (exists === -1 && choice.length < props.max) {
        choice.push(item);
      }

      setDropDownState({
        choice
      });

      // onChangeItem callback
      props.onChangeItem(choice.map((i) => i.value));
    }

    // onClose callback (! multiple)
    if (!multiple) props.onClose();
  };

  const getLayout = (layout) => {
    setDropDownState({
      top: layout.height - 1
    });
  };

  const getItems = () => {
    if (dropDownState.searchableText) {
      const text = dropDownState.searchableText.toLowerCase();
      return props.items.filter((item) => {
        return item.label && item.label.toLowerCase().indexOf(text) > -1;
      });
    }
    return props.items;
  };

  const getNumberOfItems = () => {
    return props.multipleText.replace('%d', dropDownState.choice.length);
  };

  return (
    <View
      style={[
        props.containerStyle,
        {
          ...(Platform.OS !== 'android' && {
            zIndex: props.zIndex
          })
        }
      ]}
    >
      <TouchableOpacity
        onLayout={(event) => getLayout(event.nativeEvent.layout)}
        disabled={disabled}
        onPress={() => toggle()}
        activeOpacity={1}
        style={[
          styles.dropDown,
          props.style,
          dropDownState.isVisible && styles.noBottomRadius,
          {
            flexDirection: 'row',
            flex: 1
          }
        ]}
      >
        <View style={[styles.dropDownDisplay]}>
          <Text style={[props.labelStyle, placeholderStyle, { opacity, flex: 1, marginRight: 5 }]}>
            {multiple ? (dropDownState.choice.length > 0 ? getNumberOfItems() : placeholder) : label}
          </Text>
        </View>
        {props.showArrow && (
          <View style={[styles.arrow]}>
            <View style={[props.arrowStyle, { opacity }]}>
              {!dropDownState.isVisible
                ? props.customArrowDown(props.arrowSize, props.arrowColor)
                : props.customArrowUp(props.arrowSize, props.arrowColor)}
            </View>
          </View>
        )}
      </TouchableOpacity>
      <View
        style={[
          styles.dropDown,
          styles.dropDownBox,
          props.dropDownStyle,
          !dropDownState.isVisible && styles.hidden,
          {
            top: dropDownState.top,
            maxHeight: props.dropDownMaxHeight,
            zIndex: props.zIndex
          }
        ]}
      >
        {props.searchable && (
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <TextInput
              style={[styles.input, props.searchableStyle]}
              defaultValue={dropDownState.searchableText}
              placeholder={props.searchablePlaceholder}
              onChangeText={(text) => {
                setState({
                  searchableText: text
                });
              }}
            />
          </View>
        )}

        <ScrollView style={{ width: '100%' }} nestedScrollEnabled={true}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => select(item, index)}
                style={[
                  styles.dropDownItem,
                  props.itemStyle,
                  dropDownState.choice.value === item.value && props.activeItemStyle,
                  {
                    opacity: item?.disabled || false === true ? 0.3 : 1,
                    ...(multiple && {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    })
                  }
                ]}
                disabled={item?.disabled || false === true}
              >
                <Text style={[props.labelStyle, dropDownState.choice.value === item.value && props.activeLabelStyle]}>
                  {item.label}
                </Text>
                {multiple &&
                  dropDownState.choice.findIndex((i) => i.label === item.label && i.value === item.value) > -1 &&
                  props.customTickIcon()}
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={[
                styles.notFound,
                {
                  fontFamily: props.labelStyle?.fontFamily
                }
              ]}
            >
              {props.searchableError}
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

DropDownList.defaultProps = {
  placeholder: 'Select an item',
  dropDownMaxHeight: 150,
  style: {},
  dropDownStyle: {},
  containerStyle: {},
  itemStyle: {},
  labelStyle: {},
  placeholderStyle: {},
  activeItemStyle: {},
  activeLabelStyle: {},
  arrowStyle: {},
  arrowColor: '#000',
  showArrow: true,
  arrowSize: 15,
  customArrowUp: (size, color) => <Feather name="chevron-up" size={size} color={color} />,
  customArrowDown: (size, color) => <Feather name="chevron-down" size={size} color={color} />,
  customTickIcon: () => <Feather name="check" size={15} />,
  zIndex: 5000,
  disabled: false,
  searchable: false,
  searchablePlaceholder: 'Search for an item',
  searchableError: 'Not Found',
  searchableStyle: {},
  isVisible: false,
  multiple: false,
  multipleText: '%d items have been selected',
  min: 0,
  max: 10000000,
  onOpen: () => {},
  onClose: () => {},
  onChangeItem: () => {}
};

DropDownList.propTypes = {
  items: PropTypes.array.isRequired,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  dropDownMaxHeight: PropTypes.number,
  style: PropTypes.object,
  dropDownStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  placeholderStyle: PropTypes.object,
  activeItemStyle: PropTypes.object,
  activeLabelStyle: PropTypes.object,
  showArrow: PropTypes.bool,
  arrowStyle: PropTypes.object,
  arrowColor: PropTypes.string,
  arrowSize: PropTypes.number,
  customArrowUp: PropTypes.func,
  customArrowDown: PropTypes.func,
  customTickIcon: PropTypes.func,
  zIndex: PropTypes.number,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  searchablePlaceholder: PropTypes.string,
  searchableError: PropTypes.string,
  searchableStyle: PropTypes.object,
  isVisible: PropTypes.bool,
  multiple: PropTypes.bool,
  multipleText: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChangeItem: PropTypes.func
};

export default DropDownList;
