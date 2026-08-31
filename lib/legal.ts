import type { Lang } from "@/lib/i18n";

type Section = { h2: string; body: string };

export const TERMS: Record<Lang, Section[]> = {
  es: [
    {
      h2: "1. Aceptación de los Términos",
      body: "Al contratar a Littleman Labs o usar littlemanlabs.com, aceptas estos términos. Si no estás de acuerdo, por favor no uses nuestros servicios ni el sitio.",
    },
    {
      h2: "2. Servicios que Ofrecemos",
      body: "Littleman Labs ofrece diseño de sitios web, CRM y gestión de leads, texto automático a llamadas perdidas, citas, SEO local, anuncios pagados en Meta, reportes mensuales, y contenido de marca bilingüe. El alcance exacto de tu proyecto se define en tu llamada de consulta gratis y se confirma antes de empezar.",
    },
    {
      h2: "3. Precios y Pago",
      body: "El diseño web es un pago único, según el alcance de tu proyecto: cantidad de páginas, necesidades de backend, y complejidad general. CRM y Gestión de Leads, y Anuncios + CRM son planes mensuales recurrentes con un término mínimo de 3 meses, facturados cada mes, más el IVU aplicable. El precio se confirma por escrito antes de facturarte.",
    },
    {
      h2: "4. Alcance del Proyecto y Revisiones",
      body: "Los proyectos de sitio web incluyen una cantidad razonable de rondas de revisión dentro del alcance acordado. Trabajo fuera del alcance original (páginas adicionales, funciones nuevas, rediseños mayores después de la aprobación) puede facturarse por separado.",
    },
    {
      h2: "5. Cancelación",
      body: "Los servicios mensuales (CRM, Anuncios + CRM) tienen un término mínimo de 3 meses. Después de ese período, puedes cancelar en cualquier momento con 30 días de aviso por escrito. El pago único del sitio web no es recurrente: una vez entregado tu sitio, no debes nada más y no tienes ninguna obligación continua con nosotros.",
    },
    {
      h2: "6. Sin Garantía de Resultados",
      body: "Gestionamos SEO y campañas de anuncios con cuidado y experiencia, pero no podemos garantizar posiciones específicas, rendimiento de anuncios, o volumen de leads, esos factores dependen de elementos fuera de nuestro control, incluyendo algoritmos de las plataformas y condiciones del mercado.",
    },
    {
      h2: "7. Propiedad Intelectual",
      body: "Una vez tu sitio web esté pagado en su totalidad, eres dueño del diseño y contenido final entregado. Littleman Labs se reserva el derecho de mostrar el trabajo completado en nuestro portafolio y mercadeo, a menos que solicites lo contrario por escrito.",
    },
    {
      h2: "8. Responsabilidades del Cliente",
      body: "La entrega a tiempo depende de que proporciones el contenido, comentarios, y aprobaciones solicitadas con prontitud. Retrasos de tu parte pueden extender los plazos del proyecto correspondientemente.",
    },
    {
      h2: "9. Limitación de Responsabilidad",
      body: "Littleman Labs no es responsable por daños indirectos, incidentales, o consecuentes que surjan del uso de nuestros servicios o sitio web, más allá del monto pagado por el servicio específico en cuestión.",
    },
    {
      h2: "10. Ley Aplicable",
      body: "Estos términos se rigen por las leyes del Estado Libre Asociado de Puerto Rico.",
    },
  ],
  en: [
    {
      h2: "1. Acceptance of Terms",
      body: "By hiring Littleman Labs or using littlemanlabs.com, you agree to these terms. If you don't agree, please don't use our services or site.",
    },
    {
      h2: "2. Services We Provide",
      body: "Littleman Labs provides website design, CRM & lead management, missed-call text-back, appointment scheduling, local SEO, paid ads on Meta, monthly reporting, and bilingual brand content. The exact scope for your project is defined during your free consultation call and confirmed before work begins.",
    },
    {
      h2: "3. Pricing & Payment",
      body: "Website design is a one-time fee, scoped to your project: page count, backend needs, and overall complexity. CRM & Lead Management, and Ads + CRM are recurring monthly plans with a 3-month minimum term, billed monthly, plus applicable Puerto Rico sales tax (IVU). Pricing is confirmed in writing before you're billed.",
    },
    {
      h2: "4. Project Scope & Revisions",
      body: "Website projects include a reasonable number of revision rounds within the agreed scope. Work beyond the original scope (added pages, new features, major redesigns after approval) may be billed separately.",
    },
    {
      h2: "5. Cancellation",
      body: "Monthly services (CRM, Ads + CRM) have a 3-month minimum term. After that period, you can cancel anytime with 30 days' written notice. The one-time website fee is non-recurring: once your site is delivered, you owe nothing further and are under no ongoing obligation to us.",
    },
    {
      h2: "6. No Guarantee of Results",
      body: "We manage SEO and paid ad campaigns with care and experience, but we cannot guarantee specific rankings, ad performance, or lead volume, those depend on factors outside our control, including platform algorithms and market conditions.",
    },
    {
      h2: "7. Intellectual Property",
      body: "Once your website is paid in full, you own the final delivered design and content. Littleman Labs retains the right to showcase completed work in our portfolio and marketing unless you request otherwise in writing.",
    },
    {
      h2: "8. Client Responsibilities",
      body: "Timely delivery depends on you providing requested content, feedback, and approvals promptly. Delays on your end may extend project timelines accordingly.",
    },
    {
      h2: "9. Limitation of Liability",
      body: "Littleman Labs is not liable for indirect, incidental, or consequential damages arising from use of our services or website, beyond the amount paid for the specific service in question.",
    },
    {
      h2: "10. Governing Law",
      body: "These terms are governed by the laws of the Commonwealth of Puerto Rico.",
    },
  ],
};

