import React from "react";
import {
  IoHomeOutline,
  IoVideocamOutline,
  IoCameraOutline,
  IoShareSocialOutline,
  IoHeartOutline,
} from "react-icons/io5";

const menuItems = [
  {
    title: "Home",
    icon: <IoHomeOutline />,
    gradientFrom: "#a955ff",
    gradientTo: "#ea51ff",
  },
  {
    title: "Video",
    icon: <IoVideocamOutline />,
    gradientFrom: "#56CCF2",
    gradientTo: "#2F80ED",
  },
  {
    title: "Photo",
    icon: <IoCameraOutline />,
    gradientFrom: "#FF9966",
    gradientTo: "#FF5E62",
  },
  {
    title: "Share",
    icon: <IoShareSocialOutline />,
    gradientFrom: "#80FF72",
    gradientTo: "#7EE8FA",
  },
  {
    title: "Tym",
    icon: <IoHeartOutline />,
    gradientFrom: "#ffa9c6",
    gradientTo: "#f434e2",
  },
];

export default function GradientMenu() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <ul className="flex gap-8">
        {menuItems.map(({ title, icon, gradientFrom, gradientTo }, idx) => (
          <li
            key={idx}
            style={
              {
                "--gradient-from": gradientFrom,
                "--gradient-to": gradientTo,
              } as React.CSSProperties
            }
            className={`
              relative w-[70px] h-[70px]
              bg-black/40 border border-white/10
              backdrop-blur-xl
              shadow-[0_0_20px_rgba(255,255,255,0.08)]
              rounded-full flex items-center justify-center
              transition-all duration-500
              hover:w-[200px] hover:shadow-[0_0_35px_-5px_var(--gradient-to)]
              group cursor-pointer 
            `}
          >
            {/* Gradient fill on hover */}
            <span
              className="
                absolute inset-0 rounded-full 
                opacity-0 group-hover:opacity-100
                transition-all duration-500
                bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))]
              "
            />

            {/* Glow outside */}
            <span
              className="
                absolute -inset-1 rounded-full
                opacity-0 blur-xl
                group-hover:opacity-30
                transition-all duration-700 -z-10
                bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))]
              "
            />

            {/* Icon */}
            <span
              className="
                relative z-10 text-2xl 
                text-neutral-400 
                group-hover:scale-0
                transition-all duration-500
              "
            >
              {icon}
            </span>

            {/* Title (slides + fades in) */}
            <span
              className="
                absolute text-white font-semibold uppercase tracking-wide text-sm
                opacity-0 translate-y-2
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-500 delay-150
              "
            >
              {title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
