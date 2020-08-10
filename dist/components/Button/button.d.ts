import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
declare type ButtonType = "primary" | "default" | "danger" | "link";
declare type ButtonSize = "lg" | "sm";
interface BaseButtonProps {
    /** 设置btn的类型 */
    btnType?: ButtonType;
    /** 设置btn的大小 */
    size?: ButtonSize;
    disabled?: boolean;
    href?: string;
    className?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
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
export declare const Button: FC<ButtonProps>;
export default Button;
