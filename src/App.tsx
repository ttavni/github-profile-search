import { ThemeProvider } from "styled-components";
import { useState } from "react";

import Header from "./components/Header";
import Messages from "./components/Messages";
import Input from "./components/Input";
import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";

import GlobalStyle from "./styles/global";
import { lightTheme, darkTheme } from "./styles/themes";
import createPersistedState from "use-persisted-state";

function App() {
  const useColorSchemeState = createPersistedState("darkMode");
  const [darkMode, setdarkMode] = useColorSchemeState(false);

  const toggleTheme = () => {
    setdarkMode((current: any) => !current);
  };

  const [messages, setMessages] = useState([
    <BotMessage key={1} username={""} />,
  ]);

  const send = async (text: any) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage key={messages.length + 2} username={text} />
    );
    setMessages(newMessages);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} />
      <Messages messages={messages} />
      <Input onSend={send} />
    </ThemeProvider>
  );
}

export default App;