export const PRIVACY: Record<Lang, Section[]> = {
  es: [
    {
      h2: "1. Quiénes Somos",
      body: "Littleman Labs (“nosotros”, “nuestro”) es un estudio de diseño web, CRM, y sistemas de automatización con base en Ponce, Puerto Rico. Esta política explica cómo manejamos la información recopilada a través de littlemanlabs.com y en el curso de brindar nuestros servicios.",
    },
    {
      h2: "2. Información que Recopilamos",
      body: "Cuando llenas nuestro formulario de contacto, llamas, envías un mensaje de texto, o nos escribes por WhatsApp, recopilamos lo que nos proporcionas directamente: tu nombre, correo electrónico, nombre de tu negocio, y detalles sobre tu consulta. No recopilamos información personal sensible a través de nuestro sitio.",
    },
    {
      h2: "3. Cómo Usamos tu Información",
      body: "Usamos tu información para responder a tu consulta, brindarte una cotización, entregar los servicios que has contratado, y darle seguimiento a proyectos activos.",
    },
    {
      h2: "4. Comunicación por Mensaje de Texto y Teléfono",
      body: "Si nos proporcionas tu número de teléfono al llamarnos, escribirnos, o contratarnos, das tu consentimiento para recibir llamadas y mensajes de texto relacionados con tu consulta o los servicios solicitados. Puedes darte de baja respondiendo STOP, o responde HELP para asistencia. Tu número nunca se vende ni se comparte con terceros para sus propios fines de mercadeo.",
    },
    {
      h2: "5. Cómo Compartimos Información",
      body: "No vendemos, alquilamos, ni intercambiamos tu información personal. Compartimos información solo con proveedores de servicios que nos ayudan a operar (CRM/hosting, procesador de pagos, y Meta a través de Meta Pixel), bajo los mismos estándares de confidencialidad descritos aquí.",
    },
    {
      h2: "6. Retención de Datos",
      body: "Retenemos tu información mientras sea necesaria para brindar nuestros servicios y mantener registros del negocio, o hasta que nos pidas eliminarla.",
    },
    {
      h2: "7. Tus Derechos",
      body: "Puedes solicitar acceso, corrección, o eliminación de tu información personal en cualquier momento escribiéndonos a info@littlemanlabs.com.",
    },
    {
      h2: "8. Cookies y Análisis",
      body: "Nuestro sitio usa Meta Pixel, una herramienta de Meta (Facebook) que coloca cookies en tu navegador para entender qué anuncios traen visitantes a littlemanlabs.com. Puedes ajustar la configuración de cookies de tu navegador, o administrar tus preferencias de anuncios directamente en Meta, para limitar este rastreo.",
    },
    {
      h2: "9. Cambios a esta Política",
      body: "Podemos actualizar esta política ocasionalmente. Los cambios significativos se reflejarán en la fecha de “Vigente desde” en la parte superior de esta página.",
    },
  ],
  en: [
    {
      h2: "1. Who We Are",
      body: "Littleman Labs (“we”, “us”, “our”) is a web design, CRM, and automation systems studio based in Ponce, Puerto Rico. This policy explains how we handle information collected through littlemanlabs.com and in the course of providing our services.",
    },
    {
      h2: "2. Information We Collect",
      body: "When you fill out our contact form, call, text, or message us on WhatsApp, we collect what you provide directly: your name, email address, business name, and details about your inquiry. We do not collect sensitive personal information through our site.",
    },
    {
      h2: "3. How We Use Your Information",
      body: "We use your information to respond to your inquiry, provide a quote, deliver the services you've signed up for, and follow up on active projects.",
    },
    {
      h2: "4. SMS & Phone Communication",
      body: "If you provide your phone number by calling, texting, or hiring us, you consent to receive calls and SMS text messages related to your inquiry or the services you've requested. You can opt out at any time by replying STOP, or reply HELP for assistance. Your phone number is never sold or shared with third parties for their own marketing purposes.",
    },
    {
      h2: "5. How We Share Information",
      body: "We do not sell, rent, or trade your personal information. We share information only with service providers who help us operate (our CRM/hosting platform, payment processor, and Meta through Meta Pixel), under the same confidentiality standards described here.",
    },
    {
      h2: "6. Data Retention",
      body: "We retain your information for as long as needed to provide our services and maintain business records, or until you ask us to delete it.",
    },
    {
      h2: "7. Your Rights",
      body: "You can request access, correction, or deletion of your personal information at any time by emailing us at info@littlemanlabs.com.",
    },
    {
      h2: "8. Cookies & Analytics",
      body: "Our site uses Meta Pixel, a tool from Meta (Facebook) that places cookies in your browser to understand which ads bring visitors to littlemanlabs.com. You can adjust your browser's cookie settings, or manage your ad preferences directly with Meta, to limit this tracking.",
    },
    {
      h2: "9. Changes to This Policy",
      body: "We may update this policy occasionally. Significant changes will be reflected in the “Effective” date at the top of this page.",
    },
  ],
};
