import React from "react";
import PrimaryButton from "./Buttons";
import { SecondaryButton, TertiaryButton } from "./Buttons";
import { GlobalStyle } from "./utils";

const Container = () => {
  return (
    <div>
      <PrimaryButton modifiers={["small", "success", "primaryButtonSuccess"]}>
        Hello world
      </PrimaryButton>
      <SecondaryButton
        modifiers={["large", "warning", "secondaryButtonWarning"]}
      >
        Goodbye world
      </SecondaryButton>
      <TertiaryButton modifiers={["error", "tertiaryButtonError"]}>
        Hey world
      </TertiaryButton>{" "}
      <GlobalStyle />
    </div>
  );
};

export default Container;
