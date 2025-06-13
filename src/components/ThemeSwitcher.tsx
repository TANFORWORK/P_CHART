import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type Theme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "cmyk"
  | "autumn"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter"
  | "dim"
  | "nord"
  | "sunset"
  | "caramellatte"
  | "abyss"
  | "silk";

const themes: Theme[] = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-circle btn-ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      <dialog
        className={`modal ${isOpen ? "modal-open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="modal-box max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-lg mb-4">Select Theme</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {themes.map((t) => (
              <div
                key={t}
                className={`card bg-base-100 cursor-pointer hover:scale-105 transition-transform
                  ${theme === t ? "ring-2 ring-primary" : ""}`}
                onClick={() => {
                  setTheme(t);
                  setIsOpen(false);
                }}
              >
                <div
                  key={t}
                  data-theme={t}
                  className="card bg-base-100 hover:scale-105 transition-all cursor-pointer"
                >
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      <span className="capitalize text-base-content">{t}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="h-2 w-full rounded bg-base-200" />
                      <div className="h-2 w-full rounded bg-base-300" />
                      <div className="h-2 w-full rounded bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ThemeSwitcher;
