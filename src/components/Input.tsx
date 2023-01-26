import React, { useState } from "react";
import styled from "styled-components";

interface InputProps {
  onSend(text: string): void;
}

const InputContainer = styled.div`
  position: relative;
`;

const InputText = styled.input.attrs({ type: "text" })`
  font-family: monospace;
  font-size: 16px;
  border: 0;
  border-radius: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: 1px solid #eee;
  box-shadow: none;
  box-sizing: border-box;
  opacity: 1;
  outline: none;
  padding: 16px 52px 16px 10px;
  width: 100%;
  -webkit-appearance: none;
`;

const InputButton = styled.button`
  background-color: transparent;
  border: 0;
  border-bottom-right-radius: 10px;
  box-shadow: none;
  cursor: pointer;
  fill: #4a4a4a;
  opacity: 1;
  outline: none;
  padding: 14px 16px 12px 16px;
  position: absolute;
  right: 0;
  top: 0;
`;

export default function Input({ onSend }: InputProps) {
  const [text, setText] = useState("");

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };

  const handleSend = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <InputContainer>
      <form onSubmit={handleSend}>
        <InputText
          type="text"
          onChange={handleInputChange}
          value={text}
          placeholder="Enter github username here"
        />
        <InputButton>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 500 500"
          >
            <g>
              <g>
                <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
              </g>
            </g>
          </svg>
        </InputButton>
      </form>
    </InputContainer>
  );
}
