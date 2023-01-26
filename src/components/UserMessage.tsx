import styled from "styled-components";

interface UserMessageProps {
  text: string;
}

const UserMessageContainer = styled.div`
  float: right;
  padding: 15px 10px;
  text-align: right;
  margin: 10px;
  border-radius: 20px 20px 1px 20px;
  background: #89abe3ff;
  color: white;
  max-width: 65%;
`;

export default function UserMessage({ text }: UserMessageProps) {
  return (
    <div>
      <UserMessageContainer>{text}</UserMessageContainer>
    </div>
  );
}
