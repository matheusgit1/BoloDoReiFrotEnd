import React, {useState} from 'react';
import {View, Button, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';


export default function DatePicker({preesed, selectedDateInPage}) {


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  function onChange(event, selectedDate){
    if(selectedDate == undefined || selectedDate == null || selectedDate == ''){
      //Alert.alert("Data","Selecione uma data valida");
      return;
    }

    let day = selectedDate.toString();
    let day_of_week = day.substr(0,3);

    //compareDay(day_of_week);

    if(day_of_week === 'Sun'){
      preesed(false);
      Alert.alert("Domingo","Nós não atendemos aos domingo");
      return;
    }
    ///console.log(day_of_week);

    
    
    preesed(false);
    selectedDateInPage(selectedDate);
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);    

  }
    
  return (
    <View>
      {show && (
        <DateTimePicker
          minimumDate={date}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
    