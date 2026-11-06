import type { LangCode } from "./site";

/* Question-and-answer guides built around the searches people run when they add "reddit" to a business
   question (the same long searches AI assistants run on their behalf). Every guide is original, useful on
   its own, says plainly that it is not affiliated with Reddit and quotes no posts.

   Claims about Littleman Labs stay inside what the rest of the site already states (src/lib/i18n.ts and
   legal.ts): a website is a one-time payment priced by scope and confirmed in writing, 3 to 5 pages live in
   3 to 7 business days once the direction is agreed, bilingual from day one, the client owns the delivered
   design and content once paid in full; the growth system is Meta ads managed weekly plus a CRM with
   follow-up, a strategy plan and a monthly report, billed as a one-time setup then a monthly plan with a
   standard 3 month term, ad spend separate, plus IVU. No prices, no promised results. Spanish uses "usted".
   English and Spanish share one slug, because the language switch maps /en/x to /x. */

export type Guide = {
  title: string;
  description: string;
  h1: string;
  kicker: string;
  intro: string[];
  qa: { q: string; a: string[] }[];
  us: { h2: string; p: string[] };
};

export const GUIDES_LASTMOD = "2026-11-06";

export const UI: Record<
  LangCode,
  {
    hubCrumb: string;
    updated: string;
    related: string;
    cta: string;
    note: string;
    hubEyebrow: string;
    hubTitle: string;
    hubLead: string;
    hubTitleMeta: string;
    hubDescription: string;
    home: string;
  }
> = {
  en: {
    hubCrumb: "Reddit questions, answered",
    updated: "Updated",
    related: "Related questions",
    cta: "Book a free 20-minute call",
    note: "Littleman Labs is not affiliated with Reddit. We do not quote or reproduce any posts. These answers are our own, written for business owners in Puerto Rico.",
    hubEyebrow: "Littleman Labs, Ponce PR",
    hubTitle: "Reddit questions about web design, CRM and ads, answered",
    hubLead:
      "When business owners want advice with nothing to sell them, they add the word Reddit to their search. We collected the questions that come up most and answered each one plainly. Seven guides, written for Puerto Rico.",
    hubTitleMeta: "Reddit questions on web design, CRM and ads | Littleman Labs",
    hubDescription:
      "Straight answers to the questions business owners ask on Reddit about web design, website cost, CRM, Meta ads, missed calls and local SEO in Puerto Rico. From Littleman Labs in Ponce.",
    home: "Home",
  },
  es: {
    hubCrumb: "Preguntas de Reddit, respondidas",
    updated: "Actualizado",
    related: "Preguntas relacionadas",
    cta: "Reserve una llamada gratis de 20 minutos",
    note: "Littleman Labs no tiene relación con Reddit. No citamos ni reproducimos ninguna publicación. Estas respuestas son nuestras, escritas para dueños de negocios en Puerto Rico.",
    hubEyebrow: "Littleman Labs, Ponce PR",
    hubTitle: "Preguntas de Reddit sobre diseño web, CRM y anuncios, respondidas",
    hubLead:
      "Cuando un dueño de negocio quiere consejo de alguien que no le está vendiendo nada, añade la palabra Reddit a su búsqueda. Reunimos las preguntas que más se repiten y respondimos cada una con claridad. Siete guías, escritas para Puerto Rico.",
    hubTitleMeta: "Preguntas de Reddit: diseño web, CRM y anuncios | Littleman Labs",
    hubDescription:
      "Respuestas directas a lo que los dueños de negocios preguntan en Reddit sobre diseño web, costo de un sitio, CRM, anuncios en Meta, llamadas perdidas y SEO local en Puerto Rico.",
    home: "Inicio",
  },
};

