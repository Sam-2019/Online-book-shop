import React from "react";
import Close from "./Close";
import Chat from "./Chat";
import { Transition, animated } from "react-spring/renderprops";
import "./icons.css";
import "./spring.css";

const FloatingIcon = () => {
  const [state, setState] = React.useState(false);

  function ToggleState() {
    setState(!state);
  }
  return (
    <>
      {state ? (
        <span className="contact-item" onClick={ToggleState}>
          <Close width={24} height={24} />
        </span>
      ) : (
        <span className="contact-item" onClick={ToggleState}>
          <Chat action={ToggleState} width={24} height={24} />
        </span>
      )}

      <div className="reveals-main">
        <Transition
          native
          items={state}
          from={{ position: "absolute", overflow: "hidden", height: 0 }}
          enter={[{ height: "auto" }]}
          leave={{ height: 0 }}
        >
          {(state) =>
            state &&
            ((props) => (
              <animated.div style={props}>
                <div className="cardie">
                  <p>Architect & Engineer</p>
                </div>
              </animated.div>
            ))
          }
        </Transition>
      </div>
    </>
  );
};

export default FloatingIcon;
