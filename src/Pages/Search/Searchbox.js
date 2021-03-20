import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { Input } from "../Components/Input";
import Button from "../Components/Button";

const Searchbox = () => {
  const [query, setQuery] = React.useState("");

  const queryClient = useQueryClient();

  let history = useHistory();

  function Query() {
    if (query === "") {
      // alert();
    } else {
      history.push(`/search?q=${query}`);
      queryClient.invalidateQueries("searchWhat");
    }
  }
  return (
    <div className="category">
      <Input
        type="search"
        class_name="header-input  "
        placeholder="Search"
        value={query}
        action={(e) => setQuery(e.target.value)}
      />

      <Button name="Search" class_name="header-primary2" action={Query} />
    </div>
  );
};

export default Searchbox;
