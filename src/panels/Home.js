import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { FormLayout, Select, Text, Input } from "@vkontakte/vkui";


const API_KEY = "7b54ec9db6e9b0fc5a15a53d622d32d9";
const Home = ({ id, go, fetchedUser, data}) => {
  const [fetchedUser, setUser] = useState(null);
  const [City, setCity] = useState("Kasimov");
  const[Data, SetData]=useState(null);
  useEffect(() => {
    
    async function gettingWeather() {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=${API_KEY}`
      );
      const data = await api_url.json();
      console.log(data);
      SetData(data)
    }
    gettingWeather();
    
  }, []);
   return(
    <>
    </>
   )
}

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
