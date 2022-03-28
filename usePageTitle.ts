import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface PageTitlePropsType {
  text?: string;
  url?: string;
}

/** This class has to be placed on the button that contains the div with the text class */
export const PageTitleContainerClass = "HookPageTitle-container";
/** This class has to be placed on the div that contains just the text */
export const PageTitleTextClass = "HookPageTitle-text";

/**
 * React hook used to update the page title (text and url)
 * It can be used once, in pages that have a static title
 * Or it can be used multiple times in pages that have a dynamic title.
 *
 * ex: const updateTitle = usePageTitle({ text: 'initial title', url: '/' })
 * updateTitle({ text: 'new title', url: 'newUrl' })
 *
 * @param titleProps object containing text and url (both strings)
 * @returns function that can be used to update the title at any time, with the same object type of titleProps
 */
export function usePageTitle(titleProps: PageTitlePropsType) {
  const [title, setTitle] = useState(titleProps);
  const navigate = useNavigate();

  useEffect(() => {
    const titleNode = document.createElement("div");
    titleNode.innerText = title.text || "";
    titleNode.className = PageTitleTextClass;
    titleNode.addEventListener("click", () => navigate(title.url || "/"));

    const parent = document.querySelector(`.${PageTitleContainerClass}`);
    const oldTitleNode = document.querySelector(`.${PageTitleTextClass}`);

    // if (oldTitleNode) oldTitleNode.innerText = title.text;
    if (parent && oldTitleNode) parent?.replaceChild(titleNode, oldTitleNode);
  }, [navigate, title]);

  return setTitle;
}

export default usePageTitle;
