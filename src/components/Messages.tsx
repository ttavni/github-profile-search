import styled from "styled-components";

interface MessageProps {
  messages: Array<React.ReactElement>;
}

export const MessageContainer = styled.div`
  width: 100%;
  height: 75vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`;

function Messages({ messages }: MessageProps) {
  return <MessageContainer>{messages}</MessageContainer>;
}

export default Messages;
