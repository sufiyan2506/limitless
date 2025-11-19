import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ShutterLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties & { [key: string]: string };
}

const ShutterLink = ({
  to,
  children,
  className,
  onClick,
  style,
}: ShutterLinkProps) => {
  const navigate = useNavigate();

  const triggerShutter = () => {
    const shutter = document.createElement("div");
    shutter.className =
      "fixed inset-0 bg-black z-[9999] shutter-anim pointer-events-none";
    document.body.appendChild(shutter);

    return shutter;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();

    const shutterElement = triggerShutter();

    setTimeout(() => {
      navigate(to);
    }, 450); // matches animation

    // remove shutter after animation
    setTimeout(() => {
      shutterElement.remove();
    }, 900);
  };

  return (
    <a href={to} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
};

export default ShutterLink;
