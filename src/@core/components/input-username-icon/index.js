// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
import PropTypes from "prop-types";
import classnames from "classnames";
import { User, Lock } from "react-feather";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Label,
  inputClassName,
} from "reactstrap";

const InputUsernameIcon = (props) => {
  // ** Props
  const {
    label,
    hideIcon,
    showIcon,
    visible,
    className,
    htmlFor,
    placeholder,
    iconSize,
    inputClassName,
    prependLogo,
    ...rest
  } = props;

  // ** State
  const [inputVisibility, setInputVisibility] = useState(visible);

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = iconSize ? iconSize : 14;

    if (inputVisibility === false) {
      return hideIcon ? hideIcon : <User size={size} />;
    } else {
      return showIcon ? showIcon : <User size={size} />;
    }
  };

  return (
    <Fragment>
      {label ? <Label for={htmlFor}>{label}</Label> : null}
      <InputGroup
        className={classnames({
          [className]: className,
        })}
      >
        {prependLogo && (
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Lock size={18} className="text-muted" />
            </InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          type={"text"}
          placeholder={"ex: john.doe@xyz.co.id"}
          id="username"
          name="username"
          className={classnames({
            [inputClassName]: inputClassName,
          })}
          /*eslint-disable */
          {...(label && htmlFor
            ? {
                id: htmlFor,
              }
            : {})}
          {...rest}
          /*eslint-enable */
        />
        <InputGroupAddon
          addonType="append"
        >
          <InputGroupText className="cursor-pointer">
            {renderIcon()}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Fragment>
  );
};

export default InputUsernameIcon;

// ** PropTypes
InputUsernameIcon.propTypes = {
  hideIcon: PropTypes.node,
  showIcon: PropTypes.node,
  visible: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  iconSize: PropTypes.number,
  inputClassName: PropTypes.string,
  label(props, propName, componentName) {
    // ** If label is defined and htmlFor is undefined throw error
    if (props[propName] && props["htmlFor"] === "undefined") {
      throw new Error("htmlFor prop is required when label prop is present");
    }
  },
  htmlFor(props, propName, componentName) {
    // ** If htmlFor is defined and label is undefined throw error
    if (props[propName] && props["label"] === "undefined") {
      throw new Error("label prop is required when htmlFor prop is present");
    }
  },
};

// ** Default Props
InputUsernameIcon.defaultProps = {
  visible: true,
};
