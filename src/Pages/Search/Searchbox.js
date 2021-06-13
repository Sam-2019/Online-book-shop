import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { Input } from "../Components/Input";
import Button from "../Components/Button";

const Searchbox = ({ action, input, setInput }) => {
  return (
    <Fragment>
      <Input
        type="search"
        class_name="header-input  "
        placeholder="Search"
        value={input}
        action={setInput}
      />

      <Button name="Search" class_name="header-primary2" action={action} />
    </Fragment>
  );
};

export default Searchbox;

Searchbox.propTypes = {
  action: PropTypes.func,
  input: PropTypes.string,
  setInput: PropTypes.func,
};
