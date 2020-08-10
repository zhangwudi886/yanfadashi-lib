import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Button, { ButtonProps } from "./button";

const ButtonDefault: ButtonProps = {
  onClick: jest.fn(),
};

const ButtonTypeSize: ButtonProps = {
  btnType: "primary",
  size: "lg",
};

const ButtonDisabled: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

const ButtonLink: ButtonProps = {
  btnType: "link",
  href: "http://core.xdf.cn/",
};

const renderButton = (props: ButtonProps, string: string) => {
  return <Button {...props}>{string}</Button>;
};

describe("测试xdf button组件", () => {
  it("测试default组件", () => {
    let wrapper = render(renderButton(ButtonDefault, "default"));
    let element = wrapper.getByText("default") as HTMLInputElement;
    expect(element).toBeInTheDocument(); //是不是挂载docment
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass("btn btn-default");
    expect(element).not.toHaveClass("btn-lg");
    expect(element).not.toHaveClass("btn-primary");

    fireEvent.click(element);
    expect(ButtonDefault.onClick).toBeCalled();
  });

  it("测试type size buuton组件", () => {
    let wrapper = render(renderButton(ButtonTypeSize, "typesize"));
    let element = wrapper.getByText("typesize") as HTMLInputElement;
    expect(element).toBeInTheDocument(); //是不是挂载docment
    expect(element).toHaveClass("btn btn-primary btn-lg");
    expect(element).not.toHaveClass("btn-sm");
    expect(element).not.toHaveClass("btn-default");
  });

  it("测试disabled buuton组件", () => {
    let wrapper = render(renderButton(ButtonDisabled, "disabled"));
    let element = wrapper.getByText("disabled") as HTMLInputElement;
    expect(element).toBeInTheDocument(); //是不是挂载docment
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(ButtonDisabled.onClick).not.toBeCalled();
  });
  it("测试link buuton组件", () => {
    let wrapper = render(renderButton(ButtonLink, "link"));
    let element = wrapper.getByText("link") as HTMLAnchorElement;
    expect(element).toBeInTheDocument(); //是不是挂载docment
    expect(element).toHaveClass("btn btn-link");
    expect(element).not.toHaveClass("btn-default");
    expect(element).not.toHaveClass("btn-lg");
    expect(element.tagName).toEqual("A");
    expect(element.href).toEqual("http://core.xdf.cn/");
    expect(element.href).not.toBeNull();
  });
});
