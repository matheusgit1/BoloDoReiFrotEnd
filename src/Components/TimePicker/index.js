import React, {useState} from 'react';
import {View, Button, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

//nãoa mexer em mais nada

export default function TimePicker({preesed, selectedTimeInPage}) {


  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(true);
    

  function onChange(event, selectedDate){
    if(selectedDate == undefined || selectedDate == null || selectedDate == ''){
      //Alert.alert("Hora","Selecione uma hora");
      preesed(false);
      return;
    }
    let finally_hour = selectedDate.toString();
    

    //console.log(finally_hour.substr(16,5));
    let hour = finally_hour.substr(16,2);
    let minutes = finally_hour.substr(19,2);
    //console.log(parseInt(hour),parseInt(minutes));

    if((parseInt(hour) < 8 && parseInt(minutes)< 30)||(parseInt(hour) > 18 && parseInt(minutes) > 30)){
      Alert.alert("Horario","Esse não condiz com o nosso horario de atendimento");
      preesed(false);
      return;
    }

    finally_hour = `${parseInt(hour)}:${parseInt(minutes)}`

    preesed(false);
    selectedTimeInPage(finally_hour);
    const currentDate = selectedDate || date;
    //setShow(false);
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
    