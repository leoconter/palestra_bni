import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function Footer() {
  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Oi! Vim da página do BNI e prefiro conversar por aqui.",
      )}`
    : "#";

  return (
    <footer className="mt-8 border-t border-navy-border px-6 py-14">
      <Image
        src="/brand/selo-claro.png"
        alt="Elev"
        width={72}
        height={72}
        className="h-16 w-16"
      />
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
        A Elev é uma empresa brasileira de IA e automação: desenha e implanta
        os fluxos que devolvem tempo ao seu time.
      </p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-navy-border px-5 py-3 text-sm font-semibold transition-colors hover:border-yellow/50"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.2-.3.1-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.2 3.9a12 12 0 0 0 4.6 4.2c1.8.8 2.6.9 3.5.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.7-.2Z" />
        </svg>
        Prefere falar? Chama no WhatsApp
      </a>
    </footer>
  );
}
