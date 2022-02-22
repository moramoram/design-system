/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import styled from "styled-components";

import ReactQuill, { Quill } from "react-quill";
import MarkdownShortcuts from "quill-markdown-shortcuts";
import "react-quill/dist/quill.snow.css";

import { Controller } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

import { Selector } from "@/components";
import { colors, fontSize } from "@/_shared";

const CommunityEditor = ({
  register,
  control,
  errors,
  originalData,
  ...props
}) => {
  Quill.register("modules/markdownShortcuts", MarkdownShortcuts);
  Quill.debug("error");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
    markdownShortcuts: {},
  };

  const mobileModules = {
    ...modules,
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "strike",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
    "code",
  ];

  const isDefaultView = useMediaQuery({ query: "(min-width:560px)" });

  const options = [
    { value: "1", label: "자유게시판" },
    { value: "2", label: "익명게시판" },
    { value: "3", label: "취업 정보 게시판" },
    { value: "4", label: "질문 게시판" },
  ];

  useEffect(() => {
    if (errors.title?.type === "maxLength") {
      window.alert("제목은 45자 이내로 입력해주세요");
    }
  });

  return (
    <>
      <InputBox {...props}>
        {originalData ? (
          <Selector
            placeholder="카테고리"
            value={options[originalData?.boardType - 1]}
            isDisabled
            {...props}
          />
        ) : (
          <Controller
            name="boardType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Selector
                placeholder="카테고리"
                options={options}
                status={errors?.boardType ? "error" : "default"}
                {...field}
                {...props}
              />
            )}
          />
        )}
      </InputBox>
      <Title
        placeholder="제목"
        className="title"
        status={
          errors.title?.type === "required" ||
            errors.title?.type === "maxLength"
            ? "error"
            : "default"
        }
        defaultValue={originalData?.title}
        {...register("title", {
          required: !originalData,
          maxLength: 45,
        })}
        {...props}
      />
      <Controller
        name="content"
        control={control}
        rules={{
          validate: {
            required: (v) => v !== "<p><br></p>",
          },
        }}
        defaultValue={originalData?.content}
        render={({ field }) => (
          <Layout status={!errors?.content ? "default" : "error"} {...props}>
            <ReactQuill
              modules={isDefaultView ? modules : mobileModules}
              formats={formats}
              placeholder="내용을 입력하세요"
              {...field}
            />
          </Layout>
        )}
      />
    </>
  );
};

export default CommunityEditor;

const bgColor = {
  light: colors.white,
  dark: colors.black,
};

const borderColor = {
  light: colors.gray300,
  dark: colors.gray800,
};

const toolsColor = {
  light: colors.gray700,
  dark: colors.gray200,
};

const textColor = {
  light: colors.gray800,
  dark: colors.gray200,
};

const InputBox = styled.div`
  display: flex;
  gap: 1rem;

  width: 100%;
  margin-bottom: 1rem;
`;

const Layout = styled.div`
  border-radius: 8px;
  width: 100%;

  .ql-container {
    height: auto;
    border: none;
    font-size: 1rem;
  }

  .ql-editor {
    min-height: 200px;
    padding: 1rem 0 0px 0;

    font-family: Pretendard;
    color: ${(props) => textColor[props.theme]};
    letter-spacing: -0.02rem;

    transition: 0.3s;
    ${(props) => props.status === "error" && `color: ${colors.error};`}
  }

  .ql-editor.ql-blank::before {
    left: 0;
    color: ${colors.gray500};
    ${(props) => props.status === "error" && `color: ${colors.error};`}
  }

  .ql-toolbar.ql-snow {
    position: fixed;
    top: 48px;
    left: 0px;
    z-index: 9999;

    width: 100%;
    padding: 1rem;
    padding-left: calc((100% - 1280px) / 2);
    border: none;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid ${(props) => borderColor[props.theme]};

    @media screen and (max-width: 1280px) {
      padding-left: 1rem;
    }

    background-color: ${(props) => bgColor[props.theme]};
    font-family: Pretendard;

    .ql-stroke {
      stroke: ${(props) => toolsColor[props.theme]};
    }

    .ql-fill {
      fill: ${(props) => toolsColor[props.theme]};
    }
  }

  .ql-snow .ql-picker {
    color: ${(props) => toolsColor[props.theme]};
  }

  .ql-snow .ql-picker-options {
    background-color: ${(props) => bgColor[props.theme]};
  }

  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
    border: 1px solid ${(props) => borderColor[props.theme]};
    border-radius: 4px;
  }

  .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
    border: 1px solid ${(props) => borderColor[props.theme]};
  }

  .ql-snow .ql-editor h1 {
    padding: 3px 0;
    font-size: 1.5rem;
    font-weight: 700;
  }
  .ql-snow .ql-editor h2 {
    padding: 3px 0;
    font-size: 1.25rem;
    font-weight: 700;
  }
  .ql-snow .ql-editor h3 {
    padding: 3px 0;
    font-size: 1.125em;
    font-weight: 700;
    line-height: 1.3;
  }

  .ql-snow .ql-editor p {
    padding: 3px 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .ql-syntax,
  .ql-snow .ql-editor code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
  }

  .ql-snow .ql-editor pre.ql-syntax {
    background-color: ${colors.gray900};
  }

  .ql-video {
    width: 560px;
    height: 315px;
  }

  .ql-snow.ql-toolbar button:hover,
  .ql-snow .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button:focus,
  .ql-snow .ql-toolbar button:focus,
  .ql-snow.ql-toolbar button.ql-active,
  .ql-snow .ql-toolbar button.ql-active,
  .ql-snow.ql-toolbar .ql-picker-label:hover,
  .ql-snow .ql-toolbar .ql-picker-label:hover,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active,
  .ql-snow.ql-toolbar .ql-picker-item:hover,
  .ql-snow .ql-toolbar .ql-picker-item:hover,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: ${colors.blue100} !important;
  }
  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: ${colors.blue100} !important;
  }
  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-snow .ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar button:focus .ql-stroke,
  .ql-snow .ql-toolbar button:focus .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: ${colors.blue100} !important;
  }

  .ql-clipboard {
    position: fixed;
    left: 50%;
    top: 50%;
    display: none;
  }
`;

const Title = styled.input`
  width: 100%;
  padding: 1rem 0;
  border: none;
  border-bottom: 1px solid ${(props) => borderColor[props.theme]};
  background-color: ${(props) => bgColor[props.theme]};

  color: ${(props) => textColor[props.theme]};
  font-size: ${fontSize.h2};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${colors.gray500};
  }

  ${(props) =>
    props.status === "error" &&
    `
    color: ${colors.error};

    ::placeholder {
      color: ${colors.error};
    }
  `}
`;
