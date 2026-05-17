export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-xl border font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}