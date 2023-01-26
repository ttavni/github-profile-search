import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import getUser from "../services/GithubAPI";
import { messageFormatter } from "../services/MessageFormatter";
import { usernameValidator } from "../services/UsernameValidation";

interface BotMessageProps {
  username: string;
}

const BotMessageContainer = styled.div`
  float: left;
  padding: 15px 20px;
  margin: 5px;
  border-radius: 20px 20px 20px 1px;
  background: #ea738dff;
  color: white;
  white-space: pre-line;
  max-width: 80%;
`;

const BotAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const BotAvatar = styled.img`
  width: 30px;
`;

export default function BotMessage({ username }: BotMessageProps) {
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState();
  const scrollRef = useRef(document.createElement("div"));

  // scroll to bottom of bot message
  useEffect(() => {
    scrollRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });

  useEffect(() => {
    async function loadMessage() {
      const [info, repos] = await getUser(username);
      const botMessage = messageFormatter(info, repos);
      setAvatar(info.avatar_url);
      setMessage(botMessage);
    }

    setLoading(true);

    if (username === "") {
      // If no input return help
      setMessage("Hello 👋 send a github username to find out more about them");
    } else {
      const validUsername = usernameValidator(username);
      if (!validUsername) {
        setMessage(`Sorry 😬 ${username} is not a valid github username`);
      } else {
        loadMessage().catch((err) => {
          if (err.response) {
            const errMessage = err.response.data.message.toLowerCase();
            if (errMessage.includes("rate limit exceeded")) {
              setMessage(
                "Sorry 😬 the rate limit for the API has been exceeded"
              );
            } else if (errMessage.includes("not found")) {
              setMessage(`Sorry 😬 ${username} does not exist`);
            } else {
              setMessage("Sorry 😬 somethings has gone wrong");
            }
          }
        });
      }
    }

    setLoading(false);
  }, [username]);

  return (
    <>
      <BotMessageContainer>
        {isLoading ? (
          "..."
        ) : (
          <BotAvatarContainer>
            {avatar && <BotAvatar width={30} src={avatar} />}
            {message}
          </BotAvatarContainer>
        )}
      </BotMessageContainer>
      <div ref={scrollRef} />
    </>
  );
}
