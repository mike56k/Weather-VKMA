import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { FormLayout, Select, Text, Input, Header, SimpleCell, InfoRow, } from "@vkontakte/vkui";
const API_KEY = "7b54ec9db6e9b0fc5a15a53d622d32d9";
const Lang = "ru";
const Home = ({ id, go, fetchedUser }) => {
  const [City, setCity] = useState("London");
  const [Data, setData] = useState(null);
  const [Data2, setData2] = useState(null);
  const [number, SetNumber]=useState(null);
  const cityValue=useRef();
  useEffect(() => {
    async function gettingWeather() {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}&units=metric&lang=${Lang}`
      );
      const api_url_2=await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${API_KEY}&units=metric&lang=ru`
      );
      const data_api = await api_url.json();
      const data2_api = await api_url_2.json();
      setData(data_api);
      setData2(data2_api);
      console.log(data_api);
      console.log(data2_api);
      
    }
    gettingWeather();
  }, [City]);
  function ShowResults() {
    const name = cityValue.current.value;
    console.log(name);
    setCity(name);
  }
 
  return (
    <Panel id={id}>
      <PanelHeader>Погода</PanelHeader>
      {fetchedUser && (
        <Group title="User Data Fetched with VK Bridge">
          <Cell
            before={
              fetchedUser.photo_200 ? (
                <Avatar src={fetchedUser.photo_200} />
              ) : null
            }
            description={
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
        
        
      )}

      
      <FormLayout>
    
        <Input getRef={cityValue} placeholder="Введите название города..." />
        <Button onClick={ShowResults}>Показать</Button>
        
        {Data === null || Data === undefined ? (
            <Text weight="semibold" style={{ marginBottom: 16 }}>
              Загрузка
            </Text>
          ):
        (<Group>
          <Header mode="secondary">Информация о погоде</Header>
        <SimpleCell multiline>
          <InfoRow header="Город">
          {String(Data.name)}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Состояние">
          {String(Data.weather[0].description)}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Средняя температура">
            {String(Data.main.temp) + " °C"}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Ощущается как">
          {String(Data.main.feels_like) + " °C"}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Минимальная температура за день">
          {String(Data.main.temp_min) + " °C"}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Максимальная температура за день">
          {String(Data.main.temp_max) + " °C"}
          </InfoRow>
        </SimpleCell>
        
        
      </Group>)}
      {Data2 === null || Data2 === undefined ? (
            <Text weight="semibold" style={{ marginBottom: 16 }}>
              Загрузка
            </Text>
          ):
      (
        <>
        <Button onClick={()=>SetNumber(0)}>{Data2.list[2].dt_txt}</Button>
      <Button  onClick={()=>SetNumber(8)}>{Data2.list[10].dt_txt}</Button>
      <Button  onClick={()=>SetNumber(16)}>{Data2.list[18].dt_txt}</Button>
      <Button  onClick={()=>SetNumber(24)}>{Data2.list[26].dt_txt}</Button>
      <Button  onClick={()=>SetNumber(32)}>{Data2.list[34].dt_txt}</Button>
        </>
      )}
      {Data2 === null || Data2 === undefined || number==null ? (
            <Text weight="semibold" style={{ marginBottom: 16 }}>
              Загрузка
            </Text>
          ):
        (<Group>
          <Header mode="secondary">Информация о погоде</Header>
        <SimpleCell>
          <InfoRow header="Состояние">
          {String(Data2.list[number].weather[0].description)}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Средняя температура">
            {String(Data2.list[number].main.temp) + " °C"}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Ощущается как">
          {String(Data2.list[number].main.feels_like) + " °C"}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Минимальная температура за день">
          {String(Data2.list[number].main.temp_min) + " °C"}
          </InfoRow>
        </SimpleCell>
        <SimpleCell>
          <InfoRow header="Максимальная температура за день">
          {String(Data2.list[number].main.temp_max) + " °C"}
          </InfoRow>
        </SimpleCell>
        
        
      </Group>)}
      
      
      
      
      </FormLayout>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
