import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonType = "primary" | "default" | "danger" | "link";
type ButtonSize = "lg" | "sm";

interface BaseButtonProps {
  /** 设置btn的类型 */
  btnType?: ButtonType;
  /** 设置btn的大小 */
  size?: ButtonSize;
  disabled?: boolean;
  href?: string;
  className?: string;
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 这是研发大师组件
 *
 * ```
 * npm i yanfadashi-uilib -D
 *
 * import {Button} from "yanfadashi-uilib"
 * ```
 *
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    size,
    disabled,
    href,
    className,
    children,
    ...restProps
  } = props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link") {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};
Button.defaultProps = {
  btnType: "default",
  disabled: false,
};
export default Button;
