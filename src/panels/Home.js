import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";

import { FormLayout, Select, Text, Input } from "@vkontakte/vkui";
const API_KEY = "7b54ec9db6e9b0fc5a15a53d622d32d9";
const Lang = "ru";
const Home = ({ id, go, fetchedUser }) => {
  const [City, setCity] = useState("London");
  const [Data, setData] = useState(null);
  const cityValue = useRef();
  useEffect(() => {
    async function gettingWeather() {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}&units=metric&lang=${Lang}`
      );
      const data = await api_url.json();
      setData(data);
      console.log(data);
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

      <Group title="Navigation Example">
        <Div>
          {Data === null || Data === undefined ? (
            <ScreenSpinner />
          ) : (
            <Text weight="semibold" style={{ marginBottom: 16 }}>
              {String(Data.name) + " " + String(Data.main.temp) + " °C"}
            </Text>
          )}
        </Div>

        <Div>
          <Button size="xl" level="2" onClick={go} data-to="persik">
            Обсудить погоду
          </Button>
        </Div>
      </Group>
      <FormLayout>
        {/* <Select
          top="Город"
          placeholder="Выберите город"
          onChange={(e) => {
            setCity(e.target.value);
            console.log(City);
          }}
        >
          <option value="London, GB">Лондон</option>
          <option value="Moscow, RU">Москва</option>
        </Select> */}
        <Input getRef={cityValue} placeholder="Выберите город" />
        <Button onClick={ShowResults} size="xl">
          Показать
        </Button>
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
