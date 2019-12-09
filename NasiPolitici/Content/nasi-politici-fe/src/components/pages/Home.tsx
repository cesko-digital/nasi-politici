import React from "react";
import { ProjectLogo } from "../ui/ProjectLogo";
import { SearchInput } from "../ui/SearchInput";
import styled from "styled-components";

const TextContainer = styled.div`
  margin: 40px 0 70px 0;
`;

export const Home = () => {
  return (
    <>
      <div>
        <ProjectLogo />
      </div>

      <TextContainer>
        <p>Mapujeme stav korupce v ČR a aktivně přispíváme k jejímu</p>
        <p>omezování. Hledejte političky a politiky.</p>
      </TextContainer>

      <div>
        <SearchInput
          buttonLabel="Hledat politika/čku"
          inputPlaceholder="Markéta Adamová"
        />
      </div>
    </>
  );
};
