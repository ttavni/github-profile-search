import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import getUser from "../services/GithubAPI";
import { messageFormatter } from "../services/MessageFormatter";
import { usernameValidator } from "../services/UsernameValidation";
import { ipExtractor } from "../services/IPAddressExtractor";

interface BotMessageProps {
  username: string;
}

const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1s infinite;
    content: ".";
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`;

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
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState();
  const scrollRef = useRef(document.createElement("div"));

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    async function loadMessage() {
      const [info, repos] = await getUser(username);
      const botMessage = messageFormatter(info, repos);
      setAvatar(info.avatar_url);
      setMessage(botMessage);
    }
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
              const ip = ipExtractor(errMessage);
              setMessage(
                `Sorry 😬 the rate limit for the API has been exceeded ${
                  ip ? `by the ${ip} IP address` : ""
                }`
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
  }, [username]);

  return (
    <>
      <BotMessageContainer>
        {message === "" ? (
          <Dots />
        ) : (
          <BotAvatarContainer>
            {avatar && (
              <BotAvatar
                onLoad={() => {
                  // Wait for image to render before scroll
                  scrollToBottom();
                }}
                width={30}
                src={avatar}
              />
            )}
            {message}
          </BotAvatarContainer>
        )}
      </BotMessageContainer>
      <div ref={scrollRef} />
    </>
  );
}
