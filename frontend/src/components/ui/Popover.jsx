

export const Popover = ({ children, content, isOpen, onClose }) => {
  return (
    <div className="relative">
      {children}

      {isOpen && (
        <div
          className="
            absolute right-0 top-8 z-50 mt-2
            w-56
            rounded-xl
            border border-zinc-800
            bg-zinc-950
            shadow-2xl shadow-black/40
            overflow-hidden
          "
        >
          <div className="p-3">
            {content}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="
              absolute right-2 top-2
              flex h-6 w-6 items-center justify-center
              rounded-md
              text-zinc-500
              transition-colors
              hover:bg-zinc-800
              hover:text-zinc-200
            "
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};
