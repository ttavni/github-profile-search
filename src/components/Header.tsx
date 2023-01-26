import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";

interface HeaderProps {
  toggleTheme(): void;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-height: 60px;
  font-size: 1.25vh;
  font-weight: bold;
`;

const HeaderTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.text,
    color: theme.colors.background,
  },
}));

const Header = ({ toggleTheme }: HeaderProps) => {
  const { title } = useContext(ThemeContext);
  const theme = title === "light";

  return (
    <HeaderContainer>
      <h1>&nbsp;Github Directory Bot</h1>
      <HeaderTooltip
        title={`Switch to ${theme ? "dark" : "light"} mode`}
        placement="left"
      >
        <IconButton size="large" onClick={toggleTheme} type="submit">
          {theme ? (
            <LightModeIcon sx={{ color: "#000000" }} />
          ) : (
            <DarkModeIcon sx={{ color: "#FFFFFF" }} />
          )}
        </IconButton>
      </HeaderTooltip>
    </HeaderContainer>
  );
};

export default Header;
