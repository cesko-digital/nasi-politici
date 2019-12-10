import React from "react";
import styled from "styled-components";
import { useDesktop } from "../../hooks";

const LogoImg = styled.img`
  max-width: 100%;
`;

export const ProjectLogo: React.FunctionComponent<{}> = () => {
  return (
    <>
      {/* I belive that should not be an image */}
      <LogoImg
        src="/assets/img/np-logo-black.png"
        alt="Logo NašiPolitici.cz"
        height="40"
      />
    </>
  );
};

export const MobileProjectLogo: React.FunctionComponent<{}> = () => (
  <>
    {/* I belive that should not be an image */}
    <LogoImg
      src="/assets/img/np-logo-black-dots-only.png"
      alt="Logo NašiPolitici.cz"
      height="30"
    />
  </>
);
