import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextInput, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { H6, Paragraph, View } from '../../styles/styled-elements';
import { useTheme } from 'react-native-paper';

interface IPinCodeInputProps {
  numberOfInputs?: number;
  value?: string;
  onChangeText?: (arg: string) => void;
}

const PinCodeInput: React.FC<IPinCodeInputProps> = ({
  numberOfInputs = 4,
  value,
  onChangeText,
}) => {
  const digitRefs = useRef<Array<TextInput>>([]);
  const [digitWithFocus, setDigitWithFocus] = useState(0);
  const [defaultInputValues, setDefaultInputValues] = useState({});
  const { colors } = useTheme();

  useEffect(() => {
    if (value?.length === numberOfInputs) {
      Keyboard.dismiss();
    }
  }, [value, numberOfInputs]);

  useEffect(() => {
    const INPUT_VALUES = {};
    [...Array(numberOfInputs).keys()].forEach(key => {
      INPUT_VALUES[`digit${key}`] = '';
    });
    setDefaultInputValues(INPUT_VALUES);
  }, [numberOfInputs]);

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    setInputValues(defaultInputValues);
  }, [defaultInputValues]);

  useEffect(() => {
    if (value?.length) {
      setDigitWithFocus(prev => {
        if (prev === value.length) {
          return value?.length;
        }
        return prev + 1;
      });
    }
  }, [value]);

  const handleValueChange = useCallback(
    (name: string) => (value: string) => {
      if (+value >= 0 || value === '') {
        setInputValues(prevValues => {
          return {
            ...prevValues,
            [name]: value,
          };
        });
      }
    },
    []
  );

  useEffect(() => {
    if (value?.trim() === '') {
      setInputValues({ ...defaultInputValues });
    }
    if (value?.length === numberOfInputs) {
      setDigitWithFocus(value?.length - 1);
    }
  }, [value, numberOfInputs, defaultInputValues]);

  useEffect(() => {
    if (inputValues) {
      onChangeText?.(Object.values(inputValues).join(''));
    }
  }, [inputValues]);

  useEffect(() => {
    if (digitRefs.current[digitWithFocus]) {
      digitRefs.current[digitWithFocus].focus();
    }
  }, [digitWithFocus]);

  const handleKeyPress =
    (name: string) =>
    ({ nativeEvent: { key } }) => {
      if (key === 'Delete' || key === 'Backspace') {
        if (+name.slice(-1) > 0) {
          setDigitWithFocus(parseInt(name.slice(-1), 10) - 1);
        }
      }
    };

  return (
    <View>
      <H6 style={{ color: colors.gray }}>Group Pin code</H6>
      <PinRow>
        {Object.keys(inputValues).map((inputName, index) => (
          <PinInput
            ref={(el: TextInput) => {
              digitRefs.current[index] = el;
            }}
            maxLength={1}
            onChangeText={handleValueChange(inputName)}
            onKeyPress={handleKeyPress(inputName)}
            key={inputName}
            value={inputValues[inputName]}
            keyboardType='numeric'
            returnKeyType='done'
          />
        ))}
      </PinRow>
    </View>
  );
};
const PinRow = styled.View`
  flex-direction: row;
  width: 100%;
`;
const PinInput = styled.TextInput`
  border-bottom-width: 1px;
  flex: 1;
  margin-right: 10px;
  border-color: #e9ebed;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
`;

const Label = styled(Paragraph)`
  color: #8d8d8d;
  font-size: 12px;
  margin-bottom: 10px;
`;

export default PinCodeInput;
