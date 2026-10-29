// Proyectos. Cada uno tiene una tarjeta en el inicio y su propia página de detalle.

export type Demo =
  | { kind: 'laptop'; src: string; label: string }
  | { kind: 'phone'; src: string; label: string; desktopOnly?: boolean }
  | { kind: 'panic-phone'; label: string }
  | { kind: 'route'; label: string };

export type Preview =
  | { kind: 'web'; img: string; bg: string }
  | { kind: 'phone'; img: string; bg: string }
  | { kind: 'map'; bg: string };

export type Node = { name: string; tech: string; main?: boolean };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  short: string;
  tags: string[];
  preview: Preview;
  confidential: boolean;
  pitch: string;
  platforms: string;
  problem: string;
  built: string[];
  architecture: { flow: Node[]; extra?: { node: Node; text: string }; deploy: string };
  decisions: string[];
  challenges?: string;
  stack: string[];
  demos: Demo[];
  repo?: string;
};

const darkBg = 'linear-gradient(160deg, #1B2436, #0B1220)';
const lightBg = 'linear-gradient(160deg, #DBE7FF, #F4F6FA)';

export const projects: Project[] = [
  {
    slug: 'boton-antipanico',
    name: 'Sistema de botón antipánico',
    kind: 'Mobile, web y API',
    short: 'App para empleados y central de monitoreo con mapa y alertas en tiempo real.',
    tags: ['React Native', 'Node.js', 'Socket.io', 'MongoDB'],
    preview: { kind: 'web', img: '/previews/central.jpg', bg: lightBg },
    confidential: true,
    pitch: 'Un empleado en peligro mantiene un botón 3 segundos en su celular y la central de seguridad lo ve en un mapa al instante.',
    platforms: 'Android, iOS, web y API',
    problem:
      'El equipo de seguridad se enteraba de las emergencias por llamadas sueltas, sin saber dónde estaba la persona ni si alguien ya la estaba ayudando.',
    built: [
      'App mobile con botón de 3 segundos, vibración y modo discreto.',
      'Ubicación en segundo plano mientras la alerta está activa.',
      'Central web con mapa en vivo, sirena, historial y exportación a CSV.',
      'Notificaciones push y recordatorios hasta que alguien toma la alerta.',
      'Gestión de empleados con roles y permisos.',
    ],
    architecture: {
      flow: [
        { name: 'App mobile', tech: 'React Native, Expo' },
        { name: 'API y tiempo real', tech: 'Node.js, Express, Socket.io', main: true },
        { name: 'Base de datos', tech: 'MongoDB' },
      ],
      extra: { node: { name: 'Central web', tech: 'React, Vite, Leaflet' }, text: 'recibe las alertas de la API por WebSocket, sin recargar la página' },
      deploy: 'Publicado en Railway (API) y Vercel (central).',
    },
    decisions: [
      'El aviso sale por WebSocket; si falla, por HTTP; sin datos, la app arma un SMS con la ubicación.',
      'Autenticación con JWT y permisos por rol: empleado, seguridad y administrador.',
      'Límite de intentos de login y de alertas por usuario, y limpieza de datos contra inyecciones.',
      'Token guardado de forma cifrada en el celular, no en almacenamiento plano.',
    ],
    stack: ['React Native', 'Expo', 'React', 'Vite', 'Tailwind CSS', 'Leaflet', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'JWT', 'Notificaciones push', 'Railway', 'Vercel'],
    demos: [
      { kind: 'panic-phone', label: 'App del empleado' },
      { kind: 'laptop', src: '/demos/central/?auto=1', label: 'Central de monitoreo' },
    ],
  },
  {
    slug: 'tienda-drops',
    name: 'Tienda online por drops',
    kind: 'Web',
    short: 'Prendas únicas con reserva en el checkout y panel de ventas y pedidos.',
    tags: ['React', 'Tailwind', 'Firebase', 'Mercado Pago'],
    preview: { kind: 'web', img: '/previews/tienda.jpg', bg: darkBg },
    confidential: true,
    pitch: 'Una tienda para prendas de una sola unidad: cuando alguien compra, la prenda desaparece para todos en el momento.',
    platforms: 'Web y panel de administración',
    problem:
      'La marca vendía por mensajes de Instagram: dos personas pedían la misma prenda, los pagos se cruzaban y cada envío se coordinaba a mano.',
    built: [
      'Catálogo con filtros, ficha con galería y cálculo de envío por código postal.',
      'Reserva de 15 minutos en el checkout para que nadie pague algo ya vendido.',
      'Cuenta regresiva para cada lanzamiento.',
      'Panel con ventas, ganancia por prenda, pedidos y etiqueta de envío para imprimir.',
      'Pagos con Mercado Pago y envíos por moto o correo.',
    ],
    architecture: {
      flow: [
        { name: 'Tienda y panel', tech: 'React, Vite, Tailwind' },
        { name: 'Capa de datos', tech: 'Firebase (Firestore y Auth)', main: true },
        { name: 'Pagos', tech: 'Mercado Pago' },
      ],
      deploy: 'Las pantallas no dependen de Firebase: la capa de datos está aislada y se puede cambiar por datos simulados, como en esta demo.',
    },
    decisions: [
      'La disponibilidad se actualiza en tiempo real: si una prenda se vende, se marca al instante en todos los carritos.',
      'Las fotos se achican en el navegador antes de subirse, para que la tienda cargue rápido en el celular.',
      'Webhook de Mercado Pago para confirmar el pago del lado del servidor.',
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Firebase', 'Firestore', 'Mercado Pago', 'Vercel'],
    demos: [
      { kind: 'laptop', src: '/demos/tienda/', label: 'Tienda' },
      { kind: 'laptop', src: '/demos/tienda/#/admin', label: 'Panel del dueño' },
    ],
  },
  {
    slug: 'concesionaria',
    name: 'Sitio para concesionaria',
    kind: 'Web y CMS',
    short: 'Catálogo de modelos y cuotas que el dueño edita desde un panel.',
    tags: ['Next.js', 'TypeScript', 'Payload CMS', 'PostgreSQL'],
    preview: { kind: 'web', img: '/previews/concesionaria.jpg', bg: lightBg },
    confidential: true,
    pitch: 'Un sitio donde el dueño cambia modelos, cuotas y fotos sin depender de un programador, y recibe las consultas ordenadas.',
    platforms: 'Web y panel de administración',
    problem:
      'Cada cambio de precio dependía de otra persona y las consultas llegaban mezcladas entre WhatsApp, mail y redes.',
    built: [
      'Catálogo por marca y modelo con ficha de cada auto.',
      'Panel para editar modelos, cuotas, fotos y datos de contacto.',
      'Formularios que guardan cada consulta con su estado y avisan por email.',
      'Diseño pensado primero para el celular, con WhatsApp siempre a mano.',
    ],
    architecture: {
      flow: [
        { name: 'Sitio público', tech: 'Next.js, Tailwind' },
        { name: 'Panel y API', tech: 'Payload CMS', main: true },
        { name: 'Base de datos', tech: 'PostgreSQL' },
      ],
      deploy: 'Sitio y panel en un solo proyecto de Next.js, publicado en Vercel con las imágenes en Vercel Blob.',
    },
    decisions: [
      'Páginas generadas en el servidor, con sitemap y metadatos para posicionar en Google.',
      'Tipos de TypeScript generados desde las colecciones del CMS.',
      'Límite de envíos por IP y campo trampa en los formularios contra spam.',
      'Preparado para medir campañas con Google Analytics y el píxel de Meta.',
    ],
    stack: ['Next.js', 'TypeScript', 'Payload CMS', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    demos: [
      { kind: 'laptop', src: '/demos/concesionaria/', label: 'Sitio' },
      { kind: 'phone', src: '/demos/concesionaria/marcas-y-modelos/', label: 'En el celular', desktopOnly: true },
    ],
  },
  {
    slug: 'seguimiento-flota',
    name: 'Seguimiento de flota',
    kind: 'API',
    short: 'Jornadas de choferes, posición en vivo y cálculo de kilómetros y paradas.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
    preview: { kind: 'map', bg: 'linear-gradient(160deg, #E6ECF5, #F4F6FA)' },
    confidential: true,
    pitch: 'El dueño de una empresa de transporte ve dónde está cada camión, cuántos kilómetros hizo cada chofer y dónde paró.',
    platforms: 'API y tiempo real',
    problem:
      'Las jornadas se anotaban en papel y no había forma de saber el recorrido real ni las horas de cada chofer.',
    built: [
      'Inicio y fin de jornada desde el celular del chofer, eligiendo el camión.',
      'Posición en vivo para el dueño y recorrido completo de cada jornada.',
      'Cálculo de kilómetros, detección de paradas y de cortes de señal.',
      'Simulador de viajes para probar sin salir a la ruta.',
    ],
    architecture: {
      flow: [
        { name: 'Celular del chofer', tech: 'Envía la ubicación' },
        { name: 'API y tiempo real', tech: 'Node.js, Express, Socket.io', main: true },
        { name: 'Base de datos', tech: 'PostgreSQL' },
      ],
      deploy: 'Base de datos local con Docker Compose y esquema que se aplica solo al iniciar.',
    },
    decisions: [
      'Limpieza de puntos GPS imprecisos y simplificación del trazado antes de guardar el resumen.',
      'Cálculo de distancia con la fórmula de Haversine.',
      'Tests sobre los cálculos geográficos.',
      'Sesión larga para el chofer: inicia sesión una sola vez.',
    ],
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'JWT', 'Docker'],
    demos: [{ kind: 'route', label: 'Simulación del mapa del dueño' }],
  },
  {
    slug: 'budgetflow',
    name: 'BudgetFlow',
    kind: 'App mobile',
    short: 'Finanzas personales con tarjetas, cuotas y presupuestos.',
    tags: ['React', 'Firebase', 'PWA'],
    preview: { kind: 'phone', img: '/previews/budgetflow.jpg', bg: 'linear-gradient(160deg, #2A2F5C, #0B1220)' },
    confidential: false,
    pitch: 'Cuánta plata hay disponible de verdad, contando tarjetas, cuotas y gastos fijos que todavía no se pagaron.',
    platforms: 'Android e iOS (app instalable)',
    problem:
      'Las apps de gastos anotan lo que ya pasó. Con tarjetas y cuotas lo importante es lo que viene: qué cierra, qué vence y cuánto se puede gastar por día.',
    built: [
      'Disponible del período y gasto diario sugerido.',
      'Tarjetas con fecha de cierre y vencimiento reales.',
      'Cuotas, gastos fijos e ingresos esperados contra confirmados.',
      'Pesos y dólares con cotización automática.',
      'Presupuestos por categoría, meta de ahorro e historial.',
    ],
    architecture: {
      flow: [
        { name: 'App instalable', tech: 'React, esbuild' },
        { name: 'Autenticación y datos', tech: 'Firebase', main: true },
      ],
      deploy: 'Sitio estático con service worker para funcionar sin conexión.',
    },
    decisions: [
      'Los datos de cada usuario quedan aislados por reglas de seguridad de Firestore.',
      'Modo demo con datos de ejemplo en el navegador, sin necesidad de cuenta.',
      'Recordatorios de vencimientos exportables al calendario.',
    ],
    stack: ['React', 'esbuild', 'Firebase', 'Firestore', 'PWA'],
    demos: [{ kind: 'phone', src: '/demos/budgetflow/', label: 'BudgetFlow' }],
    repo: 'https://github.com/thiagopaniagua05/budgetflow',
  },
  {
    slug: 'gymflow',
    name: 'GymFlow',
    kind: 'App mobile',
    short: 'Entrenamiento con series, récords y progreso semanal.',
    tags: ['React', 'Firebase', 'PWA'],
    preview: { kind: 'phone', img: '/previews/gymflow.jpg', bg: 'linear-gradient(160deg, #1D3A2A, #0B1220)' },
    confidential: false,
    pitch: 'Cada serie se anota en segundos y la app muestra cómo viene el progreso en cada ejercicio.',
    platforms: 'Android e iOS (app instalable)',
    problem:
      'Llevar el entrenamiento en notas del celular no sirve para ver progreso, récords ni qué músculos quedaron sin trabajar en la semana.',
    built: [
      'Registro de series, repeticiones y peso, sin rutina fija.',
      'Sugerencias según los grupos musculares menos trabajados.',
      'Progreso y récords por ejercicio.',
      'Objetivo de días por semana y racha.',
      'Peso corporal y fotos de progreso.',
    ],
    architecture: {
      flow: [
        { name: 'App instalable', tech: 'React, esbuild' },
        { name: 'Autenticación y datos', tech: 'Firebase', main: true },
      ],
      deploy: 'Sitio estático con service worker para funcionar sin conexión.',
    },
    decisions: [
      'Mapa del cuerpo que se colorea según los músculos trabajados en la semana.',
      'Modo demo con datos de ejemplo en el navegador, sin necesidad de cuenta.',
      'Recordatorios exportables al calendario.',
    ],
    stack: ['React', 'esbuild', 'Firebase', 'Firestore', 'PWA'],
    demos: [{ kind: 'phone', src: '/demos/gymflow/', label: 'GymFlow' }],
    repo: 'https://github.com/thiagopaniagua05/gymflow',
  },
];
