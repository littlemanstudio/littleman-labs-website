/* 1:1 port of the live site's .whatsapp-fab: fixed bottom-right circular
   button, present on every page, same icon, same hover lift. */
export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/19392335269"
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed z-[90] flex items-center justify-center rounded-full border text-bone transition-all duration-300 hover:-translate-y-0.5 hover:text-bronze-bright"
      style={{
        right: "clamp(16px, 4vw, 32px)",
        bottom: "clamp(16px, 4vw, 32px)",
        width: "56px",
        height: "56px",
        background: "var(--graphite-deep)",
        borderColor: "var(--line-strong)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        className="transition-colors duration-300 group-hover:[&_path]:fill-bronze-bright"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
          fill="currentColor"
        />
        <path
          d="M12.004 2.003c-5.523 0-10 4.477-10 10 0 1.766.464 3.482 1.345 4.997L2 22l5.13-1.335a9.958 9.958 0 0 0 4.874 1.24h.004c5.522 0 9.998-4.478 9.998-10.001 0-2.67-1.04-5.18-2.929-7.07a9.935 9.935 0 0 0-7.073-2.831zm0 18.156h-.003a8.28 8.28 0 0 1-4.223-1.156l-.303-.18-3.044.792.813-2.968-.198-.305a8.264 8.264 0 0 1-1.267-4.406c0-4.564 3.715-8.278 8.229-8.278a8.223 8.223 0 0 1 5.83 2.421 8.194 8.194 0 0 1 2.412 5.835c-.002 4.564-3.717 8.245-8.246 8.245z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