export const GUIDES: { slug: string; related: string[]; en: Guide; es: Guide }[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "web-design-puerto-rico-reddit",
    related: ["small-business-website-cost-reddit", "wix-vs-custom-website-reddit", "local-seo-puerto-rico-reddit"],
    en: {
      title: "Web Design Puerto Rico Reddit: Honest Answers | Littleman Labs",
      description:
        "The questions business owners keep asking on Reddit about web design in Puerto Rico, answered plainly: timelines, bilingual sites, ownership, and how to spot a bad designer.",
      h1: "Web Design in Puerto Rico: The Reddit Questions, Answered",
      kicker: "Web design",
      intro: [
        "If you search for a web designer in Puerto Rico and add the word Reddit, you are usually after one thing: advice from people with nothing to sell you. Fair. This page answers the questions that come up again and again, as straight as we can.",
        "Littleman Labs is a web design and ads studio in Ponce. We are not affiliated with Reddit and we do not quote anyone's posts. These are the questions, and our answers.",
      ],
      qa: [
        {
          q: "Do I really need a website if my business is already on Instagram and Facebook?",
          a: [
            "Yes, and the reason is ownership. A social profile is rented space. The platform can change its rules, bury your posts, or lock your account, and you have no say in any of it. A website is the one place online that is yours.",
            "It also does a job social media cannot. When someone hears about you and searches your name, Google shows the website and the Google Business Profile before it shows your last reel. A site gives your ads somewhere to send people, and a form there can feed straight into your CRM.",
          ],
        },
        {
          q: "How long should a small business website take?",
          a: [
            "For a simple site of 3 to 5 pages, days to a few weeks. Most of the delay is rarely the build. It is waiting on text and photos from the owner. If someone quotes you three months for a five-page site, ask what the three months are made of.",
            "At Littleman Labs most 3 to 5 page sites are live in 3 to 7 business days once the direction is agreed.",
          ],
        },
        {
          q: "Should my site be in Spanish, English, or both?",
          a: [
            "Write for the customer you want. In Puerto Rico that is very often both: locals, professionals, tourists, and family abroad all search differently. If you serve both groups, do both properly.",
            "Properly means each language is written by a person, not pasted through a translator, and each version has its own page so search engines can index it. A site that is half Spanish and half machine English tells visitors you did not care.",
          ],
        },
        {
          q: "How do I tell a good web designer from a bad one?",
          a: [
            "Ask who you will actually talk to during the project, and whether it is the same person who builds it. Ask for live sites you can open on your own phone. Ask who owns the domain, the hosting account and the files when it is done.",
            "Be wary of anyone who guarantees a number one ranking, who will not say what is included after launch, or who needs a long contract before you have seen a single page.",
          ],
        },
        {
          q: "Who owns the website once it is built?",
          a: [
            "You should. Get it in writing before you pay. The domain should be registered in your name, and you should be able to take the finished site with you if you ever change providers.",
            "Some providers keep the site inside their own platform so that leaving means starting over. That is a business model, not a technical limit.",
          ],
        },
        {
          q: "Do I need a designer in my own town?",
          a: [
            "No. Everything in a web project happens by message, call and screen share. What matters is that the person understands your market and your customers. A studio that works in Puerto Rico will know how people here search, which words they use, and why a WhatsApp button matters so much on the island.",
          ],
        },
      ],
      us: {
        h2: "How Littleman Labs handles it",
        p: [
          "We build custom bilingual websites for businesses in Puerto Rico, from Ponce. A website is a one-time payment, not a subscription, and once it is paid in full you own the final delivered design and content.",
          "The first step is a free 20-minute call. The exact price is confirmed in writing before we start.",
        ],
      },
    },
    es: {
      title: "Diseño web Puerto Rico Reddit: respuestas honestas | Littleman Labs",
      description:
        "Lo que los dueños de negocios preguntan en Reddit sobre diseño web en Puerto Rico, respondido con claridad: tiempos, sitios bilingües, quién es el dueño y cómo reconocer a un mal diseñador.",
      h1: "Diseño web en Puerto Rico: las preguntas de Reddit, respondidas",
      kicker: "Diseño web",
      intro: [
        "Si busca un diseñador web en Puerto Rico y añade la palabra Reddit, normalmente quiere una cosa: consejo de personas que no le están vendiendo nada. Es razonable. Esta página responde las preguntas que se repiten una y otra vez, lo más directo que podemos.",
        "Littleman Labs es un estudio de diseño web y anuncios en Ponce. No tenemos relación con Reddit y no citamos las publicaciones de nadie. Estas son las preguntas, y estas son nuestras respuestas.",
      ],
      qa: [
        {
          q: "¿De verdad necesito un sitio web si mi negocio ya está en Instagram y Facebook?",
          a: [
            "Sí, y la razón es quién es el dueño. Un perfil en redes es un espacio alquilado. La plataforma puede cambiar sus reglas, esconder sus publicaciones o bloquearle la cuenta, y usted no puede hacer nada. Un sitio web es el único lugar en internet que es suyo.",
            "También hace algo que las redes no pueden. Cuando alguien oye hablar de usted y busca su nombre, Google muestra primero el sitio web y el perfil de Google Business, antes que su último reel. Un sitio le da a sus anuncios un lugar adonde enviar a la gente, y un formulario ahí puede llegar directo a su CRM.",
          ],
        },
        {
          q: "¿Cuánto debe tardar un sitio web para un negocio pequeño?",
          a: [
            "Para un sitio sencillo de 3 a 5 páginas, de unos días a unas semanas. La demora casi nunca está en la construcción. Está en esperar los textos y las fotos del dueño. Si alguien le cotiza tres meses por un sitio de cinco páginas, pregunte de qué están hechos esos tres meses.",
            "En Littleman Labs la mayoría de los sitios de 3 a 5 páginas están en línea en 3 a 7 días laborables, una vez acordada la dirección.",
          ],
        },
        {
          q: "¿Mi sitio debe estar en español, en inglés o en ambos?",
          a: [
            "Escriba para el cliente que quiere atraer. En Puerto Rico muchas veces son ambos: los locales, los profesionales, los turistas y la familia en el exterior buscan de forma distinta. Si atiende a los dos grupos, hágalo bien en los dos idiomas.",
            "Hacerlo bien significa que cada idioma lo escribe una persona, no un traductor automático, y que cada versión tiene su propia página para que los buscadores la indexen. Un sitio mitad español y mitad inglés traducido a máquina le dice al visitante que no le importó.",
          ],
        },
        {
          q: "¿Cómo distingo a un buen diseñador web de uno malo?",
          a: [
            "Pregunte con quién va a hablar durante el proyecto y si es la misma persona que lo construye. Pida sitios en vivo que pueda abrir en su propio teléfono. Pregunte quién es el dueño del dominio, de la cuenta de hosting y de los archivos cuando termine.",
            "Desconfíe de quien le garantice el primer lugar en Google, de quien no diga qué incluye después del lanzamiento, o de quien le exija un contrato largo antes de que usted haya visto una sola página.",
          ],
        },
        {
          q: "¿Quién es el dueño del sitio web una vez construido?",
          a: [
            "Debe ser usted. Pídalo por escrito antes de pagar. El dominio debe estar registrado a su nombre, y usted debe poder llevarse el sitio terminado si algún día cambia de proveedor.",
            "Algunos proveedores mantienen el sitio dentro de su propia plataforma para que irse signifique empezar de cero. Eso es un modelo de negocio, no un límite técnico.",
          ],
        },
        {
          q: "¿Necesito un diseñador en mi propio pueblo?",
          a: [
            "No. Todo en un proyecto web ocurre por mensaje, llamada y pantalla compartida. Lo que importa es que la persona entienda su mercado y a sus clientes. Un estudio que trabaja en Puerto Rico sabe cómo busca la gente aquí, qué palabras usa y por qué un botón de WhatsApp pesa tanto en la isla.",
          ],
        },
      ],
      us: {
        h2: "Cómo lo manejamos en Littleman Labs",
        p: [
          "Construimos sitios web bilingües a la medida para negocios en Puerto Rico, desde Ponce. Un sitio web es un pago único, no una suscripción, y cuando está pagado en su totalidad usted es dueño del diseño y del contenido final entregado.",
          "El primer paso es una llamada gratis de 20 minutos. El precio exacto se confirma por escrito antes de empezar.",
        ],
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "small-business-website-cost-reddit",
    related: ["web-design-puerto-rico-reddit", "wix-vs-custom-website-reddit", "best-crm-for-small-business-reddit"],
    en: {
      title: "Small Business Website Cost Reddit: What Drives the Price",
      description:
        "How much does a small business website cost? Why nobody gives a straight number, what actually drives the price, which recurring costs to watch for, and what to ask before you sign.",
      h1: "How Much Does a Small Business Website Cost? The Reddit Question, Answered",
      kicker: "Website cost",
      intro: [
        "Ask this question anywhere and you get a range wide enough to be useless. That is not because people are hiding something. It is because two sites that both look like a small business website can be completely different jobs.",
        "This page explains what moves the price, so you can judge any quote you get, ours included. Littleman Labs is not affiliated with Reddit, and we do not quote its posts.",
      ],
      qa: [
        {
          q: "Why will nobody just give me a number?",
          a: [
            "Because the number depends on the scope, and the scope is the whole question. A one-page site with a contact form is a small job. A ten-page site with booking, a bilingual version, a lead inbox and ads tracking is a different one. Any price quoted before someone understands which of those you need is a guess.",
            "A fair studio asks about your business first and quotes second.",
          ],
        },
        {
          q: "What actually drives the cost of a website?",
          a: [
            "Five things do most of the work. The number of pages. Whether the design is built for you or adapted from a template. Who writes the text and who sources the photos. Extra functions like booking, payments or forms that feed a CRM. And the number of languages.",
            "Anything that needs a human to think about your specific business costs more than anything that can be copied from a template. That is the honest tradeoff.",
          ],
        },
        {
          q: "What recurring costs should I expect?",
          a: [
            "Plan for the domain name, which renews yearly, and for hosting. Some providers add a monthly fee for updates or support. Others bundle everything into a retainer. All of that is normal as long as it is written down before you start.",
            "The thing to watch for is a very low upfront price paired with a monthly fee you cannot cancel, or a site you lose access to the day you stop paying.",
          ],
        },
        {
          q: "Is a really cheap website a bad sign?",
          a: [
            "Not automatically, but check what is missing. Cheap often means a template with your logo on it, no help with text or photos, no phone-friendly testing, and no support after launch. That can be fine for a side project. It is a poor deal for a business that depends on the site to bring in customers.",
          ],
        },
        {
          q: "What should I ask before I accept a quote?",
          a: [
            "Ask what exactly is included and what is not. Ask how many rounds of changes you get. Ask who owns the domain, the hosting and the files. Ask what you pay after launch, and whether you can leave without losing the site. Ask how long it takes once you hand over your content.",
            "If a quote cannot answer those questions, it is not finished.",
          ],
        },
      ],
      us: {
        h2: "How Littleman Labs handles it",
        p: [
          "A website with us is a one-time payment based on the scope: the number of pages, any backend needs and the overall complexity. The exact price is confirmed in writing before we start, and it is not a monthly fee.",
          "Ads are a separate thing. Our growth system begins with a one-time setup fee, then a monthly plan, and your ad spend is paid to Meta on top. The free 20-minute call is where we work out which one, if either, fits you.",
        ],
      },
    },
    es: {
      title: "Cuánto cuesta una página web Reddit: qué define el precio",
      description:
        "¿Cuánto cuesta un sitio web para un negocio pequeño? Por qué nadie da un número fijo, qué define el precio, qué costos recurrentes vigilar y qué preguntar antes de firmar.",
      h1: "¿Cuánto cuesta un sitio web para un negocio pequeño? La pregunta de Reddit, respondida",
      kicker: "Costo de un sitio",
      intro: [
        "Haga esta pregunta donde sea y recibirá un rango tan amplio que no sirve. No es porque la gente esconda algo. Es porque dos sitios que parecen lo mismo pueden ser trabajos totalmente distintos.",
        "Esta página explica qué mueve el precio, para que usted pueda juzgar cualquier cotización que reciba, incluida la nuestra. Littleman Labs no tiene relación con Reddit y no citamos sus publicaciones.",
      ],
      qa: [
        {
          q: "¿Por qué nadie me da un número y ya?",
          a: [
            "Porque el número depende del alcance, y el alcance es toda la pregunta. Un sitio de una página con formulario de contacto es un trabajo pequeño. Uno de diez páginas con citas, versión bilingüe, buzón de leads y seguimiento de anuncios es otro. Cualquier precio dado antes de entender cuál necesita es una adivinanza.",
            "Un estudio serio le pregunta primero por su negocio y cotiza después.",
          ],
        },
        {
          q: "¿Qué define realmente el costo de un sitio web?",
          a: [
            "Cinco cosas hacen casi todo el trabajo. La cantidad de páginas. Si el diseño se hace para usted o se adapta de una plantilla. Quién escribe los textos y quién consigue las fotos. Funciones extra como citas, pagos o formularios que alimentan un CRM. Y la cantidad de idiomas.",
            "Todo lo que requiere que una persona piense en su negocio específico cuesta más que lo que se copia de una plantilla. Ese es el intercambio honesto.",
          ],
        },
        {
          q: "¿Qué costos recurrentes debo esperar?",
          a: [
            "Cuente con el nombre de dominio, que se renueva cada año, y con el hosting. Algunos proveedores añaden una cuota mensual por actualizaciones o soporte. Otros lo reúnen todo en una iguala. Todo eso es normal mientras esté escrito antes de empezar.",
            "Lo que hay que vigilar es un precio inicial muy bajo con una mensualidad que no puede cancelar, o un sitio al que pierde acceso el día que deja de pagar.",
          ],
        },
        {
          q: "¿Un sitio web muy barato es mala señal?",
          a: [
            "No necesariamente, pero revise qué falta. Barato suele significar una plantilla con su logo, sin ayuda con textos ni fotos, sin pruebas en el teléfono y sin soporte después del lanzamiento. Eso puede estar bien para un proyecto de fin de semana. Es mal negocio para una empresa que depende del sitio para traer clientes.",
          ],
        },
        {
          q: "¿Qué debo preguntar antes de aceptar una cotización?",
          a: [
            "Pregunte qué incluye exactamente y qué no. Cuántas rondas de cambios tiene. Quién es el dueño del dominio, del hosting y de los archivos. Qué paga después del lanzamiento, y si puede irse sin perder el sitio. Cuánto tarda una vez que usted entrega su contenido.",
            "Si una cotización no responde eso, no está terminada.",
          ],
        },
      ],
      us: {
        h2: "Cómo lo manejamos en Littleman Labs",
        p: [
          "Un sitio web con nosotros es un pago único según el alcance: la cantidad de páginas, las necesidades de backend y la complejidad general. El precio exacto se confirma por escrito antes de empezar, y no es una mensualidad.",
          "Los anuncios son otra cosa. Nuestro sistema de crecimiento empieza con una cuota única de configuración, luego un plan mensual, y su gasto en anuncios se paga aparte a Meta. En la llamada gratis de 20 minutos vemos cuál de los dos, si alguno, le conviene.",
        ],
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "best-crm-for-small-business-reddit",
    related: ["missed-calls-small-business-reddit", "facebook-ads-small-business-reddit", "web-design-puerto-rico-reddit"],
    en: {
      title: "Best CRM for Small Business Reddit: How to Choose One",
      description:
        "Looking for the best CRM for a small business? What a CRM actually has to do, when a spreadsheet is enough, and why connecting it to your website and ads matters more than the brand.",
      h1: "Best CRM for a Small Business? The Reddit Question, Answered",
      kicker: "CRM",
      intro: [
        "The thread usually ends in a list of tool names and an argument. The more useful question is what a small business needs a CRM to do, because once that is clear, most of the choice makes itself.",
        "Littleman Labs puts a CRM behind its clients' ads in Puerto Rico. We are not affiliated with Reddit and we do not quote its posts.",
      ],
      qa: [
        {
          q: "Do I even need a CRM, or is a spreadsheet enough?",
          a: [
            "A spreadsheet is enough while you have a handful of customers and you remember every conversation. It stops being enough the day a lead falls through the cracks and you only find out later.",
            "The signs are simple. Leads arrive from more than one place. You forget to follow up. You cannot say how many inquiries you got last month. If any of that sounds familiar, it is time.",
          ],
        },
        {
          q: "What does a small business CRM actually have to do?",
          a: [
            "Four things. Collect every lead in one place, whether they called, filled a form or messaged on WhatsApp. Show where each person is in your process. Follow up so a quick reply does not depend on you being free. And tell you, in plain numbers, what is working.",
            "Everything else is decoration. A tool with two hundred features that your team uses three of is worse than a plain one that everyone opens daily.",
          ],
        },
        {
          q: "Does it matter which CRM I pick?",
          a: [
            "Less than people think. What matters is whether it is connected to the things that feed it. A CRM that does not receive your website form, your ad leads and your messages is just another place to type things in by hand, and it will be abandoned within a month.",
            "The best CRM for you is the one that is wired into your website and ads from the start and that you will actually open.",
          ],
        },
        {
          q: "What are the most common CRM mistakes?",
          a: [
            "Setting up too many fields and stages before there is any data. Using a separate tool for each channel so nothing is in one place. Never writing down the follow-up rules. And buying the tool before deciding who looks at it every morning.",
            "Start small. One pipeline, a few stages, a clear rule for who replies. Add detail when you feel the need.",
          ],
        },
        {
          q: "How fast should I answer a new lead?",
          a: [
            "As fast as you can, because interest cools quickly. A quick first reply followed by a real conversation beats a perfect reply the next day. That is the single biggest reason to have a CRM instead of an inbox.",
          ],
        },
      ],
      us: {
        h2: "How Littleman Labs handles it",
        p: [
          "Our growth system puts a CRM behind your Meta ads. Every call, form and WhatsApp message is logged with where it came from and whether it was followed up, and you get a clear report every month.",
          "It is billed as a one-time setup fee, which covers your ad account, tracking and CRM, followed by a monthly plan with a standard term of 3 months. Prices are confirmed in writing before we bill you, plus applicable IVU.",
        ],
      },
    },
    es: {
      title: "Mejor CRM para negocio pequeño Reddit: cómo elegir",
      description:
        "¿Busca el mejor CRM para un negocio pequeño? Qué tiene que hacer un CRM, cuándo basta una hoja de cálculo y por qué conectarlo con su sitio y sus anuncios importa más que la marca.",
      h1: "¿El mejor CRM para un negocio pequeño? La pregunta de Reddit, respondida",
      kicker: "CRM",
      intro: [
        "El hilo suele terminar en una lista de nombres de herramientas y una discusión. La pregunta más útil es qué necesita un negocio pequeño que haga un CRM, porque cuando eso está claro, casi toda la elección se resuelve sola.",
        "Littleman Labs pone un CRM detrás de los anuncios de sus clientes en Puerto Rico. No tenemos relación con Reddit y no citamos sus publicaciones.",
      ],
      qa: [
        {
          q: "¿De verdad necesito un CRM, o me basta una hoja de cálculo?",
          a: [
            "Una hoja de cálculo basta mientras tenga un puñado de clientes y se acuerde de cada conversación. Deja de bastar el día que un lead se le pierde y usted se entera tarde.",
            "Las señales son sencillas. Los leads llegan de más de un lugar. Se le olvida dar seguimiento. No puede decir cuántas consultas tuvo el mes pasado. Si algo de eso le suena familiar, ya es hora.",
          ],
        },
        {
          q: "¿Qué tiene que hacer realmente un CRM para un negocio pequeño?",
          a: [
            "Cuatro cosas. Reunir cada lead en un solo lugar, ya sea que llamó, llenó un formulario o escribió por WhatsApp. Mostrar en qué punto de su proceso está cada persona. Dar seguimiento para que una respuesta rápida no dependa de que usted esté libre. Y decirle, en números claros, qué está funcionando.",
            "Todo lo demás es decoración. Una herramienta con doscientas funciones de las que su equipo usa tres es peor que una sencilla que todos abren a diario.",
          ],
        },
        {
          q: "¿Importa cuál CRM escoja?",
          a: [
            "Menos de lo que la gente cree. Lo que importa es si está conectado a lo que lo alimenta. Un CRM que no recibe el formulario de su sitio, los leads de sus anuncios y sus mensajes es solo otro lugar donde escribir a mano, y se abandona en un mes.",
            "El mejor CRM para usted es el que está conectado a su sitio y a sus anuncios desde el principio, y el que de verdad va a abrir.",
          ],
        },
        {
          q: "¿Cuáles son los errores más comunes con un CRM?",
          a: [
            "Crear demasiados campos y etapas antes de tener datos. Usar una herramienta distinta por cada canal, para que nada esté en un solo lugar. Nunca escribir las reglas de seguimiento. Y comprar la herramienta antes de decidir quién la mira cada mañana.",
            "Empiece pequeño. Un solo embudo, pocas etapas, una regla clara de quién responde. Añada detalle cuando lo necesite.",
          ],
        },
        {
          q: "¿Qué tan rápido debo contestar a un lead nuevo?",
          a: [
            "Lo más rápido que pueda, porque el interés se enfría pronto. Una primera respuesta rápida seguida de una conversación real le gana a una respuesta perfecta al día siguiente. Esa es la razón más grande para tener un CRM en vez de una bandeja de entrada.",
          ],
        },
      ],
      us: {
        h2: "Cómo lo manejamos en Littleman Labs",
        p: [
          "Nuestro sistema de crecimiento pone un CRM detrás de sus anuncios en Meta. Cada llamada, formulario y mensaje de WhatsApp se registra con su origen y si recibió seguimiento, y usted recibe un reporte claro cada mes.",
          "Se cobra como una cuota única de configuración, que cubre su cuenta de anuncios, el seguimiento y el CRM, seguida de un plan mensual con un término estándar de 3 meses. Los precios se confirman por escrito antes de facturarle, más el IVU que aplique.",
        ],
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "facebook-ads-small-business-reddit",
    related: ["best-crm-for-small-business-reddit", "missed-calls-small-business-reddit", "web-design-puerto-rico-reddit"],
    en: {
      title: "Facebook Ads for Small Business Reddit: Do They Work?",
      description:
        "Do Facebook and Instagram ads work for a small business? The honest answer: what has to be in place first, why most campaigns leak leads, how to test small, and what to measure.",
      h1: "Do Facebook and Instagram Ads Work for Small Businesses? The Reddit Question, Answered",
      kicker: "Meta ads",
      intro: [
        "Ask this and you will find one camp swearing ads changed their business and another swearing they burned a month of budget. Both are telling the truth. The difference is usually not the ads. It is what happens before and after the click.",
        "Littleman Labs manages Meta ads for businesses in Puerto Rico. We are not affiliated with Reddit, we quote none of its posts, and we promise no results here because nobody honest can.",
      ],
      qa: [
        {
          q: "Do Facebook and Instagram ads work for a small business?",
          a: [
            "They can, when there is something to sell that people want, a clear page to send them to, tracking to see what happens, and a fast follow-up. Take away any one of those and the ads look like they failed, when really the system around them did.",
            "Ads buy attention. They do not fix a weak offer or a slow reply.",
          ],
        },
        {
          q: "What has to be in place before I spend anything?",
          a: [
            "A page that matches the ad and loads fast on a phone. A way to capture the lead, whether a form, a call button or WhatsApp. Tracking, so you know which ad produced which lead. And a plan for who answers, and how quickly.",
            "If the leads arrive and sit unanswered for a day, the money is gone no matter how good the ad was.",
          ],
        },
        {
          q: "Why do so many small business campaigns fail?",
          a: [
            "Usually one of four reasons. The leads are not followed up in time. The landing page does not match what the ad promised. Nobody measured cost per customer, only clicks. Or the campaign was changed every two days, so nothing was ever learned.",
            "Notice that none of those is about Facebook being bad. They are about the setup.",
          ],
        },
        {
          q: "How should I test with a small budget?",
          a: [
            "Change one thing at a time. A different image, then a different first line, then a different offer. Give each version enough time to show a pattern before you judge it. Many small, clean tests teach you more than one big bet.",
            "Write down what you changed and what happened. Memory is unreliable and the dashboard will not do it for you.",
          ],
        },
        {
          q: "What should I measure?",
          a: [
            "Cost per lead is a start, but it can mislead. A cheap lead who never answers the phone is worth nothing. Track how many leads become conversations, and how many become customers. Then you can compare ads by what they actually earn.",
          ],
        },
        {
          q: "Should my ads be in Spanish or English?",
          a: [
            "Match your customer. In Puerto Rico that is often Spanish, sometimes English, sometimes both in separate ads. Test them separately rather than mixing languages in one ad, so you can see which audience responds.",
          ],
        },
      ],
      us: {
        h2: "How Littleman Labs handles it",
        p: [
          "Our growth system runs your Meta ads every week and puts a CRM behind them, with a dedicated landing page for each campaign and a clear monthly report of leads and booked jobs. We audit what you have today before we change anything.",
          "It starts with a one-time setup fee, then a monthly plan. The standard term is 3 months, because ads and follow-up need time to produce useful data. Your ad spend is separate and paid to Meta. And no one honestly can promise results, so we do not.",
        ],
      },
    },
    es: {
      title: "Anuncios en Facebook para negocios pequeños Reddit: ¿funcionan?",
      description:
        "¿Funcionan los anuncios de Facebook e Instagram para un negocio pequeño? La respuesta honesta: qué debe existir primero, por qué la mayoría de las campañas pierde leads, cómo probar con poco y qué medir.",
      h1: "¿Funcionan los anuncios de Facebook e Instagram para negocios pequeños? La pregunta de Reddit, respondida",
      kicker: "Anuncios en Meta",
      intro: [
        "Haga esta pregunta y encontrará un bando que jura que los anuncios cambiaron su negocio y otro que jura que quemó un mes de presupuesto. Los dos dicen la verdad. La diferencia casi nunca son los anuncios. Es lo que pasa antes y después del clic.",
        "Littleman Labs maneja anuncios en Meta para negocios en Puerto Rico. No tenemos relación con Reddit, no citamos sus publicaciones, y aquí no prometemos resultados porque nadie honesto puede.",
      ],
      qa: [
        {
          q: "¿Funcionan los anuncios de Facebook e Instagram para un negocio pequeño?",
          a: [
            "Pueden funcionar cuando hay algo que vender que la gente quiere, una página clara adonde enviarla, seguimiento para ver qué pasa y una respuesta rápida. Quite una de esas piezas y los anuncios parecen haber fallado, cuando en realidad falló el sistema alrededor.",
            "Los anuncios compran atención. No arreglan una oferta débil ni una respuesta lenta.",
          ],
        },
        {
          q: "¿Qué debe estar listo antes de gastar un solo dólar?",
          a: [
            "Una página que coincida con el anuncio y cargue rápido en el teléfono. Una forma de captar el lead, sea un formulario, un botón de llamada o WhatsApp. Seguimiento, para saber qué anuncio produjo qué lead. Y un plan de quién contesta y qué tan rápido.",
            "Si los leads llegan y pasan un día sin respuesta, el dinero se perdió por muy bueno que fuera el anuncio.",
          ],
        },
        {
          q: "¿Por qué fallan tantas campañas de negocios pequeños?",
          a: [
            "Casi siempre por una de cuatro razones. Los leads no reciben seguimiento a tiempo. La página de destino no coincide con lo que prometió el anuncio. Nadie midió el costo por cliente, solo los clics. O la campaña se cambió cada dos días y nunca se aprendió nada.",
            "Fíjese en que ninguna es porque Facebook sea malo. Son problemas de la configuración.",
          ],
        },
        {
          q: "¿Cómo pruebo con un presupuesto pequeño?",
          a: [
            "Cambie una sola cosa a la vez. Una imagen distinta, luego una primera línea distinta, luego una oferta distinta. Dele a cada versión el tiempo suficiente para mostrar un patrón antes de juzgarla. Muchas pruebas pequeñas y limpias le enseñan más que una sola apuesta grande.",
            "Anote qué cambió y qué pasó. La memoria no es confiable y el panel no lo hace por usted.",
          ],
        },
        {
          q: "¿Qué debo medir?",
          a: [
            "El costo por lead es un comienzo, pero puede engañar. Un lead barato que nunca contesta el teléfono no vale nada. Mida cuántos leads se vuelven conversaciones y cuántos se vuelven clientes. Así puede comparar los anuncios por lo que de verdad generan.",
          ],
        },
        {
          q: "¿Mis anuncios deben estar en español o en inglés?",
          a: [
            "Hágalos coincidir con su cliente. En Puerto Rico muchas veces es español, a veces inglés, a veces ambos en anuncios separados. Pruébelos por separado en lugar de mezclar idiomas en un mismo anuncio, para ver qué público responde.",
          ],
        },
      ],
      us: {
        h2: "Cómo lo manejamos en Littleman Labs",
        p: [
          "Nuestro sistema de crecimiento maneja sus anuncios en Meta cada semana y pone un CRM detrás, con una página de destino propia para cada campaña y un reporte mensual claro de leads y trabajos agendados. Auditamos lo que usted tiene hoy antes de cambiar nada.",
          "Empieza con una cuota única de configuración y luego un plan mensual. El término estándar es de 3 meses, porque los anuncios y el seguimiento necesitan tiempo para producir datos útiles. Su gasto en anuncios es aparte y se paga a Meta. Y nadie puede prometer resultados con honestidad, así que no lo hacemos.",
        ],
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "wix-vs-custom-website-reddit",
    related: ["small-business-website-cost-reddit", "web-design-puerto-rico-reddit", "local-seo-puerto-rico-reddit"],
    en: {
      title: "Wix vs Custom Website Reddit: Which Is Right for You?",
      description:
        "Wix or a custom website? A fair look at what website builders do well, where they hold a business back, and a simple rule for deciding which one fits you.",
      h1: "Wix or a Custom Website? The Reddit Debate, Answered",
      kicker: "Builder vs custom",
      intro: [
        "This debate gets heated because both sides are partly right. A website builder is a perfectly good answer for some businesses, and a trap for others. The skill is knowing which one you are.",
        "We build custom sites at Littleman Labs, so we are not neutral, and we will say so. We are also not affiliated with Reddit and we do not quote its posts.",
      ],
      qa: [
        {
          q: "Is a site builder good enough for a small business?",
          a: [
            "Often, yes. If you need a simple presence, you are comfortable doing the work, and you have no need for anything unusual, a builder can get you online quickly and cheaply. Plenty of good businesses run on one.",
            "The question is not whether it is good enough in general. It is whether it is good enough for what you need it to do in a year.",
          ],
        },
        {
          q: "Where do builders hold a business back?",
          a: [
            "Four places tend to show up. You are the designer, the writer and the technician, and that time is not free. Search engine control is limited compared with a purpose-built site. Connecting the site to a CRM, ads tracking and follow-up can get awkward. And most builders do not let you export your design to run somewhere else, so leaving means rebuilding.",
            "None of that matters on day one. It matters when the business grows.",
          ],
        },
        {
          q: "What do you get from a custom site?",
          a: [
            "A site built around your business instead of a template, so the structure follows your customers' questions. Control over speed, search optimization and how it connects to everything else. And, if the arrangement is right, full ownership of the finished site.",
            "The cost is paying for someone's time up front and waiting for the build.",
          ],
        },
        {
          q: "Is a custom site faster or better for search?",
          a: [
            "It can be, because there is less unrelated code to load and more control over structure. But a poorly made custom site loses to a well-used builder every time. The advantage is the ceiling, not the floor.",
          ],
        },
        {
          q: "How do I decide?",
          a: [
            "A rule that works. If the website is a business card, a builder is likely fine. If the website is where customers find you, book you, or leave their details, and you will spend money on ads sending people there, the extra control is worth paying for.",
            "Also ask what you would lose if you wanted to leave in two years. If the answer is everything, think twice.",
          ],
        },
      ],
      us: {
        h2: "How Littleman Labs handles it",
        p: [
          "We build custom bilingual sites for businesses in Puerto Rico. Most 3 to 5 page sites are live in 3 to 7 business days once the direction is agreed, for a one-time payment priced by scope. Once it is paid in full, you own the final delivered design and content.",
          "If your current site already works, we do not insist on rebuilding it. For the growth system we can start there, with a dedicated landing page for each campaign.",
        ],
      },
    },
    es: {
      title: "Wix o sitio web a la medida Reddit: ¿cuál conviene?",
      description:
        "¿Wix o un sitio web a la medida? Una mirada justa a lo que hacen bien los constructores de sitios, dónde frenan a un negocio y una regla sencilla para decidir cuál le conviene.",
      h1: "¿Wix o un sitio web a la medida? El debate de Reddit, respondido",
      kicker: "Constructor o a la medida",
      intro: [
        "Este debate se calienta porque los dos bandos tienen parte de razón. Un constructor de sitios es una respuesta perfectamente buena para unos negocios y una trampa para otros. La clave es saber cuál es usted.",
        "En Littleman Labs construimos sitios a la medida, así que no somos neutrales, y lo decimos. Tampoco tenemos relación con Reddit ni citamos sus publicaciones.",
      ],
      qa: [
        {
          q: "¿Un constructor de sitios es suficiente para un negocio pequeño?",
          a: [
            "Muchas veces, sí. Si necesita una presencia sencilla, le resulta cómodo hacer el trabajo y no necesita nada fuera de lo común, un constructor lo pone en línea rápido y barato. Muchos buenos negocios funcionan con uno.",
            "La pregunta no es si es suficiente en general. Es si será suficiente para lo que usted necesite que haga dentro de un año.",
          ],
        },
        {
          q: "¿Dónde frenan los constructores a un negocio?",
          a: [
            "Suelen aparecer cuatro lugares. Usted es el diseñador, el redactor y el técnico, y ese tiempo no es gratis. El control sobre los buscadores es limitado comparado con un sitio hecho a propósito. Conectar el sitio a un CRM, al seguimiento de anuncios y al seguimiento de leads puede volverse incómodo. Y la mayoría de los constructores no le dejan exportar su diseño para usarlo en otro lugar, así que irse significa reconstruir.",
            "Nada de eso importa el primer día. Importa cuando el negocio crece.",
          ],
        },
        {
          q: "¿Qué obtengo con un sitio a la medida?",
          a: [
            "Un sitio construido alrededor de su negocio en vez de una plantilla, con una estructura que sigue las preguntas de sus clientes. Control sobre la velocidad, la optimización para buscadores y cómo se conecta con todo lo demás. Y, si el acuerdo es el correcto, propiedad total del sitio terminado.",
            "El costo es pagar por el tiempo de alguien por adelantado y esperar la construcción.",
          ],
        },
        {
          q: "¿Un sitio a la medida es más rápido o mejor para buscadores?",
          a: [
            "Puede serlo, porque hay menos código ajeno que cargar y más control sobre la estructura. Pero un sitio a la medida mal hecho siempre pierde contra un constructor bien usado. La ventaja está en el techo, no en el piso.",
          ],
        },
        {
          q: "¿Cómo decido?",
          a: [
            "Una regla que funciona. Si el sitio es una tarjeta de presentación, un constructor probablemente basta. Si el sitio es donde los clientes lo encuentran, lo reservan o dejan sus datos, y usted va a gastar dinero en anuncios que envíen gente ahí, vale la pena pagar por el control adicional.",
            "Pregúntese también qué perdería si quisiera irse dentro de dos años. Si la respuesta es todo, piénselo dos veces.",
          ],
        },
      ],
      us: {
        h2: "Cómo lo manejamos en Littleman Labs",
        p: [
          "Construimos sitios bilingües a la medida para negocios en Puerto Rico. La mayoría de los sitios de 3 a 5 páginas están en línea en 3 a 7 días laborables, una vez acordada la dirección, por un pago único según el alcance. Cuando está pagado en su totalidad, usted es dueño del diseño y del contenido final entregado.",
          "Si su sitio actual ya funciona, no insistimos en reconstruirlo. Para el sistema de crecimiento podemos empezar con él, con una página de destino propia para cada campaña.",
        ],
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "missed-calls-small-business-reddit",
    related: ["best-crm-for-small-business-reddit", "facebook-ads-small-business-reddit", "web-design-puerto-rico-reddit"],
    en: {
      title: "Missed Calls Small Business Reddit: How Not to Lose Leads",
      description:
        "Missing calls as a small business? What missed-call text-back is, what to say, the consent rules to respect, and how to make sure no call, form or message gets lost.",
      h1: "Missing Calls in Your Small Business? The Reddit Question, Answered",
      kicker: "Missed calls",
      intro: [
        "If you work with your hands, or you are with a customer, or it is simply after hours, you will miss calls. The question is what happens next. Most callers do not leave a voicemail. They call the next business on the list.",
        "This page explains missed-call text-back, a common fix, and the larger habit behind it. Littleman Labs is not affiliated with Reddit and we do not quote its posts.",
      ],
      qa: [
        {
          q: "What is missed-call text-back?",
          a: [
            "When someone calls and you do not pick up, they get a text within seconds. Something like, sorry we missed you, how can we help, or reply here and we will get right back to you. The conversation starts before they have moved on to a competitor.",
            "It is automatic. You set the message once.",
          ],
        },
        {
          q: "Does it actually help?",
          a: [
            "It tends to help for one reason: speed. A person who just called wants an answer now. A text arriving in seconds keeps you in the running. A voicemail returned the next afternoon often finds them already served.",
            "It will not rescue a business that never calls back at all. It buys you time to reply properly.",
          ],
        },
        {
          q: "What should the message say?",
          a: [
            "Short, human, and useful. Name the business. Say you missed the call. Ask one easy question, or offer a link to book. Avoid long paragraphs and avoid sounding like a robot.",
            "A good rule is to write it as you would text a customer yourself, then cut it by half.",
          ],
        },
        {
          q: "Are there rules I should follow?",
          a: [
            "Yes. Only text people who contacted you, keep the message about their inquiry, and honor any request to stop. Texting rules vary by country and carrier, so check the rules that apply to you before you switch it on. This page is general information, not legal advice.",
          ],
        },
        {
          q: "Where should the replies go?",
          a: [
            "Into the same place as every other lead. If texts, calls, forms and WhatsApp messages each live in a different app, replies get lost. One shared inbox means whoever is free can answer, and nothing disappears.",
          ],
        },
        {
          q: "What about calls outside business hours?",
          a: [
            "Have a clear after-hours reply that says when you will answer and offers a way to leave details. A clear answer at 9 p.m. beats silence until morning.",
          ],
        },
      ],
      us: {
        h2: "How Littleman Labs handles it",
        p: [
          "We do not sell missed-call text-back as a separate product, and we would rather say that than imply it. What our growth system does is log every call, form and WhatsApp message in one CRM, with where it came from and whether it was followed up, so no enquiry gets lost.",
          "Every website we build also has a contact form, WhatsApp and click-to-call built in, so people can reach you the way they prefer.",
        ],
      },
    },
    es: {
      title: "Llamadas perdidas en un negocio Reddit: cómo no perder leads",
      description:
        "¿Pierde llamadas en su negocio? Qué es el mensaje automático a una llamada perdida, qué decir, las reglas de consentimiento que debe respetar y cómo asegurar que ninguna llamada, formulario o mensaje se pierda.",
      h1: "¿Pierde llamadas en su negocio? La pregunta de Reddit, respondida",
      kicker: "Llamadas perdidas",
      intro: [
        "Si trabaja con las manos, o está con un cliente, o simplemente es fuera de horario, va a perder llamadas. La pregunta es qué pasa después. La mayoría de quienes llaman no deja mensaje de voz. Llama al siguiente negocio de la lista.",
        "Esta página explica el mensaje de texto automático a una llamada perdida, una solución común, y el hábito más grande detrás. Littleman Labs no tiene relación con Reddit y no citamos sus publicaciones.",
      ],
      qa: [
        {
          q: "¿Qué es el mensaje automático a una llamada perdida?",
          a: [
            "Cuando alguien llama y usted no contesta, recibe un texto en segundos. Algo como, perdone que no pudimos atenderle, ¿en qué le podemos ayudar?, o responda aquí y le contestamos enseguida. La conversación empieza antes de que se haya ido con la competencia.",
            "Es automático. Usted escribe el mensaje una sola vez.",
          ],
        },
        {
          q: "¿De verdad ayuda?",
          a: [
            "Suele ayudar por una razón: la rapidez. Una persona que acaba de llamar quiere una respuesta ahora. Un texto que llega en segundos lo mantiene en la competencia. Un mensaje de voz devuelto a la tarde siguiente muchas veces la encuentra ya atendida por otro.",
            "No rescata a un negocio que nunca devuelve la llamada. Le compra tiempo para responder bien.",
          ],
        },
        {
          q: "¿Qué debe decir el mensaje?",
          a: [
            "Corto, humano y útil. Diga el nombre del negocio. Diga que perdió la llamada. Haga una pregunta fácil, u ofrezca un enlace para reservar. Evite párrafos largos y evite sonar como un robot.",
            "Una buena regla es escribirlo como le escribiría usted mismo a un cliente, y luego recortarlo a la mitad.",
          ],
        },
        {
          q: "¿Hay reglas que deba seguir?",
          a: [
            "Sí. Escriba solo a quienes lo contactaron, mantenga el mensaje sobre su consulta y respete cualquier petición de que pare. Las reglas de los mensajes de texto varían por país y por compañía, así que verifique las que le aplican antes de activarlo. Esta página es información general, no asesoría legal.",
          ],
        },
        {
          q: "¿Adónde deben llegar las respuestas?",
          a: [
            "Al mismo lugar que todos los demás leads. Si los textos, las llamadas, los formularios y los mensajes de WhatsApp viven cada uno en una aplicación distinta, las respuestas se pierden. Una sola bandeja compartida significa que quien esté libre puede contestar, y nada desaparece.",
          ],
        },
        {
          q: "¿Y las llamadas fuera de horario?",
          a: [
            "Tenga una respuesta clara para fuera de horario que diga cuándo contestará y ofrezca una forma de dejar sus datos. Una respuesta clara a las 9 de la noche le gana al silencio hasta la mañana.",
          ],
        },
      ],
      us: {
        h2: "Cómo lo manejamos en Littleman Labs",
        p: [
          "No vendemos el mensaje automático a llamadas perdidas como un producto aparte, y preferimos decirlo a insinuarlo. Lo que sí hace nuestro sistema de crecimiento es registrar cada llamada, formulario y mensaje de WhatsApp en un mismo CRM, con su origen y si recibió seguimiento, para que ninguna consulta se pierda.",
          "Además, todo sitio web que construimos lleva formulario de contacto, WhatsApp y llamada con un toque, para que la gente lo contacte como prefiera.",
        ],
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    slug: "local-seo-puerto-rico-reddit",
    related: ["web-design-puerto-rico-reddit", "wix-vs-custom-website-reddit", "facebook-ads-small-business-reddit"],
    en: {
      title: "Local SEO Puerto Rico Reddit: What Actually Works",
      description:
        "Local SEO for businesses in Puerto Rico, answered plainly: Google Business Profile, reviews, bilingual pages, how long it takes, and why clear factual pages also get picked up by AI assistants.",
      h1: "Local SEO in Puerto Rico: The Reddit Questions, Answered",
      kicker: "Local SEO",
      intro: [
        "Local SEO is the work of showing up when someone nearby searches for what you do. It is less mysterious than the agencies selling it make it sound, and more patient than most owners hope.",
        "Littleman Labs builds local SEO basics into every website for businesses in Puerto Rico. We are not affiliated with Reddit and we do not quote its posts, and nothing here is a ranking guarantee.",
      ],
      qa: [
        {
          q: "What is local SEO, in plain words?",
          a: [
            "It is everything that helps Google decide you are a good answer for a nearby search. Your Google Business Profile, your reviews, the details on your site, and how consistent your name, address and phone number are across the web.",
            "It is different from general SEO because location is part of the question. Someone searching a service plus a town wants a business they can actually visit or call.",
          ],
        },
        {
          q: "What matters most?",
          a: [
            "A complete, accurate Google Business Profile comes first: the right category, hours, photos and a description in your own words. Then reviews, which are both a ranking signal and the first thing a stranger reads. Then a website that clearly says what you do and where, one page per service worth showing up for.",
            "Consistency is the quiet one. Your name, address and phone number should match everywhere they appear.",
          ],
        },
        {
          q: "Does language matter in Puerto Rico?",
          a: [
            "A lot. People search in Spanish, in English, and often in a mix. A site with real pages in both languages can show up for both. The pages need to be written, not machine translated, or they read as thin and get ignored.",
          ],
        },
        {
          q: "How long does it take?",
          a: [
            "Expect months, not days. Small wins like fixing your profile can show up in weeks. Climbing for competitive searches takes longer and depends on how many others are working on the same ones. Anyone promising page one by next month is selling something.",
          ],
        },
        {
          q: "Do AI assistants change any of this?",
          a: [
            "They add a second audience. Assistants that answer questions pull from pages that state clear facts: what you do, where, for whom, and how to reach you. The same habits that help local search help them too. Plain headings, direct answers to real questions, and details that are accurate and consistent.",
            "That is also why question-and-answer pages like this one exist. They are written to be useful first and easy to read second, for people and for the tools that read on their behalf.",
          ],
        },
        {
          q: "Can I do it myself?",
          a: [
            "Yes, the basics. Claim and complete your profile, ask happy customers for reviews, and make sure your site names your services and your town. The work gets harder as competition rises. That is when handing it off starts to pay for itself.",
          ],
        },
      ],
      us: {
        h2: "How Littleman Labs handles it",
        p: [
          "Every website we build includes local SEO basics: titles, descriptions and structured data, and it is bilingual from day one with a real version in each language. We do not promise rankings.",
          "Your Google Business Profile and your reviews are yours to build, and they matter a great deal. Bring your questions to the free 20-minute call and we will tell you what is worth doing first.",
        ],
      },
    },
    es: {
      title: "SEO local en Puerto Rico Reddit: lo que sí funciona",
      description:
        "SEO local para negocios en Puerto Rico, respondido con claridad: perfil de Google Business, reseñas, páginas bilingües, cuánto tarda y por qué las páginas claras y factuales también las recogen los asistentes de IA.",
      h1: "SEO local en Puerto Rico: las preguntas de Reddit, respondidas",
      kicker: "SEO local",
      intro: [
        "El SEO local es el trabajo de aparecer cuando alguien cerca busca lo que usted hace. Es menos misterioso de lo que lo pintan las agencias que lo venden, y más paciente de lo que la mayoría de los dueños espera.",
        "Littleman Labs incluye lo básico del SEO local en cada sitio web para negocios en Puerto Rico. No tenemos relación con Reddit y no citamos sus publicaciones, y nada aquí es una garantía de posición.",
      ],
      qa: [
        {
          q: "¿Qué es el SEO local, en palabras sencillas?",
          a: [
            "Es todo lo que ayuda a Google a decidir que usted es una buena respuesta para una búsqueda cercana. Su perfil de Google Business, sus reseñas, los datos de su sitio y qué tan consistentes son su nombre, dirección y teléfono por toda la web.",
            "Es distinto del SEO general porque la ubicación es parte de la pregunta. Quien busca un servicio más un pueblo quiere un negocio que de verdad pueda visitar o llamar.",
          ],
        },
        {
          q: "¿Qué es lo que más importa?",
          a: [
            "Primero, un perfil de Google Business completo y correcto: la categoría adecuada, el horario, las fotos y una descripción en sus propias palabras. Después las reseñas, que son una señal de posición y también lo primero que lee un desconocido. Después un sitio web que diga con claridad qué hace y dónde, con una página por cada servicio por el que valga la pena aparecer.",
            "La consistencia es la silenciosa. Su nombre, dirección y teléfono deben coincidir en todos los lugares donde aparecen.",
          ],
        },
        {
          q: "¿Importa el idioma en Puerto Rico?",
          a: [
            "Mucho. La gente busca en español, en inglés y muchas veces mezclando. Un sitio con páginas reales en ambos idiomas puede aparecer para los dos. Las páginas deben estar escritas, no traducidas a máquina, o se ven pobres y se ignoran.",
          ],
        },
        {
          q: "¿Cuánto tarda?",
          a: [
            "Cuente meses, no días. Las mejoras pequeñas, como arreglar su perfil, pueden notarse en semanas. Subir en búsquedas competidas toma más y depende de cuántos otros trabajan en las mismas. Quien le prometa la primera página para el mes que viene le está vendiendo algo.",
          ],
        },
        {
          q: "¿Cambian algo los asistentes de IA?",
          a: [
            "Añaden un segundo público. Los asistentes que responden preguntas toman de páginas que enuncian hechos claros: qué hace usted, dónde, para quién y cómo contactarlo. Los mismos hábitos que ayudan a la búsqueda local los ayudan a ellos. Títulos claros, respuestas directas a preguntas reales y datos correctos y consistentes.",
            "Por eso existen páginas de preguntas y respuestas como esta. Están escritas para ser útiles primero y fáciles de leer después, para las personas y para las herramientas que leen en su nombre.",
          ],
        },
        {
          q: "¿Puedo hacerlo yo mismo?",
          a: [
            "Sí, lo básico. Reclame y complete su perfil, pídales reseñas a sus clientes contentos y asegúrese de que su sitio nombre sus servicios y su pueblo. El trabajo se vuelve más difícil cuando sube la competencia. Ahí es cuando delegarlo empieza a pagarse solo.",
          ],
        },
      ],
      us: {
        h2: "Cómo lo manejamos en Littleman Labs",
        p: [
          "Todo sitio web que construimos incluye lo básico del SEO local: títulos, descripciones y datos estructurados, y es bilingüe desde el primer día, con una versión real en cada idioma. No prometemos posiciones.",
          "Su perfil de Google Business y sus reseñas los construye usted, y importan muchísimo. Traiga sus preguntas a la llamada gratis de 20 minutos y le diremos qué vale la pena hacer primero.",
        ],
      },
    },
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
