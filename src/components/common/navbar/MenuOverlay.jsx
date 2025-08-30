import React from "react";
import { MenuMedia } from "./MenuMedia";
import { MenuContent } from "./MenuContent";

export const MenuOverlay = React.forwardRef(
    (
        { overlayContentRef, mediaWrapperRef, menuLinksRef, menuTagsRef },
        ref
    ) => (
        <div
            ref={ref}
            className="menu-overlay fixed top-0 left-0 w-screen h-screen z-[9999] bg-white overflow-hidden opacity-0"
        >
            <div
                ref={overlayContentRef}
                className="menu-overlay-content relative w-full h-full flex text-white z-[10000]"
            >
                <MenuMedia ref={mediaWrapperRef} />
                <MenuContent
                    menuLinksRef={menuLinksRef}
                    menuTagsRef={menuTagsRef}
                />
            </div>
        </div>
    )
);

MenuOverlay.displayName = "MenuOverlay";
