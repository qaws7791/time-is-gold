import styled from "styled-components";
import { adjustBrightnessHexColor } from "utils/style";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const StColorDot = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "#ffffff"};
  border: 2px solid ${({ color }) => color && adjustBrightnessHexColor(color, -20)};
`;

const ColorDot = ({ color, ...props }: Props) => {
  return <StColorDot color={color} {...props} />;
};

export default ColorDot;
