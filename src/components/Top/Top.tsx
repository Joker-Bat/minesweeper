import React, { FC } from "react";
import styled from "@emotion/styled";

import { Legend, LegendProps } from "./Legend";
import { GameName, GameNameProps } from "./GameName";

export type TopComponentProps = LegendProps & GameNameProps;

export const Top: FC<TopComponentProps> = ({ children, ...legendProps }) => {
  return (
    <Header>
      <GameName>{children}</GameName>
      <Legend {...legendProps} />
    </Header>
  );
};

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;
