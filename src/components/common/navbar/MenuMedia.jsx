import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const MenuMedia = React.forwardRef(({ className = "" }, ref) => (
  <div
    ref={ref}
    className={`menu-media-wrapper flex-2 relative w-full h-full bg-gradient-to-br from-neutral-950 to-neutral-800 ${className} hidden lg:flex`}
  >
    <DotLottieReact
      src="/assets/CreativeDashBoard.lottie"
      loop
      autoplay
      className="absolute top-0 w-full h-full object-cover"
    />
  </div>
));

MenuMedia.displayName = "MenuMedia";
